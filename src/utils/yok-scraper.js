#!/usr/bin/env node
"use strict";

const axios = require("axios");
const https = require("https");
const cheerio = require("cheerio");
const fs = require("fs/promises");
const path = require("path");

const BASE = "https://yokatlas.yok.gov.tr";
const LIST_URL = `${BASE}/universite.php`;
const OUT_FILE = path.join(__dirname, "..", "data", "yok-data.json");
const PY_API = process.env.PYTHON_API_URL || "http://127.0.0.1:8000";

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function retry(fn, tries = 3, delay = 800) {
  let lastErr;
  for (let i = 0; i < tries; i++) {
    try {
      return await fn();
    } catch (e) {
      lastErr = e;
      if (i < tries - 1) await sleep(delay);
    }
  }
  throw lastErr;
}

function cleanText(t) {
  return (t || "").replace(/\s+/g, " ").replace(/\u00a0/g, " ").trim();
}

function normalizeName(s) {
  return cleanText(s).replace(/\s{2,}/g, " ");
}

function makeUniId(seq) {
  return seq; // 1..n
}

function makeFacultyId(uniId, index) {
  return uniId * 100 + index; // örn: 101, 102
}

function makeDepartmentId(facId, index) {
  return facId * 100 + index; // örn: 5001
}

const axiosInstance = axios.create({
  httpsAgent: new https.Agent({ rejectUnauthorized: false }),
  headers: {
    "User-Agent": "Mozilla/5.0 KARGANOT-Scraper",
    "Accept-Language": "tr-TR,tr;q=0.9,en;q=0.8",
  },
  timeout: 45000,
});

async function fetchHtml(url) {
  const res = await retry(() => axiosInstance.get(url));
  return res.data;
}

async function parseUniversityList() {
  const html = await fetchHtml(LIST_URL);
  const $ = cheerio.load(html);
  const items = [];
  $("a").each((_, a) => {
    const href = $(a).attr("href") || "";
    const text = cleanText($(a).text());
    if (href.includes("universite-detay.php") && text.length > 2) {
      const url = href.startsWith("http") ? href : `${BASE}/${href.replace(/^\//, "")}`;
      items.push({ name: normalizeName(text), detailUrl: url });
    }
  });
  // uniq by detailUrl
  const map = new Map(items.map((i) => [i.detailUrl, i]));
  return Array.from(map.values());
}

// Fallback: Python API üzerinden üniversite/fakülte/bölüm verisi
const axiosPy = axios.create({ baseURL: PY_API, timeout: 120000 });

async function fetchFromPythonApi() {
  const universities = (await retry(() => axiosPy.get("/universities"))).data || [];
  // Map to desired shape (no website from API → null)
  return universities.map((u) => ({
    name: u.universityName,
    type: u.type || "Devlet",
    city: u.city || "Türkiye",
    website: null,
  }));
}

async function fetchFacultiesFromPython(universityName) {
  const data = (await retry(() => axiosPy.get("/faculties", { params: { universityName } }))).data || [];
  return data.map((f) => f.facultyName);
}

async function fetchProgramsFromPython(universityName, facultyName) {
  const data = (await retry(() => axiosPy.get("/programs", { params: { universityName, facultyName } }))).data || [];
  return data.map((p) => p.programName);
}

