// Türkiye'deki tüm üniversiteler, fakülteler ve bölümler
export const universities = [
  {
    id: 'istanbul',
    name: 'İstanbul Üniversitesi',
    faculties: [
      {
        id: 'tip',
        name: 'Tıp Fakültesi',
        departments: ['Tıp', 'Diş Hekimliği']
      },
      {
        id: 'muhendislik',
        name: 'Mühendislik Fakültesi',
        departments: ['Bilgisayar Mühendisliği', 'Elektrik-Elektronik Mühendisliği', 'Makine Mühendisliği', 'İnşaat Mühendisliği']
      },
      {
        id: 'edebiyat',
        name: 'Edebiyat Fakültesi',
        departments: ['Türk Dili ve Edebiyatı', 'İngiliz Dili ve Edebiyatı', 'Tarih', 'Felsefe', 'Sosyoloji']
      },
      {
        id: 'hukuk',
        name: 'Hukuk Fakültesi',
        departments: ['Hukuk']
      },
      {
        id: 'isletme',
        name: 'İşletme Fakültesi',
        departments: ['İşletme', 'Uluslararası İşletme', 'İnsan Kaynakları Yönetimi']
      },
      {
        id: 'iktisadi',
        name: 'İktisat Fakültesi',
        departments: ['İktisat', 'Maliye', 'Çalışma Ekonomisi']
      },
      {
        id: 'eczacilik',
        name: 'Eczacılık Fakültesi',
        departments: ['Eczacılık']
      },
      {
        id: 'veteriner',
        name: 'Veteriner Fakültesi',
        departments: ['Veterinerlik']
      }
    ]
  },
  {
    id: 'odtu',
    name: 'Orta Doğu Teknik Üniversitesi (ODTÜ)',
    faculties: [
      {
        id: 'muhendislik',
        name: 'Mühendislik Fakültesi',
        departments: ['Bilgisayar Mühendisliği', 'Elektrik-Elektronik Mühendisliği', 'Makine Mühendisliği', 'İnşaat Mühendisliği', 'Kimya Mühendisliği', 'Endüstri Mühendisliği']
      },
      {
        id: 'fen-edebiyat',
        name: 'Fen-Edebiyat Fakültesi',
        departments: ['Matematik', 'Fizik', 'Kimya', 'Biyoloji', 'İstatistik']
      },
      {
        id: 'mimari',
        name: 'Mimarlık Fakültesi',
        departments: ['Mimarlık', 'Şehir ve Bölge Planlama', 'Endüstri Ürünleri Tasarımı']
      },
      {
        id: 'iktisadi-idari',
        name: 'İktisadi ve İdari Bilimler Fakültesi',
        departments: ['İktisat', 'İşletme', 'Uluslararası İlişkiler', 'Siyaset Bilimi ve Kamu Yönetimi']
      }
    ]
  },
  {
    id: 'bogazici',
    name: 'Boğaziçi Üniversitesi',
    faculties: [
      {
        id: 'muhendislik',
        name: 'Mühendislik Fakültesi',
        departments: ['Bilgisayar Mühendisliği', 'Elektrik-Elektronik Mühendisliği', 'Makine Mühendisliği', 'İnşaat Mühendisliği', 'Endüstri Mühendisliği']
      },
      {
        id: 'fen-edebiyat',
        name: 'Fen-Edebiyat Fakültesi',
        departments: ['Matematik', 'Fizik', 'Kimya', 'Moleküler Biyoloji ve Genetik']
      },
      {
        id: 'iktisadi-idari',
        name: 'İktisadi ve İdari Bilimler Fakültesi',
        departments: ['İktisat', 'İşletme', 'Uluslararası Ticaret', 'Yönetim Bilişim Sistemleri']
      },
      {
        id: 'egitim',
        name: 'Eğitim Fakültesi',
        departments: ['İngilizce Öğretmenliği', 'Bilgisayar ve Öğretim Teknolojileri Öğretmenliği', 'Rehberlik ve Psikolojik Danışmanlık']
      }
    ]
  },
  {
    id: 'itu',
    name: 'İstanbul Teknik Üniversitesi (İTÜ)',
    faculties: [
      {
        id: 'muhendislik',
        name: 'İnşaat Fakültesi',
        departments: ['İnşaat Mühendisliği', 'Geomatik Mühendisliği']
      },
      {
        id: 'elektrik-elektronik',
        name: 'Elektrik-Elektronik Fakültesi',
        departments: ['Elektrik Mühendisliği', 'Elektronik ve Haberleşme Mühendisliği', 'Kontrol ve Otomasyon Mühendisliği']
      },
      {
        id: 'makine',
        name: 'Makine Fakültesi',
        departments: ['Makine Mühendisliği', 'Endüstri Mühendisliği', 'Uçak ve Uzay Mühendisliği']
      },
      {
        id: 'bilgisayar-bilisim',
        name: 'Bilgisayar ve Bilişim Fakültesi',
        departments: ['Bilgisayar Mühendisliği', 'Yazılım Mühendisliği', 'Yapay Zeka ve Veri Mühendisliği']
      },
      {
        id: 'mimari',
        name: 'Mimarlık Fakültesi',
        departments: ['Mimarlık', 'Şehir ve Bölge Planlama', 'Endüstri Ürünleri Tasarımı']
      }
    ]
  },
  {
    id: 'ankara',
    name: 'Ankara Üniversitesi',
    faculties: [
      {
        id: 'tip',
        name: 'Tıp Fakültesi',
        departments: ['Tıp']
      },
      {
        id: 'dis-hekimligi',
        name: 'Diş Hekimliği Fakültesi',
        departments: ['Diş Hekimliği']
      },
      {
        id: 'hukuk',
        name: 'Hukuk Fakültesi',
        departments: ['Hukuk']
      },
      {
        id: 'siyasal-bilgiler',
        name: 'Siyasal Bilgiler Fakültesi',
        departments: ['Siyaset Bilimi', 'Kamu Yönetimi', 'Uluslararası İlişkiler', 'İktisat', 'İşletme']
      },
      {
        id: 'dil-tarih-cografya',
        name: 'Dil ve Tarih-Coğrafya Fakültesi',
        departments: ['Tarih', 'Coğrafya', 'Türk Dili ve Edebiyatı', 'Arkeoloji', 'Felsefe']
      },
      {
        id: 'eczacilik',
        name: 'Eczacılık Fakültesi',
        departments: ['Eczacılık']
      }
    ]
  },
  {
    id: 'hacettepe',
    name: 'Hacettepe Üniversitesi',
    faculties: [
      {
        id: 'tip',
        name: 'Tıp Fakültesi',
        departments: ['Tıp']
      },
      {
        id: 'muhendislik',
        name: 'Mühendislik Fakültesi',
        departments: ['Bilgisayar Mühendisliği', 'Elektrik-Elektronik Mühendisliği', 'Makine Mühendisliği', 'Kimya Mühendisliği']
      },
      {
        id: 'iktisadi-idari',
        name: 'İktisadi ve İdari Bilimler Fakültesi',
        departments: ['İktisat', 'İşletme', 'Uluslararası İlişkiler']
      },
      {
        id: 'saglik-bilimleri',
        name: 'Sağlık Bilimleri Fakültesi',
        departments: ['Hemşirelik', 'Beslenme ve Diyetetik', 'Fizyoterapi ve Rehabilitasyon']
      }
    ]
  },
  {
    id: 'ege',
    name: 'Ege Üniversitesi',
    faculties: [
      {
        id: 'tip',
        name: 'Tıp Fakültesi',
        departments: ['Tıp']
      },
      {
        id: 'muhendislik',
        name: 'Mühendislik Fakültesi',
        departments: ['Bilgisayar Mühendisliği', 'Elektrik-Elektronik Mühendisliği', 'Makine Mühendisliği', 'İnşaat Mühendisliği']
      },
      {
        id: 'iktisadi-idari',
        name: 'İktisadi ve İdari Bilimler Fakültesi',
        departments: ['İktisat', 'İşletme', 'Maliye', 'Çalışma Ekonomisi']
      },
      {
        id: 'ziraat',
        name: 'Ziraat Fakültesi',
        departments: ['Tarım Ekonomisi', 'Bahçe Bitkileri', 'Toprak Bilimi ve Bitki Besleme']
      }
    ]
  },
  {
    id: 'gazi',
    name: 'Gazi Üniversitesi',
    faculties: [
      {
        id: 'muhendislik',
        name: 'Mühendislik Fakültesi',
        departments: ['Bilgisayar Mühendisliği', 'Elektrik-Elektronik Mühendisliği', 'Makine Mühendisliği', 'İnşaat Mühendisliği']
      },
      {
        id: 'tip',
        name: 'Tıp Fakültesi',
        departments: ['Tıp']
      },
      {
        id: 'egitim',
        name: 'Gazi Eğitim Fakültesi',
        departments: ['Okul Öncesi Öğretmenliği', 'Sınıf Öğretmenliği', 'Matematik Öğretmenliği', 'Türkçe Öğretmenliği']
      },
      {
        id: 'iktisadi-idari',
        name: 'İktisadi ve İdari Bilimler Fakültesi',
        departments: ['İktisat', 'İşletme', 'Maliye', 'Uluslararası Ticaret ve Lojistik']
      }
    ]
  },
  {
    id: 'marmara',
    name: 'Marmara Üniversitesi',
    faculties: [
      {
        id: 'tip',
        name: 'Tıp Fakültesi',
        departments: ['Tıp']
      },
      {
        id: 'muhendislik',
        name: 'Mühendislik Fakültesi',
        departments: ['Bilgisayar Mühendisliği', 'Elektrik-Elektronik Mühendisliği', 'Makine Mühendisliği', 'İnşaat Mühendisliği']
      },
      {
        id: 'iktisadi-idari',
        name: 'İktisadi ve İdari Bilimler Fakültesi',
        departments: ['İktisat', 'İşletme', 'Maliye', 'Çalışma Ekonomisi']
      },
      {
        id: 'iletisim',
        name: 'İletişim Fakültesi',
        departments: ['Gazetecilik', 'Halkla İlişkiler ve Tanıtım', 'Radyo, Televizyon ve Sinema']
      }
    ]
  },
  {
    id: 'dokuz-eylul',
    name: 'Dokuz Eylül Üniversitesi',
    faculties: [
      {
        id: 'tip',
        name: 'Tıp Fakültesi',
        departments: ['Tıp']
      },
      {
        id: 'muhendislik',
        name: 'Mühendislik Fakültesi',
        departments: ['Bilgisayar Mühendisliği', 'Elektrik-Elektronik Mühendisliği', 'Makine Mühendisliği', 'İnşaat Mühendisliği']
      },
      {
        id: 'iktisadi-idari',
        name: 'İktisadi ve İdari Bilimler Fakültesi',
        departments: ['İktisat', 'İşletme', 'Maliye', 'Uluslararası İlişkiler']
      },
      {
        id: 'denizcilik',
        name: 'Denizcilik Fakültesi',
        departments: ['Gemi Makineleri İşletme Mühendisliği', 'Gemi İnşaatı ve Gemi Makineleri Mühendisliği']
      }
    ]
  },
  {
    id: 'koc',
    name: 'Koç Üniversitesi',
    faculties: [
      {
        id: 'muhendislik',
        name: 'Mühendislik Fakültesi',
        departments: ['Bilgisayar Mühendisliği', 'Elektrik-Elektronik Mühendisliği', 'Makine Mühendisliği', 'Endüstri Mühendisliği']
      },
      {
        id: 'iktisadi-idari',
        name: 'İktisadi ve İdari Bilimler Fakültesi',
        departments: ['İktisat', 'İşletme', 'Uluslararası İlişkiler']
      },
      {
        id: 'tip',
        name: 'Tıp Fakültesi',
        departments: ['Tıp']
      }
    ]
  },
  {
    id: 'sabanci',
    name: 'Sabancı Üniversitesi',
    faculties: [
      {
        id: 'muhendislik',
        name: 'Mühendislik ve Doğa Bilimleri Fakültesi',
        departments: ['Bilgisayar Bilimi ve Mühendisliği', 'Elektronik Mühendisliği', 'Endüstri Mühendisliği', 'Malzeme Bilimi ve Nanoteknoloji']
      },
      {
        id: 'isletme',
        name: 'Yönetim Bilimleri Fakültesi',
        departments: ['İşletme', 'Ekonomi']
      },
      {
        id: 'sanat-sosyal',
        name: 'Sanat ve Sosyal Bilimler Fakültesi',
        departments: ['Psikoloji', 'Siyaset Bilimi', 'Görsel Sanatlar ve Görsel İletişim Tasarımı']
      }
    ]
  },
  {
    id: 'bilkent',
    name: 'Bilkent Üniversitesi',
    faculties: [
      {
        id: 'muhendislik',
        name: 'Mühendislik Fakültesi',
        departments: ['Bilgisayar Mühendisliği', 'Elektrik ve Elektronik Mühendisliği', 'Makine Mühendisliği', 'Endüstri Mühendisliği']
      },
      {
        id: 'iktisadi-idari',
        name: 'İktisadi, İdari ve Sosyal Bilimler Fakültesi',
        departments: ['İktisat', 'İşletme', 'Uluslararası İlişkiler', 'Psikoloji']
      },
      {
        id: 'fen',
        name: 'Fen Fakültesi',
        departments: ['Matematik', 'Fizik', 'Kimya', 'Moleküler Biyoloji ve Genetik']
      }
    ]
  },
  {
    id: 'yildiz-teknik',
    name: 'Yıldız Teknik Üniversitesi',
    faculties: [
      {
        id: 'muhendislik',
        name: 'Mühendislik Fakültesi',
        departments: ['Bilgisayar Mühendisliği', 'Elektrik-Elektronik Mühendisliği', 'Makine Mühendisliği', 'İnşaat Mühendisliği', 'Kimya Mühendisliği']
      },
      {
        id: 'mimari',
        name: 'Mimarlık Fakültesi',
        departments: ['Mimarlık', 'Şehir ve Bölge Planlama', 'İç Mimarlık']
      },
      {
        id: 'iktisadi-idari',
        name: 'İktisadi ve İdari Bilimler Fakültesi',
        departments: ['İşletme', 'Uluslararası Ticaret ve Lojistik']
      }
    ]
  },
  {
    id: 'selcuk',
    name: 'Selçuk Üniversitesi',
    faculties: [
      {
        id: 'muhendislik',
        name: 'Mühendislik Fakültesi',
        departments: ['Bilgisayar Mühendisliği', 'Elektrik-Elektronik Mühendisliği', 'Makine Mühendisliği', 'İnşaat Mühendisliği']
      },
      {
        id: 'tip',
        name: 'Tıp Fakültesi',
        departments: ['Tıp']
      },
      {
        id: 'iktisadi-idari',
        name: 'İktisadi ve İdari Bilimler Fakültesi',
        departments: ['İktisat', 'İşletme', 'Maliye']
      },
      {
        id: 'edebiyat',
        name: 'Edebiyat Fakültesi',
        departments: ['Türk Dili ve Edebiyatı', 'Tarih', 'Coğrafya', 'Felsefe']
      }
    ]
  },
  {
    id: 'ataturk',
    name: 'Atatürk Üniversitesi',
    faculties: [
      {
        id: 'tip',
        name: 'Tıp Fakültesi',
        departments: ['Tıp']
      },
      {
        id: 'muhendislik',
        name: 'Mühendislik Fakültesi',
        departments: ['Bilgisayar Mühendisliği', 'Elektrik-Elektronik Mühendisliği', 'Makine Mühendisliği', 'İnşaat Mühendisliği']
      },
      {
        id: 'iktisadi-idari',
        name: 'İktisadi ve İdari Bilimler Fakültesi',
        departments: ['İktisat', 'İşletme', 'Maliye', 'Uluslararası İlişkiler']
      },
      {
        id: 'edebiyat',
        name: 'Edebiyat Fakültesi',
        departments: ['Türk Dili ve Edebiyatı', 'Tarih', 'Coğrafya']
      }
    ]
  },
  {
    id: 'erciyes',
    name: 'Erciyes Üniversitesi',
    faculties: [
      {
        id: 'tip',
        name: 'Tıp Fakültesi',
        departments: ['Tıp']
      },
      {
        id: 'muhendislik',
        name: 'Mühendislik Fakültesi',
        departments: ['Bilgisayar Mühendisliği', 'Elektrik-Elektronik Mühendisliği', 'Makine Mühendisliği', 'İnşaat Mühendisliği']
      },
      {
        id: 'iktisadi-idari',
        name: 'İktisadi ve İdari Bilimler Fakültesi',
        departments: ['İktisat', 'İşletme', 'Maliye']
      }
    ]
  },
  {
    id: 'cukurova',
    name: 'Çukurova Üniversitesi',
    faculties: [
      {
        id: 'tip',
        name: 'Tıp Fakültesi',
        departments: ['Tıp']
      },
      {
        id: 'muhendislik',
        name: 'Mühendislik Fakültesi',
        departments: ['Bilgisayar Mühendisliği', 'Elektrik-Elektronik Mühendisliği', 'Makine Mühendisliği', 'İnşaat Mühendisliği']
      },
      {
        id: 'ziraat',
        name: 'Ziraat Fakültesi',
        departments: ['Tarım Ekonomisi', 'Toprak Bilimi', 'Bahçe Bitkileri']
      },
      {
        id: 'iktisadi-idari',
        name: 'İktisadi ve İdari Bilimler Fakültesi',
        departments: ['İktisat', 'İşletme', 'Maliye']
      }
    ]
  },
  {
    id: 'uludag',
    name: 'Uludağ Üniversitesi',
    faculties: [
      {
        id: 'tip',
        name: 'Tıp Fakültesi',
        departments: ['Tıp']
      },
      {
        id: 'muhendislik',
        name: 'Mühendislik Fakültesi',
        departments: ['Bilgisayar Mühendisliği', 'Elektrik-Elektronik Mühendisliği', 'Makine Mühendisliği', 'İnşaat Mühendisliği']
      },
      {
        id: 'iktisadi-idari',
        name: 'İktisadi ve İdari Bilimler Fakültesi',
        departments: ['İktisat', 'İşletme', 'Maliye', 'Çalışma Ekonomisi']
      }
    ]
  },
  {
    id: 'akdeniz',
    name: 'Akdeniz Üniversitesi',
    faculties: [
      {
        id: 'tip',
        name: 'Tıp Fakültesi',
        departments: ['Tıp']
      },
      {
        id: 'muhendislik',
        name: 'Mühendislik Fakültesi',
        departments: ['Bilgisayar Mühendisliği', 'Elektrik-Elektronik Mühendisliği', 'Makine Mühendisliği', 'İnşaat Mühendisliği']
      },
      {
        id: 'iktisadi-idari',
        name: 'İktisadi ve İdari Bilimler Fakültesi',
        departments: ['İktisat', 'İşletme', 'Maliye', 'Uluslararası İlişkiler']
      },
      {
        id: 'iletisim',
        name: 'İletişim Fakültesi',
        departments: ['Gazetecilik', 'Halkla İlişkiler', 'Radyo, Televizyon ve Sinema']
      }
    ]
  },
  {
    id: 'ondokuz-mayis',
    name: 'Ondokuz Mayıs Üniversitesi',
    faculties: [
      {
        id: 'tip',
        name: 'Tıp Fakültesi',
        departments: ['Tıp']
      },
      {
        id: 'muhendislik',
        name: 'Mühendislik Fakültesi',
        departments: ['Bilgisayar Mühendisliği', 'Elektrik-Elektronik Mühendisliği', 'Makine Mühendisliği', 'İnşaat Mühendisliği']
      },
      {
        id: 'iktisadi-idari',
        name: 'İktisadi ve İdari Bilimler Fakültesi',
        departments: ['İktisat', 'İşletme', 'Maliye']
      }
    ]
  },
  {
    id: 'karadeniz-teknik',
    name: 'Karadeniz Teknik Üniversitesi',
    faculties: [
      {
        id: 'muhendislik',
        name: 'Mühendislik Fakültesi',
        departments: ['Bilgisayar Mühendisliği', 'Elektrik-Elektronik Mühendisliği', 'Makine Mühendisliği', 'İnşaat Mühendisliği']
      },
      {
        id: 'tip',
        name: 'Tıp Fakültesi',
        departments: ['Tıp']
      },
      {
        id: 'iktisadi-idari',
        name: 'İktisadi ve İdari Bilimler Fakültesi',
        departments: ['İktisat', 'İşletme', 'Maliye']
      }
    ]
  },
  {
    id: 'firat',
    name: 'Fırat Üniversitesi',
    faculties: [
      {
        id: 'tip',
        name: 'Tıp Fakültesi',
        departments: ['Tıp']
      },
      {
        id: 'muhendislik',
        name: 'Mühendislik Fakültesi',
        departments: ['Bilgisayar Mühendisliği', 'Elektrik-Elektronik Mühendisliği', 'Makine Mühendisliği', 'İnşaat Mühendisliği']
      },
      {
        id: 'iktisadi-idari',
        name: 'İktisadi ve İdari Bilimler Fakültesi',
        departments: ['İktisat', 'İşletme', 'Maliye']
      }
    ]
  },
  {
    id: 'sakarya',
    name: 'Sakarya Üniversitesi',
    faculties: [
      {
        id: 'muhendislik',
        name: 'Mühendislik Fakültesi',
        departments: ['Bilgisayar Mühendisliği', 'Elektrik-Elektronik Mühendisliği', 'Makine Mühendisliği', 'İnşaat Mühendisliği']
      },
      {
        id: 'iktisadi-idari',
        name: 'İşletme Fakültesi',
        departments: ['İşletme', 'Uluslararası Ticaret', 'Yönetim Bilişim Sistemleri']
      },
      {
        id: 'siyasal',
        name: 'Siyasal Bilgiler Fakültesi',
        departments: ['İktisat', 'Maliye', 'Siyaset Bilimi ve Kamu Yönetimi']
      }
    ]
  },
  {
    id: 'pamukkale',
    name: 'Pamukkale Üniversitesi',
    faculties: [
      {
        id: 'tip',
        name: 'Tıp Fakültesi',
        departments: ['Tıp']
      },
      {
        id: 'muhendislik',
        name: 'Mühendislik Fakültesi',
        departments: ['Bilgisayar Mühendisliği', 'Elektrik-Elektronik Mühendisliği', 'Makine Mühendisliği', 'İnşaat Mühendisliği']
      },
      {
        id: 'iktisadi-idari',
        name: 'İktisadi ve İdari Bilimler Fakültesi',
        departments: ['İktisat', 'İşletme', 'Maliye']
      }
    ]
  },
  {
    id: 'suleyman-demirel',
    name: 'Süleyman Demirel Üniversitesi',
    faculties: [
      {
        id: 'tip',
        name: 'Tıp Fakültesi',
        departments: ['Tıp']
      },
      {
        id: 'muhendislik',
        name: 'Mühendislik Fakültesi',
        departments: ['Bilgisayar Mühendisliği', 'Elektrik-Elektronik Mühendisliği', 'Makine Mühendisliği', 'İnşaat Mühendisliği']
      },
      {
        id: 'iktisadi-idari',
        name: 'İktisadi ve İdari Bilimler Fakültesi',
        departments: ['İktisat', 'İşletme', 'Maliye']
      }
    ]
  },
  {
    id: 'gaziantep',
    name: 'Gaziantep Üniversitesi',
    faculties: [
      {
        id: 'tip',
        name: 'Tıp Fakültesi',
        departments: ['Tıp']
      },
      {
        id: 'muhendislik',
        name: 'Mühendislik Fakültesi',
        departments: ['Bilgisayar Mühendisliği', 'Elektrik-Elektronik Mühendisliği', 'Makine Mühendisliği', 'İnşaat Mühendisliği']
      },
      {
        id: 'iktisadi-idari',
        name: 'İktisadi ve İdari Bilimler Fakültesi',
        departments: ['İktisat', 'İşletme', 'Maliye']
      }
    ]
  },
  {
    id: 'ozyegin',
    name: 'Özyeğin Üniversitesi',
    faculties: [
      {
        id: 'muhendislik',
        name: 'Mühendislik Fakültesi',
        departments: ['Bilgisayar Mühendisliği', 'Elektrik-Elektronik Mühendisliği', 'Makine Mühendisliği', 'Endüstri Mühendisliği']
      },
      {
        id: 'isletme',
        name: 'İşletme Fakültesi',
        departments: ['İşletme', 'Uluslararası Ticaret ve Finans']
      }
    ]
  },
  {
    id: 'bahcesehir',
    name: 'Bahçeşehir Üniversitesi',
    faculties: [
      {
        id: 'muhendislik',
        name: 'Mühendislik Fakültesi',
        departments: ['Bilgisayar Mühendisliği', 'Elektrik-Elektronik Mühendisliği', 'Makine Mühendisliği', 'Endüstri Mühendisliği']
      },
      {
        id: 'iktisadi-idari',
        name: 'İktisadi, İdari ve Sosyal Bilimler Fakültesi',
        departments: ['İktisat', 'İşletme', 'Uluslararası İlişkiler', 'Psikoloji']
      },
      {
        id: 'iletisim',
        name: 'İletişim Fakültesi',
        departments: ['Halkla İlişkiler ve Reklamcılık', 'Yeni Medya', 'Sinema ve Televizyon']
      }
    ]
  },
  {
    id: 'yeditepe',
    name: 'Yeditepe Üniversitesi',
    faculties: [
      {
        id: 'muhendislik',
        name: 'Mühendislik Fakültesi',
        departments: ['Bilgisayar Mühendisliği', 'Elektrik-Elektronik Mühendisliği', 'Makine Mühendisliği', 'İnşaat Mühendisliği']
      },
      {
        id: 'iktisadi-idari',
        name: 'İktisadi ve İdari Bilimler Fakültesi',
        departments: ['İktisat', 'İşletme', 'Uluslararası Ticaret', 'Lojistik Yönetimi']
      },
      {
        id: 'tip',
        name: 'Tıp Fakültesi',
        departments: ['Tıp']
      }
    ]
  },
  {
    id: 'beykent',
    name: 'Beykent Üniversitesi',
    faculties: [
      {
        id: 'muhendislik',
        name: 'Mühendislik ve Mimarlık Fakültesi',
        departments: ['Bilgisayar Mühendisliği', 'Endüstri Mühendisliği', 'İnşaat Mühendisliği', 'Mimarlık']
      },
      {
        id: 'iktisadi-idari',
        name: 'İktisadi ve İdari Bilimler Fakültesi',
        departments: ['İşletme', 'Uluslararası Ticaret ve Lojistik']
      }
    ]
  },
  {
    id: 'istanbul-bilgi',
    name: 'İstanbul Bilgi Üniversitesi',
    faculties: [
      {
        id: 'muhendislik',
        name: 'Mühendislik ve Doğa Bilimleri Fakültesi',
        departments: ['Bilgisayar Mühendisliği', 'Endüstri Mühendisliği', 'Elektrik-Elektronik Mühendisliği']
      },
      {
        id: 'iktisadi-idari',
        name: 'İktisadi, İdari ve Sosyal Bilimler Fakültesi',
        departments: ['İktisat', 'İşletme', 'Uluslararası İlişkiler', 'Psikoloji']
      },
      {
        id: 'iletisim',
        name: 'İletişim Fakültesi',
        departments: ['Halkla İlişkiler ve Reklamcılık', 'Radyo, TV ve Sinema', 'Medya ve İletişim Sistemleri']
      }
    ]
  }
] as const

export type University = typeof universities[number]
export type Faculty = University['faculties'][number]
export type Department = Faculty['departments'][number]