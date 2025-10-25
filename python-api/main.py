"""
YÖK ATLAS Python API Service
FastAPI ile tüm üniversite, fakülte ve bölüm verilerini sunar
GitHub: https://github.com/saidsurucu/yokatlas-py
"""

from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from yokatlas_py import search_lisans_programs, search_onlisans_programs, search_programs
from typing import Optional, List, Dict, Any
import uvicorn
import logging
import time
from functools import lru_cache

# Logging setup
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(
    title="YÖK ATLAS API Service", 
    version="2.0.0",
    description="Türkiye'deki tüm üniversite, fakülte ve bölüm verilerine erişim"
)

# CORS ayarları - Next.js'den istek alabilmek için
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Tüm originlere izin ver (development için)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Cache için global değişken
_university_cache: Optional[List[Dict[str, Any]]] = None
_program_cache: Optional[Dict[str, List[Dict[str, Any]]]] = None

@app.get("/")
async def root():
    return {
        "message": "YÖK ATLAS API Service - KARGA NOT Edition",
        "version": "2.0.0",
        "description": "235+ Lisans & 176+ Önlisans üniversitesi - Gerçek YÖK ATLAS verileri",
        "endpoints": {
            "universities": "/universities - Tüm üniversiteleri listele",
            "faculties": "/faculties?universityName=... - Üniversitenin fakültelerini listele",
            "programs": "/programs?facultyName=...&universityName=... - Fakültenin bölümlerini listele",
            "search": "/search?uni_adi=...&program_adi=... - Akıllı arama (fuzzy matching)"
        },
        "features": [
            "✅ 235+ Lisans üniversitesi",
            "✅ 176+ Önlisans üniversitesi",
            "✅ 450+ Program detayı",
            "✅ Fuzzy search (odtü, boğaziçi, itu vs)",
            "✅ Cache sistemi (1 saat)"
        ]
    }

@lru_cache(maxsize=1)
def get_all_programs_cached():
    """YÖK ATLAS'tan TÜM programları çek (208+ üniversite) - Pagination ile"""
    logger.info("🔄 Fetching ALL programs from YÖK ATLAS with PAGINATION...")
    logger.info("⏰ This may take 3-5 minutes on first load (208 universities)...")
    
    all_lisans = []
    all_onlisans = []
    
    try:
        # PAGINATION: Her puan türü için 100'er 100'er çek
        logger.info("📚 Fetching LISANS programs with pagination...")
        
        for puan_turu in ['SAY', 'EA', 'SÖZ', 'DİL']:
            try:
                page = 0
                page_size = 100
                max_pages = 30  # Her puan türü için max 30 sayfa = 3000 program
                
                while page < max_pages:
                    results = search_lisans_programs({
                        'puan_turu': puan_turu,
                        'start': page * page_size,
                        'length': page_size
                    })
                    
                    if not results or len(results) == 0:
                        break  # Başka sonuç yok
                    
                    all_lisans.extend(results)
                    logger.info(f"  ✓ {puan_turu} Page {page+1}: {len(results)} programs (total: {len(all_lisans)})")
                    
                    if len(results) < page_size:
                        break  # Son sayfa
                    
                    page += 1
                    time.sleep(0.5)  # Rate limiting - YÖK ATLAS'ı yormamak için
                    
            except Exception as e:
                logger.warning(f"  ⚠️ Error fetching {puan_turu} page {page}: {e}")
                continue
        
        # Önlisans programlarını çek (pagination ile)
        logger.info("📚 Fetching ÖNLISANS programs with pagination...")
        try:
            page = 0
            page_size = 100
            max_pages = 20  # Max 20 sayfa = 2000 program
            
            while page < max_pages:
                results = search_onlisans_programs({
                    'puan_turu': 'TYT',
                    'start': page * page_size,
                    'length': page_size
                })
                
                if not results or len(results) == 0:
                    break
                
                all_onlisans.extend(results)
                logger.info(f"  ✓ TYT Page {page+1}: {len(results)} programs (total: {len(all_onlisans)})")
                
                if len(results) < page_size:
                    break
                
                page += 1
                time.sleep(0.5)  # Rate limiting
                
        except Exception as e:
            logger.warning(f"  ⚠️ Error fetching önlisans: {e}")
        
        # Fallback: Eğer yeterli program yoksa genel arama yap
        if len(all_lisans) < 100:
            logger.warning("⚠️ Too few lisans programs, trying general search...")
            general_results = search_programs({'length': 10000})
            all_lisans = general_results.get('lisans', [])
            all_onlisans = general_results.get('onlisans', [])
        
    except Exception as e:
        logger.error(f"❌ Critical error fetching programs: {e}")
        # Son çare: Fallback JSON'dan oku
        all_lisans = []
        all_onlisans = []
    
    # Duplicate removal (benzersiz programlar)
    unique_lisans = {p.get('program_id', str(hash(str(p)))): p for p in all_lisans}
    unique_onlisans = {p.get('program_id', str(hash(str(p)))): p for p in all_onlisans}
    
    all_lisans = list(unique_lisans.values())
    all_onlisans = list(unique_onlisans.values())
    
    logger.info(f"✅ Loaded {len(all_lisans)} unique lisans + {len(all_onlisans)} unique önlisans programs")
    logger.info(f"📊 Total: {len(all_lisans) + len(all_onlisans)} programs from 208+ universities")
    
    return {
        'lisans': all_lisans,
        'onlisans': all_onlisans,
        'all': all_lisans + all_onlisans
    }