async function parseUniversityDetail(detailUrl) {
  const html = await fetchHtml(detailUrl);
  const $ = cheerio.load(html);
  const meta = { type: undefined, city: undefined, website: undefined };

  $("a, span, li, td, th, p").each((_, el) => {
    const txt = cleanText($(el).text());
    const href = $(el).attr("href");
    if (!meta.website && href && href.startsWith("http") && /site|web|üniversite web|resmi/i.test(txt)) {
      meta.website = href;
    }
    if (!meta.type && /(Devlet|Vakıf|Kamu)/i.test(txt)) {
      const m = txt.match(/(Devlet|Vakıf|Kamu)/i);
      if (m) meta.type = m[1];
    }
    if (!meta.city && /(İl:|Şehir:|City:)/i.test(txt)) {
      const m = txt.replace(/(İl:|Şehir:|City:)/i, " ").trim();
      if (m && m.length < 30) meta.city = m;
    }
  });

  // Fakülte / MYO linkleri (metinde anahtar kelimeler)
  const faculties = [];
  $("a").each((_, a) => {
    const href = $(a).attr("href") || "";
    const text = cleanText($(a).text());
    if (/(fakülte|fakulte|yüksekokulu|meslek yüksekokulu|enstitüsü)/i.test(text) && href && !href.includes("mailto:")) {
      const url = href.startsWith("http") ? href : `${BASE}/${href.replace(/^\//, "")}`;
      faculties.push({ name: normalizeName(text), url });
    }
  });

  // uniq by url
  const fmap = new Map(faculties.map((f) => [f.url, f]));
  return { meta, faculties: Array.from(fmap.values()) };
}

async function parseDepartments(facultyUrl) {
  const html = await fetchHtml(facultyUrl);
  const $ = cheerio.load(html);
  const departments = [];
  $("a, li, td, p").each((_, el) => {
    const text = cleanText($(el).text());
    if (/(programı|mühendisliği|bölümü|program|lisans|önlisans|öğretmenliği)/i.test(text)) {
      departments.push({ name: normalizeName(text) });
    }
  });
  // uniq by name
  const dmap = new Map(departments.map((d) => [d.name, d]));
  return Array.from(dmap.values());
}

function indexBy(arr, key) {
  const m = new Map();
  arr.forEach((x) => m.set(x[key], x));
  return m;
}

function mergeData(existing, incoming) {
  const now = new Date().toISOString();
  const out = [...(existing || [])];
  const byName = indexBy(out, "name");

  for (const uni of incoming) {
    const ex = byName.get(uni.name);
    if (!ex) {
      out.push({ ...uni, updatedAt: now });
      byName.set(uni.name, out[out.length - 1]);
      continue;
    }
    let changed = false;
    // meta merge
    ["type", "city", "website"].forEach((k) => {
      if (uni[k] && uni[k] !== ex[k]) {
        ex[k] = uni[k];
        changed = true;
      }
    });
    // faculties
    ex.faculties = ex.faculties || [];
    const facByName = indexBy(ex.faculties, "name");
    for (const f of uni.faculties || []) {
      const ef = facByName.get(f.name);
      if (!ef) {
        ex.faculties.push({ ...f });
        changed = true;
        continue;
      }
      // departments
      ef.departments = ef.departments || [];
      const depByName = indexBy(ef.departments, "name");
      for (const d of f.departments || []) {
        if (!depByName.has(d.name)) {
          ef.departments.push({ ...d });
          changed = true;
        }
      }
    }
    if (changed) ex.updatedAt = now;
  }
  return out;
}

