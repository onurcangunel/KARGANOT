/**
 * YÖK ATLAS Seed Script
 * Python API'den gerçek üniversite verilerini çeker ve veritabanına ekler
 * 
 * Kullanım:
 * 1. Python API'yi çalıştır: cd python-api && python main.py
 * 2. Bu script'i çalıştır: npm run seed:yok-atlas
 */

import { PrismaClient, UnitType } from '@prisma/client'
import axios from 'axios'

const prisma = new PrismaClient()

const PYTHON_API_BASE_URL = 'http://localhost:8000'

interface YokAtlasUniversity {
  universityId: string
  universityName: string
  city: string
  type: string
}

interface YokAtlasFaculty {
  facultyId: string
  facultyName: string
  universityName: string
}

interface YokAtlasProgram {
  programId: string
  programName: string
  facultyName: string
  universityName: string
  city: string
  type: string
  quota?: number
  scoreType?: string
}

/**
 * Slug oluşturma fonksiyonu (Türkçe karakter desteği)
 */
function slugify(text: string): string {
  const trMap: Record<string, string> = {
    çÇ: 'c',
    ğĞ: 'g',
    şŞ: 's',
    üÜ: 'u',
    ıİ: 'i',
    öÖ: 'o',
  }

  Object.keys(trMap).forEach((key) => {
    text = text.replace(new RegExp('[' + key + ']', 'g'), trMap[key])
  })

  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

/**
 * Birim tipini adına göre tahmin et
 */
function inferUnitType(name: string): UnitType {
  const lower = name.toLowerCase()

  if (lower.includes('meslek yüksek') || lower.includes('myo')) {
    return UnitType.VOCATIONAL_SCHOOL
  }
  if (lower.includes('fakülte') || lower.includes('fak.')) {
    return UnitType.FACULTY
  }
  if (lower.includes('enstitü')) {
    return UnitType.GRADUATE_SCHOOL
  }
  if (lower.includes('yüksekokul')) {
    return UnitType.COLLEGE
  }
  if (lower.includes('konservatuar')) {
    return UnitType.CONSERVATORY
  }
  if (lower.includes('araştırma merkezi')) {
    return UnitType.RESEARCH_CENTER
  }
  if (lower.includes('uygulama merkezi')) {
    return UnitType.APPLICATION_CENTER
  }

  return UnitType.OTHER
}

/**
 * Kısa ad oluştur (örn: "Yatağan Meslek Yüksekokulu" -> "Yatağan MYO")
 */
function createShortName(name: string, type: UnitType): string {
  if (type === UnitType.VOCATIONAL_SCHOOL) {
    return name.replace(/Meslek Yüksekokulu/gi, 'MYO').trim()
  }
  if (type === UnitType.GRADUATE_SCHOOL) {
    return name.replace(/Enstitüsü/gi, 'Enst.').trim()
  }
  return name
}

/**
 * Python API'nin çalışıp çalışmadığını kontrol et
 */
async function checkPythonAPI(): Promise<boolean> {
  try {
    const response = await axios.get(`${PYTHON_API_BASE_URL}/`, {
      timeout: 5000,
    })
    console.log('✅ Python API bağlantısı başarılı')
    console.log(`📦 API Version: ${response.data.version}`)
    return true
  } catch (error) {
    console.error('❌ Python API\'ye bağlanılamadı!')
    console.error('   Lütfen önce Python API\'yi başlatın:')
    console.error('   cd python-api && python main.py')
    return false
  }
}

/**
 * 1. Üniversiteleri Python API'den çek ve DB'ye ekle
 */
async function seedUniversities(): Promise<Map<string, string>> {
  console.log('\n🏛️ 1. Üniversiteler yükleniyor...')

  try {
    const { data: universities } = await axios.get<YokAtlasUniversity[]>(
      `${PYTHON_API_BASE_URL}/universities`
    )

    console.log(`   📚 ${universities.length} üniversite bulundu`)

    const universityMap = new Map<string, string>() // name -> cuid mapping

    for (const uni of universities) {
      const slug = slugify(uni.universityName)

      // Mevcut üniversiteyi kontrol et
      let university = await prisma.university.findUnique({
        where: { slug },
      })

      if (!university) {
        university = await prisma.university.create({
          data: {
            name: uni.universityName,
            slug,
            city: uni.city || 'Türkiye',
            type: uni.type === 'Vakıf' ? 'Vakıf' : 'Devlet',
            yokAtlasId: uni.universityId,
            isActive: true,
          },
        })
        console.log(`   ✅ ${uni.universityName}`)
      } else {
        console.log(`   ⏭️ ${uni.universityName} (zaten var)`)
      }

      universityMap.set(uni.universityName, university.id)
    }

    console.log(`\n✅ ${universityMap.size} üniversite işlendi`)
    return universityMap
  } catch (error) {
    console.error('❌ Üniversite yükleme hatası:', error)
    throw error
  }
}

/**
 * 2. Fakülteleri Python API'den çek ve DB'ye ekle
 */
async function seedFaculties(
  universityMap: Map<string, string>
): Promise<Map<string, string>> {
  console.log('\n🏛️ 2. Fakülteler yükleniyor...')

  const facultyMap = new Map<string, string>() // "UniName_FacultyName" -> cuid

  let totalFaculties = 0

  for (const [uniName, uniId] of universityMap) {
    try {
      const { data: faculties } = await axios.get<YokAtlasFaculty[]>(
        `${PYTHON_API_BASE_URL}/faculties`,
        {
          params: { universityName: uniName },
        }
      )

      console.log(`   📁 ${uniName}: ${faculties.length} fakülte`)

      for (const faculty of faculties) {
        const slug = slugify(faculty.facultyName)
        const unitType = inferUnitType(faculty.facultyName)
        const shortName = createShortName(faculty.facultyName, unitType)

        // Mevcut birimi kontrol et
        let unit = await prisma.universityUnit.findFirst({
          where: {
            universityId: uniId,
            slug,
          },
        })

        if (!unit) {
          unit = await prisma.universityUnit.create({
            data: {
              name: faculty.facultyName,
              slug,
              type: unitType,
              shortName,
              yokAtlasId: faculty.facultyId,
              isActive: true,
              universityId: uniId,
            },
          })
        }

        const key = `${uniName}_${faculty.facultyName}`
        facultyMap.set(key, unit.id)
        totalFaculties++
      }
    } catch (error: any) {
      if (error?.response?.status !== 404) {
        console.warn(`   ⚠️ ${uniName} fakülteleri alınamadı`)
      }
    }
  }

  console.log(`\n✅ ${totalFaculties} fakülte işlendi`)
  return facultyMap
}

/**
 * 3. Bölümleri Python API'den çek ve DB'ye ekle
 */
async function seedDepartments(
  universityMap: Map<string, string>,
  facultyMap: Map<string, string>
): Promise<void> {
  console.log('\n📚 3. Bölümler yükleniyor...')

  let totalPrograms = 0
  let processedCount = 0

  for (const [key, unitId] of facultyMap) {
    const [uniName, facultyName] = key.split('_')

    try {
      const { data: programs } = await axios.get<YokAtlasProgram[]>(
        `${PYTHON_API_BASE_URL}/programs`,
        {
          params: {
            universityName: uniName,
            facultyName,
          },
        }
      )

      for (const program of programs) {
        const slug = slugify(program.programName)

        // Mevcut bölümü kontrol et
        let department = await prisma.department.findFirst({
          where: {
            universityUnitId: unitId,
            slug,
          },
        })

        if (!department) {
          department = await prisma.department.create({
            data: {
              name: program.programName,
              slug,
              code: program.programId?.toString(),
              scoreType: program.scoreType || 'SAY',
              quota: program.quota || 0,
              yokAtlasId: program.programId,
              isActive: true,
              universityUnitId: unitId,
            },
          })
          totalPrograms++
        }
      }

      processedCount++
      if (processedCount % 10 === 0) {
        console.log(`   📊 İşlenen: ${processedCount}/${facultyMap.size} fakülte`)
      }
    } catch (error: any) {
      if (error?.response?.status !== 404) {
        console.warn(`   ⚠️ ${facultyName} @ ${uniName} programları alınamadı`)
      }
    }
  }

  console.log(`\n✅ ${totalPrograms} bölüm işlendi`)
}

/**
 * Ana seed fonksiyonu
 */
async function main() {
  console.log('🌱 YÖK ATLAS Seed Script - KARGA NOT')
  console.log('==========================================\n')

  // Python API kontrolü
  const isAPIReady = await checkPythonAPI()
  if (!isAPIReady) {
    process.exit(1)
  }

  console.log('\n⏳ Veritabanı temizleniyor...')
  
  // Cascade delete çalışacak, sadece en üstten sil
  await prisma.document.deleteMany({})
  await prisma.course.deleteMany({})
  await prisma.department.deleteMany({})
  await prisma.universityUnit.deleteMany({})
  await prisma.faculty.deleteMany({})
  await prisma.university.deleteMany({})

  console.log('✅ Veritabanı temizlendi')

  // Seeding işlemleri
  const startTime = Date.now()

  try {
    // 1. Üniversiteleri yükle
    const universityMap = await seedUniversities()

    // 2. Fakülteleri yükle
    const facultyMap = await seedFaculties(universityMap)

    // 3. Bölümleri yükle (bu en uzun sürecek kısım)
    await seedDepartments(universityMap, facultyMap)

    const duration = ((Date.now() - startTime) / 1000).toFixed(2)

    console.log('\n==========================================')
    console.log('✅ Seed işlemi tamamlandı!')
    console.log(`⏱️ Süre: ${duration} saniye`)
    console.log('==========================================\n')

    // İstatistikler
    const uniCount = await prisma.university.count()
    const unitCount = await prisma.universityUnit.count()
    const deptCount = await prisma.department.count()

    console.log('📊 Veritabanı İstatistikleri:')
    console.log(`   🏛️ Üniversite: ${uniCount}`)
    console.log(`   📁 Birim (Fakülte/MYO): ${unitCount}`)
    console.log(`   📚 Bölüm: ${deptCount}`)
    console.log('')
  } catch (error) {
    console.error('\n❌ Seed işlemi başarısız:', error)
    throw error
  }
}

// Script çalıştır
main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