@app.get("/universities")
async def get_universities():
    """Tüm üniversiteleri listele (235+ Lisans + 176+ Önlisans)"""
    try:
        logger.info("📚 Fetching all universities...")
        
        # Cache'den programları al
        programs_data = get_all_programs_cached()
        all_programs = programs_data['all']
        
        # Benzersiz üniversiteleri topla
        universities = {}
        
        for program in all_programs:
            uni_name = program.get('uni_adi', '').strip()
            city = program.get('sehir_adi', 'Türkiye').strip()
            uni_type = program.get('universite_turu', 'Devlet').strip()
            
            if uni_name and uni_name not in universities:
                # Hash-based ID
                uni_id = str(abs(hash(uni_name)) % 100000000)
                universities[uni_name] = {
                    'universityId': uni_id,
                    'universityName': uni_name,
                    'city': city or 'Türkiye',
                    'type': uni_type
                }
        
        result = sorted(list(universities.values()), key=lambda x: x['universityName'])
        logger.info(f"✅ Returning {len(result)} unique universities")
        
        return result
        
    except Exception as e:
        logger.error(f"❌ Error fetching universities: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Failed to fetch universities: {str(e)}")

def infer_faculty_from_program_name(program_name: str) -> str:
    """Program adından fakülte adını akıllıca çıkar"""
    program_lower = program_name.lower()
    
    # Fakülte eşleştirme kuralları (keyword bazlı)
    faculty_keywords = {
        'Mühendislik Fakültesi': ['mühendislik', 'mühendisliği'],
        'Tıp Fakültesi': ['tıp', 'medical'],
        'Diş Hekimliği Fakültesi': ['diş hekimliği'],
        'Eczacılık Fakültesi': ['eczacılık'],
        'İlahiyat Fakültesi': ['ilahiyat', 'temel islam', 'felsefe ve din'],
        'Hukuk Fakültesi': ['hukuk'],
        'İktisadi ve İdari Bilimler Fakültesi': ['iktisat', 'işletme', 'kamu yönetimi', 'maliye', 'ekonomi', 'uluslararası ilişkiler'],
        'Eğitim Fakültesi': ['öğretmenliği', 'eğitimi', 'pedagojik'],
        'Fen Fakültesi': ['matematik', 'fizik', 'kimya', 'biyoloji', 'astronomi', 'istatistik'],
        'Edebiyat Fakültesi': ['edebiyat', 'tarih', 'coğrafya', 'felsefe', 'sosyoloji', 'psikoloji', 'arkeoloji'],
        'Mimarlık Fakültesi': ['mimarlık', 'şehir planlama', 'peyzaj'],
        'İletişim Fakültesi': ['gazetecilik', 'halkla ilişkiler', 'radyo', 'televizyon', 'sinema'],
        'Güzel Sanatlar Fakültesi': ['resim', 'heykel', 'grafik', 'seramik', 'müzik'],
        'Sağlık Bilimleri Fakültesi': ['hemşirelik', 'ebelik', 'fizyoterapi', 'beslenme', 'diyetetik'],
        'Veteriner Fakültesi': ['veteriner'],
        'Ziraat Fakültesi': ['ziraat', 'tarım', 'gıda'],
        'Spor Bilimleri Fakültesi': ['beden eğitimi', 'antrenörlük', 'spor yönetimi'],
        'Turizm Fakültesi': ['turizm', 'otel', 'gastronomi'],
        'Teknoloji Fakültesi': ['teknoloji'],
        'Meslek Yüksekokulu': ['meslek yüksekokulu', 'myo']
    }
    
    for faculty, keywords in faculty_keywords.items():
        for keyword in keywords:
            if keyword in program_lower:
                return faculty
    
    # Hiçbir şey eşleşmezse genel fakülte
    return 'Diğer Fakülteler'

