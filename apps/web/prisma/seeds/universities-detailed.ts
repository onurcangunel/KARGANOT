import { PrismaClient, UnitType } from '@prisma/client';

const prisma = new PrismaClient();

// Helper: Slug oluşturma (Türkçe karakter dönüştürme)
function createSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/ğ/g, 'g')
    .replace(/ü/g, 'u')
    .replace(/ş/g, 's')
    .replace(/ı/g, 'i')
    .replace(/ö/g, 'o')
    .replace(/ç/g, 'c')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

async function main() {
  console.log('🎓 Türk Üniversiteleri Detaylı Seed Başlıyor...\n');

  // ==========================================
  // MUĞLA SITKI KOÇMAN ÜNİVERSİTESİ (EN DETAYLI ÖRNEK)
  // ==========================================
  console.log('📍 Muğla Sıtkı Koçman Üniversitesi oluşturuluyor...');
  const mugla = await prisma.university.upsert({
    where: { slug: 'mugla-sitki-kocman-universitesi' },
    update: {},
    create: {
      name: 'Muğla Sıtkı Koçman Üniversitesi',
      slug: 'mugla-sitki-kocman-universitesi',
      city: 'Muğla',
      type: 'Devlet',
      website: 'https://www.mu.edu.tr',
    },
  });

  // 🏛️ FAKÜLTELERİ (5 adet)
  console.log('  └─ Fakülteler ekleniyor...');
  
  const muhendisFak = await prisma.universityUnit.create({
    data: {
      name: 'Mühendislik Fakültesi',
      slug: createSlug('Mühendislik Fakültesi'),
      type: UnitType.FACULTY,
      universityId: mugla.id,
      departments: {
        create: [
          { name: 'Bilgisayar Mühendisliği', slug: createSlug('Bilgisayar Mühendisliği') },
          { name: 'Elektrik-Elektronik Mühendisliği', slug: createSlug('Elektrik-Elektronik Mühendisliği') },
          { name: 'İnşaat Mühendisliği', slug: createSlug('İnşaat Mühendisliği') },
          { name: 'Makine Mühendisliği', slug: createSlug('Makine Mühendisliği') },
          { name: 'Endüstri Mühendisliği', slug: createSlug('Endüstri Mühendisliği') },
        ],
      },
    },
  });

  const egitimFak = await prisma.universityUnit.create({
    data: {
      name: 'Eğitim Fakültesi',
      slug: createSlug('Eğitim Fakültesi'),
      type: UnitType.FACULTY,
      universityId: mugla.id,
      departments: {
        create: [
          { name: 'Sınıf Öğretmenliği', slug: createSlug('Sınıf Öğretmenliği') },
          { name: 'Matematik Öğretmenliği', slug: createSlug('Matematik Öğretmenliği') },
          { name: 'Türkçe Öğretmenliği', slug: createSlug('Türkçe Öğretmenliği') },
          { name: 'İngilizce Öğretmenliği', slug: createSlug('İngilizce Öğretmenliği') },
        ],
      },
    },
  });

  const iibfFak = await prisma.universityUnit.create({
    data: {
      name: 'İktisadi ve İdari Bilimler Fakültesi',
      slug: createSlug('İktisadi ve İdari Bilimler Fakültesi'),
      type: UnitType.FACULTY,
      universityId: mugla.id,
      departments: {
        create: [
          { name: 'İşletme', slug: createSlug('İşletme') },
          { name: 'İktisat', slug: createSlug('İktisat') },
          { name: 'Kamu Yönetimi', slug: createSlug('Kamu Yönetimi') },
          { name: 'Uluslararası İlişkiler', slug: createSlug('Uluslararası İlişkiler') },
        ],
      },
    },
  });

  const fenFak = await prisma.universityUnit.create({
    data: {
      name: 'Fen Fakültesi',
      slug: createSlug('Fen Fakültesi'),
      type: UnitType.FACULTY,
      universityId: mugla.id,
      departments: {
        create: [
          { name: 'Matematik', slug: createSlug('Matematik') },
          { name: 'Fizik', slug: createSlug('Fizik') },
          { name: 'Kimya', slug: createSlug('Kimya') },
          { name: 'Biyoloji', slug: createSlug('Biyoloji') },
        ],
      },
    },
  });

  const edebiyatFak = await prisma.universityUnit.create({
    data: {
      name: 'Edebiyat Fakültesi',
      slug: createSlug('Edebiyat Fakültesi'),
      type: UnitType.FACULTY,
      universityId: mugla.id,
      departments: {
        create: [
          { name: 'Türk Dili ve Edebiyatı', slug: createSlug('Türk Dili ve Edebiyatı') },
          { name: 'Tarih', slug: createSlug('Tarih') },
          { name: 'Psikoloji', slug: createSlug('Psikoloji') },
          { name: 'Sosyoloji', slug: createSlug('Sosyoloji') },
        ],
      },
    },
  });

  // 🏢 MESLEK YÜKSEKOKULLAR (7 adet)
  console.log('  └─ Meslek Yüksekokulları ekleniyor...');

  const yataganMYO = await prisma.universityUnit.create({
    data: {
      name: 'Yatağan Meslek Yüksekokulu',
      slug: createSlug('Yatağan Meslek Yüksekokulu'),
      type: UnitType.VOCATIONAL_SCHOOL,
      universityId: mugla.id,
      departments: {
        create: [
          { name: 'Bilgisayar Programcılığı', slug: createSlug('Bilgisayar Programcılığı') },
          { name: 'Elektrik', slug: createSlug('Elektrik') },
          { name: 'Muhasebe ve Vergi', slug: createSlug('Muhasebe ve Vergi') },
          { name: 'Turizm ve Otel İşletmeciliği', slug: createSlug('Turizm ve Otel İşletmeciliği') },
          { name: 'Makine', slug: createSlug('Makine') },
          { name: 'İnşaat Teknolojisi', slug: createSlug('İnşaat Teknolojisi') },
        ],
      },
    },
  });

  const fethiyeMYO = await prisma.universityUnit.create({
    data: {
      name: 'Fethiye Meslek Yüksekokulu',
      slug: createSlug('Fethiye Meslek Yüksekokulu'),
      type: UnitType.VOCATIONAL_SCHOOL,
      universityId: mugla.id,
      departments: {
        create: [
          { name: 'Aşçılık', slug: createSlug('Aşçılık') },
          { name: 'Turizm ve Otel İşletmeciliği', slug: createSlug('Turizm ve Otel İşletmeciliği') },
          { name: 'Bilgisayar Programcılığı', slug: createSlug('Bilgisayar Programcılığı') },
          { name: 'İş Sağlığı ve Güvenliği', slug: createSlug('İş Sağlığı ve Güvenliği') },
          { name: 'Ormancılık ve Orman Ürünleri', slug: createSlug('Ormancılık ve Orman Ürünleri') },
        ],
      },
    },
  });

  const dalamanMYO = await prisma.universityUnit.create({
    data: {
      name: 'Dalaman Meslek Yüksekokulu',
      slug: createSlug('Dalaman Meslek Yüksekokulu'),
      type: UnitType.VOCATIONAL_SCHOOL,
      universityId: mugla.id,
      departments: {
        create: [
          { name: 'Sivil Havacılık Kabin Hizmetleri', slug: createSlug('Sivil Havacılık Kabin Hizmetleri') },
          { name: 'Sivil Hava Ulaştırma İşletmeciliği', slug: createSlug('Sivil Hava Ulaştırma İşletmeciliği') },
          { name: 'Lojistik', slug: createSlug('Lojistik') },
          { name: 'Bilgisayar Programcılığı', slug: createSlug('Bilgisayar Programcılığı') },
        ],
      },
    },
  });

  const koycegizMYO = await prisma.universityUnit.create({
    data: {
      name: 'Köyceğiz Meslek Yüksekokulu',
      slug: createSlug('Köyceğiz Meslek Yüksekokulu'),
      type: UnitType.VOCATIONAL_SCHOOL,
      universityId: mugla.id,
      departments: {
        create: [
          { name: 'Arıcılık', slug: createSlug('Arıcılık') },
          { name: 'Organik Tarım', slug: createSlug('Organik Tarım') },
          { name: 'Çevre Koruma', slug: createSlug('Çevre Koruma') },
        ],
      },
    },
  });

  const bodrumMYO = await prisma.universityUnit.create({
    data: {
      name: 'Bodrum Meslek Yüksekokulu',
      slug: createSlug('Bodrum Meslek Yüksekokulu'),
      type: UnitType.VOCATIONAL_SCHOOL,
      universityId: mugla.id,
      departments: {
        create: [
          { name: 'Turizm ve Otel İşletmeciliği', slug: createSlug('Turizm ve Otel İşletmeciliği') },
          { name: 'Gastronomi', slug: createSlug('Gastronomi') },
          { name: 'Su Ürünleri', slug: createSlug('Su Ürünleri') },
        ],
      },
    },
  });

  const ortacaMYO = await prisma.universityUnit.create({
    data: {
      name: 'Ortaca Meslek Yüksekokulu',
      slug: createSlug('Ortaca Meslek Yüksekokulu'),
      type: UnitType.VOCATIONAL_SCHOOL,
      universityId: mugla.id,
      departments: {
        create: [
          { name: 'Bitkisel Üretim', slug: createSlug('Bitkisel Üretim') },
          { name: 'Park ve Bahçe Bitkileri', slug: createSlug('Park ve Bahçe Bitkileri') },
        ],
      },
    },
  });

  const milasMYO = await prisma.universityUnit.create({
    data: {
      name: 'Milas Meslek Yüksekokulu',
      slug: createSlug('Milas Meslek Yüksekokulu'),
      type: UnitType.VOCATIONAL_SCHOOL,
      universityId: mugla.id,
      departments: {
        create: [
          { name: 'Mobilya ve Dekorasyon', slug: createSlug('Mobilya ve Dekorasyon') },
          { name: 'Mimari Restorasyon', slug: createSlug('Mimari Restorasyon') },
        ],
      },
    },
  });

  // 🎓 ENSTİTÜLER (2 adet)
  console.log('  └─ Enstitüler ekleniyor...');

  const fenBilimleriEnst = await prisma.universityUnit.create({
    data: {
      name: 'Fen Bilimleri Enstitüsü',
      slug: createSlug('Fen Bilimleri Enstitüsü'),
      type: UnitType.GRADUATE_SCHOOL,
      universityId: mugla.id,
      departments: {
        create: [
          { name: 'Bilgisayar Mühendisliği (YL)', slug: createSlug('Bilgisayar Mühendisliği (YL)') },
          { name: 'Kimya (DR)', slug: createSlug('Kimya (DR)') },
        ],
      },
    },
  });

  const sosyalBilimlerEnst = await prisma.universityUnit.create({
    data: {
      name: 'Sosyal Bilimler Enstitüsü',
      slug: createSlug('Sosyal Bilimler Enstitüsü'),
      type: UnitType.GRADUATE_SCHOOL,
      universityId: mugla.id,
      departments: {
        create: [
          { name: 'İşletme (YL)', slug: createSlug('İşletme (YL)') },
        ],
      },
    },
  });

  // 🏋️ YÜKSEKOKUL (1 adet)
  console.log('  └─ Yüksekokullar ekleniyor...');

  const besyo = await prisma.universityUnit.create({
    data: {
      name: 'Beden Eğitimi ve Spor Yüksekokulu',
      slug: createSlug('Beden Eğitimi ve Spor Yüksekokulu'),
      type: UnitType.COLLEGE,
      universityId: mugla.id,
      departments: {
        create: [
          { name: 'Beden Eğitimi ve Spor Öğretmenliği', slug: createSlug('Beden Eğitimi ve Spor Öğretmenliği') },
          { name: 'Antrenörlük Eğitimi', slug: createSlug('Antrenörlük Eğitimi') },
        ],
      },
    },
  });

  console.log('✅ Muğla Sıtkı Koçman Üniversitesi tamamlandı!\n');

  // ==========================================
  // DİĞER BÜYÜK ÜNİVERSİTELER (Temel Yapı)
  // ==========================================

  // ANKARA ÜNİVERSİTESİ
  console.log('📍 Ankara Üniversitesi oluşturuluyor...');
  const ankara = await prisma.university.upsert({
    where: { slug: 'ankara-universitesi' },
    update: {},
    create: {
      name: 'Ankara Üniversitesi',
      slug: 'ankara-universitesi',
      city: 'Ankara',
      type: 'Devlet',
      website: 'https://www.ankara.edu.tr',
      units: {
        create: [
          {
            name: 'Hukuk Fakültesi',
            slug: createSlug('Hukuk Fakültesi'),
            type: UnitType.FACULTY,
            departments: {
              create: [
                { name: 'Kamu Hukuku', slug: createSlug('Kamu Hukuku') },
                { name: 'Özel Hukuk', slug: createSlug('Özel Hukuk') },
              ],
            },
          },
          {
            name: 'Tıp Fakültesi',
            slug: createSlug('Tıp Fakültesi'),
            type: UnitType.FACULTY,
            departments: {
              create: [
                { name: 'Dahiliye', slug: createSlug('Dahiliye') },
                { name: 'Cerrahi', slug: createSlug('Cerrahi') },
              ],
            },
          },
          {
            name: 'Mühendislik Fakültesi',
            slug: createSlug('Mühendislik Fakültesi'),
            type: UnitType.FACULTY,
            departments: {
              create: [
                { name: 'Bilgisayar Mühendisliği', slug: createSlug('Bilgisayar Mühendisliği') },
                { name: 'Elektrik-Elektronik Mühendisliği', slug: createSlug('Elektrik-Elektronik Mühendisliği') },
              ],
            },
          },
        ],
      },
    },
  });

  // HACETTEPE ÜNİVERSİTESİ
  console.log('📍 Hacettepe Üniversitesi oluşturuluyor...');
  const hacettepe = await prisma.university.upsert({
    where: { slug: 'hacettepe-universitesi' },
    update: {},
    create: {
      name: 'Hacettepe Üniversitesi',
      slug: 'hacettepe-universitesi',
      city: 'Ankara',
      type: 'Devlet',
      website: 'https://www.hacettepe.edu.tr',
      units: {
        create: [
          {
            name: 'Tıp Fakültesi',
            slug: createSlug('Tıp Fakültesi'),
            type: UnitType.FACULTY,
            departments: {
              create: [
                { name: 'Tıp', slug: createSlug('Tıp') },
              ],
            },
          },
          {
            name: 'Mühendislik Fakültesi',
            slug: createSlug('Mühendislik Fakültesi'),
            type: UnitType.FACULTY,
            departments: {
              create: [
                { name: 'Bilgisayar Mühendisliği', slug: createSlug('Bilgisayar Mühendisliği') },
              ],
            },
          },
        ],
      },
    },
  });

  // ODTÜ
  console.log('📍 Orta Doğu Teknik Üniversitesi oluşturuluyor...');
  const odtu = await prisma.university.upsert({
    where: { slug: 'odtu' },
    update: {},
    create: {
      name: 'Orta Doğu Teknik Üniversitesi',
      slug: 'odtu',
      city: 'Ankara',
      type: 'Devlet',
      website: 'https://www.metu.edu.tr',
      units: {
        create: [
          {
            name: 'Mühendislik Fakültesi',
            slug: createSlug('Mühendislik Fakültesi'),
            type: UnitType.FACULTY,
            departments: {
              create: [
                { name: 'Bilgisayar Mühendisliği', slug: createSlug('Bilgisayar Mühendisliği') },
                { name: 'Elektrik-Elektronik Mühendisliği', slug: createSlug('Elektrik-Elektronik Mühendisliği') },
                { name: 'Makine Mühendisliği', slug: createSlug('Makine Mühendisliği') },
              ],
            },
          },
          {
            name: 'Fen Edebiyat Fakültesi',
            slug: createSlug('Fen Edebiyat Fakültesi'),
            type: UnitType.FACULTY,
            departments: {
              create: [
                { name: 'Matematik', slug: createSlug('Matematik') },
                { name: 'Fizik', slug: createSlug('Fizik') },
              ],
            },
          },
        ],
      },
    },
  });

  // BOĞAZİÇİ ÜNİVERSİTESİ
  console.log('📍 Boğaziçi Üniversitesi oluşturuluyor...');
  const bogazici = await prisma.university.upsert({
    where: { slug: 'bogazici-universitesi' },
    update: {},
    create: {
      name: 'Boğaziçi Üniversitesi',
      slug: 'bogazici-universitesi',
      city: 'İstanbul',
      type: 'Devlet',
      website: 'https://www.boun.edu.tr',
      units: {
        create: [
          {
            name: 'Mühendislik Fakültesi',
            slug: createSlug('Mühendislik Fakültesi'),
            type: UnitType.FACULTY,
            departments: {
              create: [
                { name: 'Bilgisayar Mühendisliği', slug: createSlug('Bilgisayar Mühendisliği') },
                { name: 'Endüstri Mühendisliği', slug: createSlug('Endüstri Mühendisliği') },
              ],
            },
          },
          {
            name: 'İktisadi ve İdari Bilimler Fakültesi',
            slug: createSlug('İktisadi ve İdari Bilimler Fakültesi'),
            type: UnitType.FACULTY,
            departments: {
              create: [
                { name: 'İşletme', slug: createSlug('İşletme') },
                { name: 'Ekonomi', slug: createSlug('Ekonomi') },
              ],
            },
          },
        ],
      },
    },
  });

  // İSTANBUL TEKNİK ÜNİVERSİTESİ
  console.log('📍 İstanbul Teknik Üniversitesi oluşturuluyor...');
  const itu = await prisma.university.upsert({
    where: { slug: 'istanbul-teknik-universitesi' },
    update: {},
    create: {
      name: 'İstanbul Teknik Üniversitesi',
      slug: 'istanbul-teknik-universitesi',
      city: 'İstanbul',
      type: 'Devlet',
      website: 'https://www.itu.edu.tr',
      units: {
        create: [
          {
            name: 'Bilgisayar ve Bilişim Fakültesi',
            slug: createSlug('Bilgisayar ve Bilişim Fakültesi'),
            type: UnitType.FACULTY,
            departments: {
              create: [
                { name: 'Bilgisayar Mühendisliği', slug: createSlug('Bilgisayar Mühendisliği') },
                { name: 'Yapay Zeka ve Veri Mühendisliği', slug: createSlug('Yapay Zeka ve Veri Mühendisliği') },
              ],
            },
          },
          {
            name: 'İnşaat Fakültesi',
            slug: createSlug('İnşaat Fakültesi'),
            type: UnitType.FACULTY,
            departments: {
              create: [
                { name: 'İnşaat Mühendisliği', slug: createSlug('İnşaat Mühendisliği') },
              ],
            },
          },
        ],
      },
    },
  });

  // İSTANBUL ÜNİVERSİTESİ
  console.log('📍 İstanbul Üniversitesi oluşturuluyor...');
  const istanbul = await prisma.university.upsert({
    where: { slug: 'istanbul-universitesi' },
    update: {},
    create: {
      name: 'İstanbul Üniversitesi',
      slug: 'istanbul-universitesi',
      city: 'İstanbul',
      type: 'Devlet',
      website: 'https://www.istanbul.edu.tr',
      units: {
        create: [
          {
            name: 'Hukuk Fakültesi',
            slug: createSlug('Hukuk Fakültesi'),
            type: UnitType.FACULTY,
            departments: {
              create: [
                { name: 'Hukuk', slug: createSlug('Hukuk') },
              ],
            },
          },
          {
            name: 'İktisat Fakültesi',
            slug: createSlug('İktisat Fakültesi'),
            type: UnitType.FACULTY,
            departments: {
              create: [
                { name: 'İktisat', slug: createSlug('İktisat') },
              ],
            },
          },
        ],
      },
    },
  });

  // MARMARA ÜNİVERSİTESİ
  console.log('📍 Marmara Üniversitesi oluşturuluyor...');
  const marmara = await prisma.university.upsert({
    where: { slug: 'marmara-universitesi' },
    update: {},
    create: {
      name: 'Marmara Üniversitesi',
      slug: 'marmara-universitesi',
      city: 'İstanbul',
      type: 'Devlet',
      website: 'https://www.marmara.edu.tr',
      units: {
        create: [
          {
            name: 'Mühendislik Fakültesi',
            slug: createSlug('Mühendislik Fakültesi'),
            type: UnitType.FACULTY,
            departments: {
              create: [
                { name: 'Bilgisayar Mühendisliği', slug: createSlug('Bilgisayar Mühendisliği') },
                { name: 'Makine Mühendisliği', slug: createSlug('Makine Mühendisliği') },
              ],
            },
          },
          {
            name: 'İletişim Fakültesi',
            slug: createSlug('İletişim Fakültesi'),
            type: UnitType.FACULTY,
            departments: {
              create: [
                { name: 'Gazetecilik', slug: createSlug('Gazetecilik') },
                { name: 'Halkla İlişkiler', slug: createSlug('Halkla İlişkiler') },
              ],
            },
          },
        ],
      },
    },
  });

  // YILDIZ TEKNİK ÜNİVERSİTESİ
  console.log('📍 Yıldız Teknik Üniversitesi oluşturuluyor...');
  const yildiz = await prisma.university.upsert({
    where: { slug: 'yildiz-teknik-universitesi' },
    update: {},
    create: {
      name: 'Yıldız Teknik Üniversitesi',
      slug: 'yildiz-teknik-universitesi',
      city: 'İstanbul',
      type: 'Devlet',
      website: 'https://www.yildiz.edu.tr',
      units: {
        create: [
          {
            name: 'Elektrik-Elektronik Fakültesi',
            slug: createSlug('Elektrik-Elektronik Fakültesi'),
            type: UnitType.FACULTY,
            departments: {
              create: [
                { name: 'Elektrik Mühendisliği', slug: createSlug('Elektrik Mühendisliği') },
                { name: 'Elektronik ve Haberleşme Mühendisliği', slug: createSlug('Elektronik ve Haberleşme Mühendisliği') },
              ],
            },
          },
        ],
      },
    },
  });

  // KOÇ ÜNİVERSİTESİ (Vakıf)
  console.log('📍 Koç Üniversitesi oluşturuluyor...');
  const koc = await prisma.university.upsert({
    where: { slug: 'koc-universitesi' },
    update: {},
    create: {
      name: 'Koç Üniversitesi',
      slug: 'koc-universitesi',
      city: 'İstanbul',
      type: 'Vakıf',
      website: 'https://www.ku.edu.tr',
      units: {
        create: [
          {
            name: 'Mühendislik Fakültesi',
            slug: createSlug('Mühendislik Fakültesi'),
            type: UnitType.FACULTY,
            departments: {
              create: [
                { name: 'Bilgisayar Mühendisliği', slug: createSlug('Bilgisayar Mühendisliği') },
                { name: 'Endüstri Mühendisliği', slug: createSlug('Endüstri Mühendisliği') },
              ],
            },
          },
          {
            name: 'İdari Bilimler ve İktisat Fakültesi',
            slug: createSlug('İdari Bilimler ve İktisat Fakültesi'),
            type: UnitType.FACULTY,
            departments: {
              create: [
                { name: 'İşletme', slug: createSlug('İşletme') },
              ],
            },
          },
        ],
      },
    },
  });

  // SABANCI ÜNİVERSİTESİ (Vakıf)
  console.log('📍 Sabancı Üniversitesi oluşturuluyor...');
  const sabanci = await prisma.university.upsert({
    where: { slug: 'sabanci-universitesi' },
    update: {},
    create: {
      name: 'Sabancı Üniversitesi',
      slug: 'sabanci-universitesi',
      city: 'İstanbul',
      type: 'Vakıf',
      website: 'https://www.sabanciuniv.edu',
      units: {
        create: [
          {
            name: 'Mühendislik ve Doğa Bilimleri Fakültesi',
            slug: createSlug('Mühendislik ve Doğa Bilimleri Fakültesi'),
            type: UnitType.FACULTY,
            departments: {
              create: [
                { name: 'Bilgisayar Bilimi ve Mühendisliği', slug: createSlug('Bilgisayar Bilimi ve Mühendisliği') },
                { name: 'Endüstri Mühendisliği', slug: createSlug('Endüstri Mühendisliği') },
              ],
            },
          },
        ],
      },
    },
  });

  // EGE ÜNİVERSİTESİ
  console.log('📍 Ege Üniversitesi oluşturuluyor...');
  const ege = await prisma.university.upsert({
    where: { slug: 'ege-universitesi' },
    update: {},
    create: {
      name: 'Ege Üniversitesi',
      slug: 'ege-universitesi',
      city: 'İzmir',
      type: 'Devlet',
      website: 'https://www.ege.edu.tr',
      units: {
        create: [
          {
            name: 'Mühendislik Fakültesi',
            slug: createSlug('Mühendislik Fakültesi'),
            type: UnitType.FACULTY,
            departments: {
              create: [
                { name: 'Bilgisayar Mühendisliği', slug: createSlug('Bilgisayar Mühendisliği') },
                { name: 'Elektrik-Elektronik Mühendisliği', slug: createSlug('Elektrik-Elektronik Mühendisliği') },
              ],
            },
          },
          {
            name: 'Tıp Fakültesi',
            slug: createSlug('Tıp Fakültesi'),
            type: UnitType.FACULTY,
            departments: {
              create: [
                { name: 'Tıp', slug: createSlug('Tıp') },
              ],
            },
          },
        ],
      },
    },
  });

  // DOKUZ EYLÜL ÜNİVERSİTESİ
  console.log('📍 Dokuz Eylül Üniversitesi oluşturuluyor...');
  const dokuzEylul = await prisma.university.upsert({
    where: { slug: 'dokuz-eylul-universitesi' },
    update: {},
    create: {
      name: 'Dokuz Eylül Üniversitesi',
      slug: 'dokuz-eylul-universitesi',
      city: 'İzmir',
      type: 'Devlet',
      website: 'https://www.deu.edu.tr',
      units: {
        create: [
          {
            name: 'Mühendislik Fakültesi',
            slug: createSlug('Mühendislik Fakültesi'),
            type: UnitType.FACULTY,
            departments: {
              create: [
                { name: 'Bilgisayar Mühendisliği', slug: createSlug('Bilgisayar Mühendisliği') },
              ],
            },
          },
          {
            name: 'Güzel Sanatlar Fakültesi',
            slug: createSlug('Güzel Sanatlar Fakültesi'),
            type: UnitType.FACULTY,
            departments: {
              create: [
                { name: 'Resim', slug: createSlug('Resim') },
                { name: 'Heykel', slug: createSlug('Heykel') },
              ],
            },
          },
          {
            name: 'Devlet Konservatuvarı',
            slug: createSlug('Devlet Konservatuvarı'),
            type: UnitType.CONSERVATORY,
            departments: {
              create: [
                { name: 'Müzik', slug: createSlug('Müzik') },
                { name: 'Opera', slug: createSlug('Opera') },
              ],
            },
          },
        ],
      },
    },
  });

  // ERCİYES ÜNİVERSİTESİ
  console.log('📍 Erciyes Üniversitesi oluşturuluyor...');
  const erciyes = await prisma.university.upsert({
    where: { slug: 'erciyes-universitesi' },
    update: {},
    create: {
      name: 'Erciyes Üniversitesi',
      slug: 'erciyes-universitesi',
      city: 'Kayseri',
      type: 'Devlet',
      website: 'https://www.erciyes.edu.tr',
      units: {
        create: [
          {
            name: 'Mühendislik Fakültesi',
            slug: createSlug('Mühendislik Fakültesi'),
            type: UnitType.FACULTY,
            departments: {
              create: [
                { name: 'Bilgisayar Mühendisliği', slug: createSlug('Bilgisayar Mühendisliği') },
              ],
            },
          },
          {
            name: 'Tıp Fakültesi',
            slug: createSlug('Tıp Fakültesi'),
            type: UnitType.FACULTY,
            departments: {
              create: [
                { name: 'Tıp', slug: createSlug('Tıp') },
              ],
            },
          },
        ],
      },
    },
  });

  // SELÇUK ÜNİVERSİTESİ
  console.log('📍 Selçuk Üniversitesi oluşturuluyor...');
  const selcuk = await prisma.university.upsert({
    where: { slug: 'selcuk-universitesi' },
    update: {},
    create: {
      name: 'Selçuk Üniversitesi',
      slug: 'selcuk-universitesi',
      city: 'Konya',
      type: 'Devlet',
      website: 'https://www.selcuk.edu.tr',
      units: {
        create: [
          {
            name: 'Mühendislik Fakültesi',
            slug: createSlug('Mühendislik Fakültesi'),
            type: UnitType.FACULTY,
            departments: {
              create: [
                { name: 'Bilgisayar Mühendisliği', slug: createSlug('Bilgisayar Mühendisliği') },
              ],
            },
          },
          {
            name: 'İlahiyat Fakültesi',
            slug: createSlug('İlahiyat Fakültesi'),
            type: UnitType.FACULTY,
            departments: {
              create: [
                { name: 'İlahiyat', slug: createSlug('İlahiyat') },
              ],
            },
          },
        ],
      },
    },
  });

  // ATATÜRK ÜNİVERSİTESİ
  console.log('📍 Atatürk Üniversitesi oluşturuluyor...');
  const ataturk = await prisma.university.upsert({
    where: { slug: 'ataturk-universitesi' },
    update: {},
    create: {
      name: 'Atatürk Üniversitesi',
      slug: 'ataturk-universitesi',
      city: 'Erzurum',
      type: 'Devlet',
      website: 'https://www.atauni.edu.tr',
      units: {
        create: [
          {
            name: 'Mühendislik Fakültesi',
            slug: createSlug('Mühendislik Fakültesi'),
            type: UnitType.FACULTY,
            departments: {
              create: [
                { name: 'Bilgisayar Mühendisliği', slug: createSlug('Bilgisayar Mühendisliği') },
              ],
            },
          },
        ],
      },
    },
  });

  // ÇUKUROVA ÜNİVERSİTESİ
  console.log('📍 Çukurova Üniversitesi oluşturuluyor...');
  const cukurova = await prisma.university.upsert({
    where: { slug: 'cukurova-universitesi' },
    update: {},
    create: {
      name: 'Çukurova Üniversitesi',
      slug: 'cukurova-universitesi',
      city: 'Adana',
      type: 'Devlet',
      website: 'https://www.cu.edu.tr',
      units: {
        create: [
          {
            name: 'Mühendislik Fakültesi',
            slug: createSlug('Mühendislik Fakültesi'),
            type: UnitType.FACULTY,
            departments: {
              create: [
                { name: 'Bilgisayar Mühendisliği', slug: createSlug('Bilgisayar Mühendisliği') },
              ],
            },
          },
          {
            name: 'Ziraat Fakültesi',
            slug: createSlug('Ziraat Fakültesi'),
            type: UnitType.FACULTY,
            departments: {
              create: [
                { name: 'Tarım Ekonomisi', slug: createSlug('Tarım Ekonomisi') },
              ],
            },
          },
        ],
      },
    },
  });

  // ULUDAĞ ÜNİVERSİTESİ
  console.log('📍 Uludağ Üniversitesi oluşturuluyor...');
  const uludag = await prisma.university.upsert({
    where: { slug: 'uludag-universitesi' },
    update: {},
    create: {
      name: 'Uludağ Üniversitesi',
      slug: 'uludag-universitesi',
      city: 'Bursa',
      type: 'Devlet',
      website: 'https://www.uludag.edu.tr',
      units: {
        create: [
          {
            name: 'Mühendislik Fakültesi',
            slug: createSlug('Mühendislik Fakültesi'),
            type: UnitType.FACULTY,
            departments: {
              create: [
                { name: 'Bilgisayar Mühendisliği', slug: createSlug('Bilgisayar Mühendisliği') },
              ],
            },
          },
        ],
      },
    },
  });

  // AKDENİZ ÜNİVERSİTESİ
  console.log('📍 Akdeniz Üniversitesi oluşturuluyor...');
  const akdeniz = await prisma.university.upsert({
    where: { slug: 'akdeniz-universitesi' },
    update: {},
    create: {
      name: 'Akdeniz Üniversitesi',
      slug: 'akdeniz-universitesi',
      city: 'Antalya',
      type: 'Devlet',
      website: 'https://www.akdeniz.edu.tr',
      units: {
        create: [
          {
            name: 'Mühendislik Fakültesi',
            slug: createSlug('Mühendislik Fakültesi'),
            type: UnitType.FACULTY,
            departments: {
              create: [
                { name: 'Bilgisayar Mühendisliği', slug: createSlug('Bilgisayar Mühendisliği') },
              ],
            },
          },
          {
            name: 'Turizm Fakültesi',
            slug: createSlug('Turizm Fakültesi'),
            type: UnitType.FACULTY,
            departments: {
              create: [
                { name: 'Turizm İşletmeciliği', slug: createSlug('Turizm İşletmeciliği') },
              ],
            },
          },
        ],
      },
    },
  });

  console.log('\n✅ TÜM ÜNİVERSİTELER OLUŞTURULDU!\n');

  // İSTATİSTİKLER
  const stats = await prisma.$transaction([
    prisma.university.count(),
    prisma.universityUnit.count(),
    prisma.department.count(),
  ]);

  console.log('📊 İSTATİSTİKLER:');
  console.log(`   🏫 Üniversiteler: ${stats[0]}`);
  console.log(`   🏛️  Birimler (Fakülte, MYO, vb.): ${stats[1]}`);
  console.log(`   📚 Bölümler: ${stats[2]}`);
  console.log('\n🎉 Seed işlemi başarıyla tamamlandı!\n');
}

main()
  .catch((e) => {
    console.error('❌ Hata:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
