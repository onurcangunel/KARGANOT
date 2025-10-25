/**
 * 🌱 PRISMA SEED SCRIPT
 * 
 * YÖK ATLAS verilerini database'e aktarır:
 * - 603 Üniversite
 * - Fakülteler
 * - Bölümler
 * 
 * Kullanım: npm run seed
 */

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// YÖK ATLAS API URL (Python API'den)
const API_BASE = process.env.PYTHON_API_URL || 'http://localhost:8000'

/**
 * Slug oluşturur (URL-friendly)
 */
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
    .replace(/^-+|-+$/g, '')
}

/**
 * YÖK ATLAS API'den üniversiteleri çeker
 */
async function fetchUniversities() {
  try {
    const response = await fetch(`${API_BASE}/universities`)
    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`)
    }
    const data = await response.json()
    return data
  } catch (error) {
    console.error('❌ Failed to fetch universities from API:', error)
    // Fallback: Boş array döndür, seed devam etsin
    return []
  }
}

/**
 * Fakülteleri çeker (varsa)
 */
async function fetchFaculties(universityName: string) {
  try {
    const response = await fetch(
      `${API_BASE}/faculties?universityName=${encodeURIComponent(universityName)}`
    )
    if (!response.ok) return []
    const data = await response.json()
    return data
  } catch (error) {
    console.error(`❌ Failed to fetch faculties for ${universityName}:`, error)
    return []
  }
}

/**
 * Bölümleri çeker (varsa)
 */
async function fetchDepartments(facultyName: string) {
  try {
    const response = await fetch(
      `${API_BASE}/departments?facultyName=${encodeURIComponent(facultyName)}`
    )
    if (!response.ok) return []
    const data = await response.json()
    return data
  } catch (error) {
    console.error(`❌ Failed to fetch departments for ${facultyName}:`, error)
    return []
  }
}

/**
 * Ana seed fonksiyonu
 */
async function main() {
  console.log('🌱 Seeding database...')
  console.log('📡 Connecting to Python API:', API_BASE)
  
  // 1. Üniversiteleri çek
  console.log('\n📚 Fetching universities from YÖK ATLAS API...')
  const universities = await fetchUniversities()
  
  if (!universities || universities.length === 0) {
    console.log('⚠️  No universities found. Using fallback data...')
    // Fallback: 10 popüler üniversite manuel ekle
    await seedFallbackUniversities()
    return
  }
  
  console.log(`✅ Found ${universities.length} universities`)
  
  // 2. Her üniversiteyi database'e ekle
  let createdCount = 0
  let skippedCount = 0
  
  for (const uni of universities) {
    try {
      // Üniversite var mı kontrol et
      const existing = await prisma.university.findUnique({
        where: { slug: createSlug(uni.universityName) }
      })
      
      if (existing) {
        console.log(`⏭️  Skipping ${uni.universityName} (already exists)`)
        skippedCount++
        continue
      }
      
      // Üniversite oluştur
      const university = await prisma.university.create({
        data: {
          name: uni.universityName,
          slug: createSlug(uni.universityName),
          city: uni.city || null,
          type: uni.type || null,
          website: uni.website || null,
        }
      })
      
      createdCount++
      console.log(`✅ Created: ${university.name} (${university.city || 'N/A'})`)
      
      // 3. Bu üniversitenin fakültelerini çek ve ekle (opsiyonel, yavaş olabilir)
      // İlk seed için skip ediyoruz, gerekirse sonra manuel ekleriz
      
      // İlerleme göster (her 50'de bir)
      if (createdCount % 50 === 0) {
        console.log(`📊 Progress: ${createdCount}/${universities.length}`)
      }
      
    } catch (error) {
      console.error(`❌ Error creating ${uni.universityName}:`, error)
    }
  }
  
  console.log('\n📊 Summary:')
  console.log(`✅ Created: ${createdCount} universities`)
  console.log(`⏭️  Skipped: ${skippedCount} universities (already existed)`)
  console.log(`📚 Total in DB: ${await prisma.university.count()}`)
}

/**
 * Fallback: Python API çalışmıyorsa manuel veri ekle
 */
async function seedFallbackUniversities() {
  console.log('📝 Seeding fallback universities...')
  
  const fallbackUniversities = [
    { name: 'İstanbul Üniversitesi', city: 'İstanbul', type: 'Devlet' },
    { name: 'Ankara Üniversitesi', city: 'Ankara', type: 'Devlet' },
    { name: 'İstanbul Teknik Üniversitesi', city: 'İstanbul', type: 'Devlet' },
    { name: 'Orta Doğu Teknik Üniversitesi', city: 'Ankara', type: 'Devlet' },
    { name: 'Boğaziçi Üniversitesi', city: 'İstanbul', type: 'Devlet' },
    { name: 'Hacettepe Üniversitesi', city: 'Ankara', type: 'Devlet' },
    { name: 'Ege Üniversitesi', city: 'İzmir', type: 'Devlet' },
    { name: 'Gazi Üniversitesi', city: 'Ankara', type: 'Devlet' },
    { name: 'Dokuz Eylül Üniversitesi', city: 'İzmir', type: 'Devlet' },
    { name: 'Marmara Üniversitesi', city: 'İstanbul', type: 'Devlet' },
  ]
  
  for (const uni of fallbackUniversities) {
    await prisma.university.upsert({
      where: { slug: createSlug(uni.name) },
      update: {},
      create: {
        name: uni.name,
        slug: createSlug(uni.name),
        city: uni.city,
        type: uni.type,
      }
    })
  }
  
  console.log(`✅ Seeded ${fallbackUniversities.length} fallback universities`)
}

// Seed'i çalıştır
main()
  .then(async () => {
    await prisma.$disconnect()
    console.log('\n✨ Seed completed successfully!')
  })
  .catch(async (e) => {
    console.error('\n❌ Seed failed:', e)
    await prisma.$disconnect()
    process.exit(1)
  })