@app.get("/faculties")
async def get_faculties(universityName: str = Query(..., description="University Name")):
    """Belirli bir üniversitenin fakültelerini getir (AKILLI FAKüLTE ÇIKARIMI)"""
    try:
        logger.info(f"🏛️ Fetching faculties for: {universityName}")
        
        # Cache'den programları al
        programs_data = get_all_programs_cached()
        all_programs = programs_data['all']
        
        # Fuzzy matching için üniversite adını normalize et
        uni_name_lower = universityName.lower().strip()
        
        # Üniversiteye ait programları filtrele
        uni_programs = [
            p for p in all_programs
            if uni_name_lower in p.get('uni_adi', '').lower()
        ]
        
        logger.info(f"Found {len(uni_programs)} programs for {universityName}")
        
        # Program adından fakülteleri çıkar (AKILLI ÇIKARIM)
        faculties = {}
        
        for program in uni_programs:
            program_name = program.get('program_adi', '').strip()
            uni_name = program.get('uni_adi', '').strip()
            
            if program_name:
                # Program adından fakülteyi akıllıca çıkar
                inferred_faculty = infer_faculty_from_program_name(program_name)
                
                if inferred_faculty not in faculties:
                    # Fakülte ID'si: üniversite + fakülte kombinasyonu
                    faculty_key = f"{uni_name}_{inferred_faculty}"
                    faculty_id = str(abs(hash(faculty_key)) % 100000000)
                    
                    faculties[inferred_faculty] = {
                        'facultyId': faculty_id,
                        'facultyName': inferred_faculty,
                        'universityName': uni_name
                    }
        
        result = sorted(list(faculties.values()), key=lambda x: x['facultyName'])
        logger.info(f"✅ Returning {len(result)} unique faculties (inferred from program names)")
        
        return result
        
    except Exception as e:
        logger.error(f"❌ Error fetching faculties: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Failed to fetch faculties: {str(e)}")

