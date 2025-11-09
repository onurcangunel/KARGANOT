#!/usr/bin/env node
"use strict";
/**
 * yok-scraper.js
 * - YÖK Atlas’tan üniversite → fakülte → bölüm hiyerarşisini çıkarır.
 * - Yavaş istek (2sn bekleme) ve UTF-8 ile güvenli JSON üretir.
 */
const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs/promises');
const path = require('path');

const BASE = 'https://yokatlas.yok.gov.tr';
const LIST_URL = `${BASE}/universite.php`;
const OUT_FILE_WEB = path.join(__dirname, '..', 'apps', 'web', 'src', 'data', 'yok-data.json');
const OUT_FILE_ROOT = path.join(__dirname, '..', 'src', 'data', 'yok-data.json');

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function cleanText(t) {
  return (t || '')
    .replace(/\s+/g, ' ')
    .replace(/\u00a0/g, ' ')
    .trim();
}

function uniq(arr, key) {
  const m = new Map();
  for (const it of arr) {
    const k = key ? it[key] : it;
    if (!m.has(k)) m.set(k, it);
  }
  return Array.from(m.values());
}

async function fetchHtml(url) {
  const res = await axios.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 KARGANOT-Scraper' } });
  return res.data;
}

async function scrapeUniversitiesList() {
  const html = await fetchHtml(LIST_URL);
  const $ = cheerio.load(html);
  const items = [];

  // Sayfadaki üniversite listesi tablolar/listeler içinde olabilir; esnek seçim
  $('a').each((_, a) => {
    const href = $(a).attr('href') || '';
    const text = cleanText($(a).text());
    if (href.includes('universite-detay.php') && text.length > 2) {
      const url = href.startsWith('http') ? href : `${BASE}/${href.replace(/^\//, '')}`;
      items.push({ name: text, detailUrl: url });
    }
  });

  return uniq(items, 'detailUrl');
}

async function scrapeUniversityDetail(detailUrl) {
  const html = await fetchHtml(detailUrl);
  const $ = cheerio.load(html);

  // tür, şehir gibi alanları bulmaya çalış
  const meta = { type: undefined, city: undefined, website: undefined };
  $('a, span, li, td, th, p').each((_, el) => {
    const txt = cleanText($(el).text());
    const href = $(el).attr('href');
    if (!meta.website && href && href.startsWith('http') && txt.match(/(web|site|üniversite web|resmi site)/i)) {
      meta.website = href;
    }
    if (!meta.type && txt.match(/(Devlet|Vakıf|Kamu)/i)) {
      const m = txt.match(/(Devlet|Vakıf|Kamu)/i);
      if (m) meta.type = m[1];
    }
    if (!meta.city && txt.match(/İl:|Şehir:|City:/i)) {
      const m = txt.replace(/İl:|Şehir:|City:/i, ' ').trim();
      if (m && m.length < 30) meta.city = m;
    }
  });

  // Fakülte linklerini topla
  const faculties = [];
  $('a').each((_, a) => {
    const href = $(a).attr('href') || '';
    const text = cleanText($(a).text());
    if (/fakülte|fakulte|yüksekokulu|enstitüsü|myo/i.test(text) && href && !href.includes('mailto:')) {
      const url = href.startsWith('http') ? href : `${BASE}/${href.replace(/^\//, '')}`;
      faculties.push({ name: text, url });
    }
  });

  return { meta, faculties: uniq(faculties, 'url') };
}

async function scrapeDepartments(facultyUrl) {
  const html = await fetchHtml(facultyUrl);
  const $ = cheerio.load(html);

  const departments = [];
  $('a').each((_, a) => {
    const text = cleanText($(a).text());
    if (/programı|mühendisliği|bölümü|program|lisans|önlisans|öğretmenliği/i.test(text)) {
      departments.push({ name: text });
    }
  });

  return uniq(departments, 'name');
}

async function main() {
  console.log('🔎 YÖK Atlas liste sayfası çekiliyor...');
  const list = await scrapeUniversitiesList();
  console.log(`Toplam üniversite adayı: ${list.length}`);

  const result = [];
  let uid = 1, fid = 1000, did = 50000;

  for (const uni of list) {
    console.log(`\n🎓 Processing: ${uni.name}`);
    try {
      await sleep(2000);
      const detail = await scrapeUniversityDetail(uni.detailUrl);
      const facultiesOut = [];

      for (const fac of detail.faculties) {
        console.log(`🏛 Fakülte: ${fac.name}`);
        await sleep(2000);
        let departments = [];
        try {
          departments = await scrapeDepartments(fac.url);
        } catch (e) {
          console.warn('Bölüm sayfası okunamadı:', e.message);
        }
        facultiesOut.push({
          id: fid++,
          name: fac.name,
          departments: departments.map(d => ({ id: did++, name: d.name }))
        });
      }

      result.push({
        id: uid++,
        name: uni.name,
        type: detail.meta.type || 'Bilinmiyor',
        city: detail.meta.city || 'Türkiye',
        website: detail.meta.website || null,
        faculties: facultiesOut
      });
    } catch (e) {
      console.warn('Üniversite işlenemedi:', uni.name, e.message);
    }
  }

  // JSON’u yaz
  const json = JSON.stringify(result, null, 2);
  // write to apps/web path
  await fs.mkdir(path.dirname(OUT_FILE_WEB), { recursive: true });
  await fs.writeFile(OUT_FILE_WEB, json, { encoding: 'utf8' });
  // write to repo root src/data path
  await fs.mkdir(path.dirname(OUT_FILE_ROOT), { recursive: true });
  await fs.writeFile(OUT_FILE_ROOT, json, { encoding: 'utf8' });

  // Rapor
  const uniCount = result.length;
  const facCount = result.reduce((a, u) => a + u.faculties.length, 0);
  const depCount = result.reduce((a, u) => a + u.faculties.reduce((b, f) => b + f.departments.length, 0), 0);

  console.log('\n✅ JSON Generated');
  console.log(`📦 yok-data.json → ${uniCount} universities, ${facCount} faculties, ${depCount} departments.`);
}

if (require.main === module) {
  main().catch(err => {
    console.error('Scraper hata:', err);
    process.exit(1);
  });
}
