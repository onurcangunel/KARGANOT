// API Route: YÖK ATLAS Python API Proxy
// Python FastAPI servisine proxy yapar

import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

// Python API URL (local veya production)
const PYTHON_API_URL = process.env.PYTHON_API_URL || 'http://localhost:8000'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const type = searchParams.get('type') || 'universities'
  const universityId = searchParams.get('universityId')
  const universityName = searchParams.get('universityName')
  const facultyId = searchParams.get('facultyId')
  const facultyName = searchParams.get('facultyName')
  
  // Python API kullan - Gerçek YÖK ATLAS verileri
  try {
    let apiUrl = ''
    
    if (type === 'universities') {
      apiUrl = `${PYTHON_API_URL}/universities`
    } else if (type === 'faculties' && universityName) {
      apiUrl = `${PYTHON_API_URL}/faculties?universityName=${encodeURIComponent(universityName)}`
    } else if (type === 'programs' && facultyName && universityName) {
      apiUrl = `${PYTHON_API_URL}/programs?facultyName=${encodeURIComponent(facultyName)}&universityName=${encodeURIComponent(universityName)}`
    }
    
    if (apiUrl) {
      console.log('🔄 Fetching from Python API:', apiUrl)
      
      const response = await fetch(apiUrl, {
        headers: { 'Accept': 'application/json' },
        cache: 'no-store' // Cache'i devre dışı bırak
      })
      
      if (response.ok) {
        const data = await response.json()
        console.log('✅ Data received:', data.length || Object.keys(data).length, 'items')
        return NextResponse.json(data)
      } else {
        console.error('❌ Python API error:', response.status, response.statusText)
      }
    }
    
    // Static data kullan
    if (type === 'universities') {
      return NextResponse.json(getAllUniversities())
    } else if (type === 'faculties' && universityId) {
      return NextResponse.json(getFacultiesByUniversity(universityId))
    } else if (type === 'programs' && facultyId) {
      return NextResponse.json(getProgramsByFaculty(facultyId))
    }
    
    return NextResponse.json({ error: 'Invalid parameters' }, { status: 400 })
  } catch (error) {
    console.error('YÖK ATLAS API Error:', error)
    return NextResponse.json({ 
      error: 'Failed to fetch data',
      message: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}

function getAllUniversities() {
  return [
    { universityId: '1', universityName: 'İstanbul Üniversitesi', type: 'Devlet', city: 'İstanbul' },
    { universityId: '2', universityName: 'Orta Doğu Teknik Üniversitesi', type: 'Devlet', city: 'Ankara' },
    { universityId: '3', universityName: 'Boğaziçi Üniversitesi', type: 'Devlet', city: 'İstanbul' },
    { universityId: '4', universityName: 'İstanbul Teknik Üniversitesi', type: 'Devlet', city: 'İstanbul' },
    { universityId: '5', universityName: 'Ankara Üniversitesi', type: 'Devlet', city: 'Ankara' },
    { universityId: '6', universityName: 'Hacettepe Üniversitesi', type: 'Devlet', city: 'Ankara' },
    { universityId: '7', universityName: 'Ege Üniversitesi', type: 'Devlet', city: 'İzmir' },
    { universityId: '8', universityName: 'Gazi Üniversitesi', type: 'Devlet', city: 'Ankara' },
    { universityId: '9', universityName: 'Marmara Üniversitesi', type: 'Devlet', city: 'İstanbul' },
    { universityId: '10', universityName: 'Dokuz Eylül Üniversitesi', type: 'Devlet', city: 'İzmir' },
    { universityId: '11', universityName: 'Koç Üniversitesi', type: 'Vakıf', city: 'İstanbul' },
    { universityId: '12', universityName: 'Sabancı Üniversitesi', type: 'Vakıf', city: 'İstanbul' },
    { universityId: '13', universityName: 'Bilkent Üniversitesi', type: 'Vakıf', city: 'Ankara' },
    { universityId: '14', universityName: 'Yıldız Teknik Üniversitesi', type: 'Devlet', city: 'İstanbul' },
    { universityId: '15', universityName: 'Selçuk Üniversitesi', type: 'Devlet', city: 'Konya' },
    { universityId: '16', universityName: 'Atatürk Üniversitesi', type: 'Devlet', city: 'Erzurum' },
    { universityId: '17', universityName: 'Erciyes Üniversitesi', type: 'Devlet', city: 'Kayseri' },
    { universityId: '18', universityName: 'Çukurova Üniversitesi', type: 'Devlet', city: 'Adana' },
    { universityId: '19', universityName: 'Uludağ Üniversitesi', type: 'Devlet', city: 'Bursa' },
    { universityId: '20', universityName: 'Akdeniz Üniversitesi', type: 'Devlet', city: 'Antalya' }
  ]
}

function getFacultiesByUniversity(universityId: string) {
  return [
    { facultyId: `${universityId}-1`, facultyName: 'Mühendislik Fakültesi', universityId },
    { facultyId: `${universityId}-2`, facultyName: 'Tıp Fakültesi', universityId },
    { facultyId: `${universityId}-3`, facultyName: 'İktisadi ve İdari Bilimler Fakültesi', universityId },
    { facultyId: `${universityId}-4`, facultyName: 'Fen-Edebiyat Fakültesi', universityId },
    { facultyId: `${universityId}-5`, facultyName: 'Hukuk Fakültesi', universityId },
    { facultyId: `${universityId}-6`, facultyName: 'Eğitim Fakültesi', universityId },
    { facultyId: `${universityId}-7`, facultyName: 'Mimarlık Fakültesi', universityId },
    { facultyId: `${universityId}-8`, facultyName: 'İletişim Fakültesi', universityId }
  ]
}

function getProgramsByFaculty(facultyId: string) {
  return [
    { programId: `${facultyId}-1`, programName: 'Bilgisayar Mühendisliği', facultyId, facultyName: '', universityName: '', city: '' },
    { programId: `${facultyId}-2`, programName: 'Elektrik-Elektronik Mühendisliği', facultyId, facultyName: '', universityName: '', city: '' },
    { programId: `${facultyId}-3`, programName: 'Makine Mühendisliği', facultyId, facultyName: '', universityName: '', city: '' },
    { programId: `${facultyId}-4`, programName: 'İnşaat Mühendisliği', facultyId, facultyName: '', universityName: '', city: '' },
    { programId: `${facultyId}-5`, programName: 'Endüstri Mühendisliği', facultyId, facultyName: '', universityName: '', city: '' },
    { programId: `${facultyId}-6`, programName: 'Kimya Mühendisliği', facultyId, facultyName: '', universityName: '', city: '' },
    { programId: `${facultyId}-7`, programName: 'Yazılım Mühendisliği', facultyId, facultyName: '', universityName: '', city: '' }
  ]
}