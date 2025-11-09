import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seed başlıyor...')
  
  // University
  const uni = await prisma.university.create({
    data: { 
      name: "ODTÜ", 
      slug: "odtu",
      city: "Ankara", 
      type: "state" 
    }
  })
  console.log('✅ Üniversite oluşturuldu:', uni.name)
  
  // Faculty
  const fac = await prisma.faculty.create({
    data: { 
      name: "Mühendislik Fakültesi",
      slug: "muhendislik",
      universityId: uni.id 
    }
  })
  console.log('✅ Fakülte oluşturuldu:', fac.name)
  
  // Department
  const dept = await prisma.department.create({
    data: { 
      name: "Elektrik Elektronik Mühendisliği",
      slug: "elektrik-elektronik",
      facultyId: fac.id 
    }
  })
  console.log('✅ Bölüm oluşturuldu:', dept.name)
  
  // Course
  const course = await prisma.course.create({
    data: { 
      name: "Devre Teorisi",
      slug: "devre-teorisi",
      code: "EE201",
      departmentId: dept.id, 
      semester: "FALL" 
    }
  })
  console.log('✅ Ders oluşturuldu:', course.name)
  
  // Admin User
  const admin = await prisma.user.create({
    data: {
      email: "admin@karganot.com",
      passwordHash: "$2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36/vF7hDNFjKc7pv3PbTTq2", // "12345"
      name: "Admin Kullanıcı",
      role: "ADMIN",
      plan: "PREMIUM",
      universityId: uni.id,
      departmentId: dept.id
    }
  })
  console.log('✅ Admin kullanıcı oluşturuldu:', admin.email)
  
  // Sample Note
  const note = await prisma.note.create({
    data: {
      courseId: course.id,
      uploaderId: admin.id,
      universityId: uni.id,
      title: "Devre Teorisi - Hafta 1 Notları",
      description: "Temel devre analizi giriş notları",
      fileKey: "notes/sample/devre-hafta1.pdf",
      fileExt: "pdf",
      sizeBytes: BigInt(1024000),
      tags: ["devre", "analiz", "hafta1", "temel"],
      status: "APPROVED",
      pages: 15
    }
  })
  console.log('✅ Örnek not oluşturuldu:', note.title)
  
  console.log('\n🎉 Seed işlemi tamamlandı!')
  console.log('📧 Admin: admin@karganot.com / Şifre: 12345')
}

main()
  .then(() => console.log('✅ Seed başarılı!'))
  .catch((e) => {
    console.error('❌ Seed hatası:', e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