async function main() {
  console.log("🔎 Üniversite listesi çekiliyor…");
  let uniList = await parseUniversityList();
  console.log(`Toplam aday: ${uniList.length}`);

  let usePython = false;
  if (uniList.length === 0) {
    console.log("⚠️ Liste boş geldi. Python API fallback kullanılacak (http://127.0.0.1:8000)…");
    usePython = true;
  }

  // Var olan veri okunur
  let existing = [];
  try {
    const buf = await fs.readFile(OUT_FILE, { encoding: "utf8" });
    existing = JSON.parse(buf);
  } catch (_) {}

  const results = [];
  let seq = (existing?.length || 0) + 1; // yeni üniversiteler için id başlangıcı

  // 3 eşzamanlı işleme, her grup sonrası 1500ms bekleme
  if (!usePython) {
    for (let i = 0; i < uniList.length; i += 3) {
      const slice = uniList.slice(i, i + 3);
    const settled = await Promise.allSettled(
      slice.map(async (uni, idx) => {
        const uniId = makeUniId(seq + idx);
        try {
          const { meta, faculties } = await parseUniversityDetail(uni.detailUrl);
          const facOut = [];
          let depTotal = 0;
          for (let fi = 0; fi < faculties.length; fi++) {
            const fac = faculties[fi];
            const facId = makeFacultyId(uniId, fi + 1);
            let deps = [];
            try {
              deps = await parseDepartments(fac.url);
            } catch (e) {
              console.warn("Bölüm sayfası hatası:", fac.name, e.message);
            }
            depTotal += deps.length;
            facOut.push({
              id: facId,
              name: fac.name,
              departments: deps.map((d, di) => ({ id: makeDepartmentId(facId, di + 1), name: d.name })),
            });
          }

          const uniObj = {
            id: uniId,
            name: uni.name,
            type: meta.type || "Bilinmiyor",
            city: meta.city || "Türkiye",
            website: meta.website || null,
            updatedAt: new Date().toISOString(),
            faculties: facOut,
          };

          console.log(`🎓 [${i + idx + 1}/${uniList.length}] ${uni.name} - ${facOut.length} fakülte, ${depTotal} bölüm`);
          return uniObj;
        } catch (e) {
          console.warn("Üniversite detay hatası:", uni.name, e.message);
          return null;
        }
      })
    );

      for (const r of settled) if (r.status === "fulfilled" && r.value) results.push(r.value);
      await sleep(1500);
    }
  } else {
    // Python API üzerinden hiyerarşi kur
    const pyUnis = await fetchFromPythonApi();
    for (let i = 0; i < pyUnis.length; i += 3) {
      const slice = pyUnis.slice(i, i + 3);
      const settled = await Promise.allSettled(
        slice.map(async (pyUni, idx) => {
          const uniId = makeUniId(seq + idx);
          try {
            const facNames = await fetchFacultiesFromPython(pyUni.name);
            const facOut = [];
            let depTotal = 0;
            for (let fi = 0; fi < facNames.length; fi++) {
              const facName = facNames[fi];
              const facId = makeFacultyId(uniId, fi + 1);
              let progs = [];
              try {
                progs = await fetchProgramsFromPython(pyUni.name, facName);
              } catch (e) {
                console.warn("Program alma hatası:", facName, e.message);
              }
              depTotal += progs.length;
              facOut.push({
                id: facId,
                name: facName,
                departments: progs.map((p, di) => ({ id: makeDepartmentId(facId, di + 1), name: p })),
              });
            }
            const uniObj = {
              id: uniId,
              name: pyUni.name,
              type: pyUni.type,
              city: pyUni.city,
              website: pyUni.website,
              updatedAt: new Date().toISOString(),
              faculties: facOut,
            };
            console.log(`🎓 [${i + idx + 1}/${pyUnis.length}] ${pyUni.name} - ${facOut.length} fakülte, ${depTotal} bölüm`);
            return uniObj;
          } catch (e) {
            console.warn("Üniversite işlenemedi:", pyUni.name, e.message);
            return null;
          }
        })
      );
      for (const r of settled) if (r.status === "fulfilled" && r.value) results.push(r.value);
      await sleep(1500);
    }
  }

  // Akıllı birleştirme ve id’ler
  const merged = mergeData(existing, results);

  await fs.mkdir(path.dirname(OUT_FILE), { recursive: true });
  await fs.writeFile(OUT_FILE, JSON.stringify(merged, null, 2), { encoding: "utf8" });

  const uniCount = merged.length;
  const depCount = merged.reduce((a, u) => a + u.faculties.reduce((b, f) => b + f.departments.length, 0), 0);
  console.log("\n✅ yok-data.json updated successfully");
  console.log(`📦 ${uniCount} universities, ${depCount} departments processed`);
  console.log("\n🎯 YÖK Atlas full data successfully generated.\nFile: /src/data/yok-data.json\nReady for integration with KARGANOT system.");
}

if (require.main === module) {
  main().catch((err) => {
    console.error("Scraper hata:", err);
    process.exit(1);
  });
}