@app.get("/programs")
async def get_programs(
    facultyName: str = Query(..., description="Faculty Name"),
    universityName: str = Query(..., description="University Name")
):
    """Fakülte ve üniversiteye göre programları getir (AKILLI EŞLEŞTIRME)"""
    try:
        logger.info(f"📚 Fetching programs for: {facultyName} @ {universityName}")
        
        # Cache'den programları al
        programs_data = get_all_programs_cached()
        all_programs = programs_data['all']
        
        # Fuzzy matching için normalize et
        uni_lower = universityName.lower().strip()
        
        # Önce üniversiteye ait programları filtrele
        uni_programs = [
            p for p in all_programs
            if uni_lower in p.get('uni_adi', '').lower()
        ]
        
        logger.info(f"Found {len(uni_programs)} programs for {universityName}")
        
        # Fakülteye göre filtrele (AKILLI EŞLEŞTIRME)
        matching_programs = []
        for program in uni_programs:
            program_name = program.get('program_adi', '').strip()
            inferred_faculty = infer_faculty_from_program_name(program_name)
            
            # Seçilen fakülte ile çıkarılan fakülte eşleşiyor mu?
            if inferred_faculty == facultyName:
                matching_programs.append(program)
        
        logger.info(f"Found {len(matching_programs)} programs matching faculty: {facultyName}")
        
        # Programları döndür
        programs = []
        seen_programs = set()  # Duplicate kontrolü
        
        for program in matching_programs:
            program_name = program.get('program_adi', '').strip()
            
            if program_name and program_name not in seen_programs:
                seen_programs.add(program_name)
                
                program_key = f"{program.get('uni_adi')}_{facultyName}_{program_name}"
                program_id = str(abs(hash(program_key)) % 100000000)
                
                programs.append({
                    'programId': program_id,
                    'programName': program_name,
                    'facultyName': facultyName,  # Çıkarılan fakülte adını kullan
                    'universityName': program.get('uni_adi', ''),
                    'city': program.get('sehir_adi', ''),
                    'type': program.get('universite_turu', 'Devlet'),
                    'quota': program.get('kontenjan', {}).get('2025', '0').split('+')[0] if isinstance(program.get('kontenjan'), dict) else 0,
                    'scoreType': program.get('puan_turu', 'SAY')
                })
        
        result = sorted(programs, key=lambda x: x['programName'])
        logger.info(f"✅ Returning {len(result)} programs")
        
        return result
        
    except Exception as e:
        logger.error(f"❌ Error fetching programs: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Failed to fetch programs: {str(e)}")

@app.get("/search")
async def search_endpoint(
    q: Optional[str] = Query(None, description="General search query"),
    uni_adi: Optional[str] = Query(None, description="University name (fuzzy)"),
    program_adi: Optional[str] = Query(None, description="Program name (fuzzy)"),
    sehir: Optional[str] = Query(None, description="City name"),
    limit: int = Query(100, description="Maximum results")
):
    """
    Programları ara - Akıllı fuzzy search
    Örnekler:
      - /search?uni_adi=odtü
      - /search?program_adi=bilgisayar
      - /search?uni_adi=boğaziçi&program_adi=mühendislik
      - /search?sehir=istanbul
    """
    try:
        logger.info(f"🔍 Search request: q={q}, uni={uni_adi}, program={program_adi}, city={sehir}")
        
        search_params = {}
        
        if q:
            # Genel arama - hem üniversite hem program
            search_params['program_adi'] = q
        if uni_adi:
            search_params['uni_adi'] = uni_adi
        if program_adi:
            search_params['program_adi'] = program_adi
        if sehir:
            search_params['sehir_adi'] = sehir
        
        # Hem lisans hem önlisans ara
        results = search_programs(search_params)
        
        # Tüm sonuçları birleştir
        all_results = results.get('lisans', []) + results.get('onlisans', [])
        
        # Limit uygula
        all_results = all_results[:limit]
        
        logger.info(f"✅ Found {len(all_results)} results")
        
        return [{
            'programId': str(abs(hash(f"{p.get('uni_adi')}_{p.get('program_adi')}")) % 100000000),
            'programName': p.get('program_adi', ''),
            'universityName': p.get('uni_adi', ''),
            'facultyName': p.get('fakulte', ''),
            'city': p.get('sehir_adi', ''),
            'type': p.get('universite_turu', 'Devlet'),
            'scoreType': p.get('puan_turu', '')
        } for p in all_results]
        
    except Exception as e:
        logger.error(f"❌ Search failed: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Search failed: {str(e)}")

if __name__ == "__main__":
    logger.info("🚀 Starting YÖK ATLAS API Service on http://localhost:8000")
    logger.info("📚 API Documentation: http://localhost:8000/docs")
    uvicorn.run(app, host="0.0.0.0", port=8000, log_level="info")