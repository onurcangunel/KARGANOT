import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function seedTestData() {
  console.log('🌱 Seeding test data for upload system...')

  // Get some universities
  const universities = await prisma.university.findMany({
    take: 5,
    orderBy: { name: 'asc' },
  })

  if (universities.length === 0) {
    console.log('❌ No universities found. Run seed.ts first!')
    return
  }

  console.log(`✅ Found ${universities.length} universities`)

  // Sample data
  const facultyData = [
    { name: 'Hukuk Fakültesi', slug: 'hukuk-fakultesi' },
    { name: 'Tıp Fakültesi', slug: 'tip-fakultesi' },
    { name: 'Mühendislik Fakültesi', slug: 'muhendislik-fakultesi' },
    { name: 'Fen Fakültesi', slug: 'fen-fakultesi' },
    { name: 'İktisadi ve İdari Bilimler Fakültesi', slug: 'iktisadi-ve-idari-bilimler-fakultesi' },
  ]

  const departmentsByFaculty: Record<string, Array<{ name: string; slug: string }>> = {
    'Hukuk Fakültesi': [
      { name: 'Hukuk', slug: 'hukuk' },
      { name: 'Kamu Hukuku', slug: 'kamu-hukuku' },
      { name: 'Özel Hukuk', slug: 'ozel-hukuk' },
    ],
    'Tıp Fakültesi': [
      { name: 'Tıp', slug: 'tip' },
      { name: 'Cerrahi Tıp', slug: 'cerrahi-tip' },
    ],
    'Mühendislik Fakültesi': [
      { name: 'Bilgisayar Mühendisliği', slug: 'bilgisayar-muhendisligi' },
      { name: 'Elektrik-Elektronik Mühendisliği', slug: 'elektrik-elektronik-muhendisligi' },
      { name: 'Makine Mühendisliği', slug: 'makine-muhendisligi' },
    ],
    'Fen Fakültesi': [
      { name: 'Matematik', slug: 'matematik' },
      { name: 'Fizik', slug: 'fizik' },
      { name: 'Kimya', slug: 'kimya' },
    ],
    'İktisadi ve İdari Bilimler Fakültesi': [
      { name: 'İktisat', slug: 'iktisat' },
      { name: 'İşletme', slug: 'isletme' },
      { name: 'Kamu Yönetimi', slug: 'kamu-yonetimi' },
    ],
  }

  const coursesByDepartment: Record<string, Array<{ name: string; code: string; slug: string }>> = {
    'Hukuk': [
      { name: 'Anayasa Hukuku', code: 'HUK101', slug: 'anayasa-hukuku' },
      { name: 'Medeni Hukuk', code: 'HUK102', slug: 'medeni-hukuk' },
      { name: 'Ceza Hukuku', code: 'HUK201', slug: 'ceza-hukuku' },
    ],
    'Bilgisayar Mühendisliği': [
      { name: 'Veri Yapıları', code: 'CS201', slug: 'veri-yapilari' },
      { name: 'Algoritma Analizi', code: 'CS202', slug: 'algoritma-analizi' },
      { name: 'Veritabanı Sistemleri', code: 'CS301', slug: 'veritabani-sistemleri' },
    ],
    'Matematik': [
      { name: 'Analiz I', code: 'MAT101', slug: 'analiz-i' },
      { name: 'Lineer Cebir', code: 'MAT102', slug: 'lineer-cebir' },
      { name: 'Diferansiyel Denklemler', code: 'MAT201', slug: 'diferansiyel-denklemler' },
    ],
    'İşletme': [
      { name: 'Muhasebe', code: 'ISL101', slug: 'muhasebe' },
      { name: 'Pazarlama', code: 'ISL102', slug: 'pazarlama' },
      { name: 'Finans', code: 'ISL201', slug: 'finans' },
    ],
  }

  let totalFaculties = 0
  let totalDepartments = 0
  let totalCourses = 0

  // For each university, add faculties
  for (const university of universities) {
    console.log(`\n📚 Seeding ${university.name}...`)

    for (const facultyInfo of facultyData) {
      // Check if faculty already exists
      const existingFaculty = await prisma.faculty.findFirst({
        where: {
          universityId: university.id,
          slug: facultyInfo.slug,
        },
      })

      let faculty
      if (existingFaculty) {
        console.log(`  ⏭️  ${facultyInfo.name} already exists, skipping...`)
        faculty = existingFaculty
      } else {
        faculty = await prisma.faculty.create({
          data: {
            name: facultyInfo.name,
            slug: facultyInfo.slug,
            universityId: university.id,
          },
        })
        totalFaculties++
        console.log(`  ✅ Created faculty: ${facultyInfo.name}`)
      }

      // Add departments for this faculty
      const departments = departmentsByFaculty[facultyInfo.name] || []
      for (const deptInfo of departments) {
        const existingDept = await prisma.department.findFirst({
          where: {
            facultyId: faculty.id,
            slug: deptInfo.slug,
          },
        })

        let department
        if (existingDept) {
          department = existingDept
        } else {
          department = await prisma.department.create({
            data: {
              name: deptInfo.name,
              slug: deptInfo.slug,
              facultyId: faculty.id,
            },
          })
          totalDepartments++
          console.log(`    ✅ Created department: ${deptInfo.name}`)
        }

        // Add courses for this department
        const courses = coursesByDepartment[deptInfo.name] || []
        for (const courseInfo of courses) {
          const existingCourse = await prisma.course.findFirst({
            where: {
              departmentId: department.id,
              code: courseInfo.code,
            },
          })

          if (!existingCourse) {
            await prisma.course.create({
              data: {
                name: courseInfo.name,
                code: courseInfo.code,
                slug: courseInfo.slug,
                departmentId: department.id,
              },
            })
            totalCourses++
            console.log(`      ✅ Created course: ${courseInfo.name} (${courseInfo.code})`)
          }
        }
      }
    }
  }

  console.log('\n🎉 Test data seeding completed!')
  console.log(`📊 Summary:`)
  console.log(`  - Universities: ${universities.length}`)
  console.log(`  - Faculties created: ${totalFaculties}`)
  console.log(`  - Departments created: ${totalDepartments}`)
  console.log(`  - Courses created: ${totalCourses}`)
}

seedTestData()
  .catch((e) => {
    console.error('❌ Error seeding test data:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
