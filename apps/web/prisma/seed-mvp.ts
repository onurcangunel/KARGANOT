import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 KARGANOT MVP Seed başlıyor...\n');

  // 1. University
  console.log('📍 Üniversite oluşturuluyor...');
  const odtu = await prisma.university.create({
    data: {
      name: 'Orta Doğu Teknik Üniversitesi',
      slug: 'odtu',
      city: 'Ankara',
      type: 'state',
    },
  });
  console.log('✅ ' + odtu.name);

  // 2. Faculty
  console.log('\n🏛️ Fakülte oluşturuluyor...');
  const muhFak = await prisma.faculty.create({
    data: {
      universityId: odtu.id,
      name: 'Mühendislik Fakültesi',
      slug: 'muhendislik',
    },
  });
  console.log('✅ ' + muhFak.name);

  // 3. Department
  console.log('\n🎓 Bölüm oluşturuluyor...');
  const elektrik = await prisma.department.create({
    data: {
      facultyId: muhFak.id,
      name: 'Elektrik Elektronik Mühendisliği',
      slug: 'elektrik-elektronik',
    },
  });
  console.log('✅ ' + elektrik.name);

  // 4. Course
  console.log('\n📚 Ders oluşturuluyor...');
  const devreTeo = await prisma.course.create({
    data: {
      departmentId: elektrik.id,
      name: 'Devre Teorisi',
      code: 'EE201',
      slug: 'devre-teorisi',
      semester: 'FALL',
    },
  });
  console.log('✅ ' + devreTeo.name + ' (' + devreTeo.code + ')');

  // 5. Admin User
  console.log('\n👤 Admin kullanıcı oluşturuluyor...');
  // Simple hash for demo (use bcrypt in production!)
  const admin = await prisma.user.create({
    data: {
      email: 'admin@karganot.com',
      passwordHash: '$2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36/vF7hDNFjKc7pv3PbTTq2',
      name: 'Admin Kullanıcı',
      role: 'ADMIN',
      plan: 'PREMIUM',
      status: 'ACTIVE',
      universityId: odtu.id,
      departmentId: elektrik.id,
      monthlyDownloadQuota: 999,
    },
  });
  console.log('✅ ' + admin.email + ' (Şifre: 12345)');

  // 6. Test User
  console.log('\n👤 Test kullanıcı oluşturuluyor...');
  const testUser = await prisma.user.create({
    data: {
      email: 'test@karganot.com',
      passwordHash: '$2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36/vF7hDNFjKc7pv3PbTTq2',
      name: 'Test Kullanıcı',
      role: 'USER',
      plan: 'FREE',
      status: 'ACTIVE',
      universityId: odtu.id,
      departmentId: elektrik.id,
    },
  });
  console.log('✅ ' + testUser.email + ' (Şifre: 12345)');

  // 7. Sample Notes
  console.log('\n📄 Örnek notlar oluşturuluyor...');
  const note1 = await prisma.note.create({
    data: {
      courseId: devreTeo.id,
      uploaderId: admin.id,
      universityId: odtu.id,
      title: 'Devre Teorisi - Hafta 1: Giriş',
      description: 'Temel devre analizi ve Kirchhoff kanunları',
      tags: JSON.stringify(['devre', 'analiz', 'hafta1', 'temel']),
      fileKey: 'notes/sample/devre-hafta1.pdf',
      fileExt: 'pdf',
      sizeBytes: 1024000,
      pages: 15,
      status: 'APPROVED',
    },
  });
  console.log('✅ ' + note1.title);

  const note2 = await prisma.note.create({
    data: {
      courseId: devreTeo.id,
      uploaderId: testUser.id,
      universityId: odtu.id,
      title: 'Devre Teorisi - Vize Hazırlık',
      description: 'Vize sınavı için özet notlar',
      tags: JSON.stringify(['vize', 'özet', 'sınav']),
      fileKey: 'notes/sample/devre-vize.pdf',
      fileExt: 'pdf',
      sizeBytes: 2048000,
      pages: 25,
      status: 'PENDING',
    },
  });
  console.log('✅ ' + note2.title);

  // 8. Sample Rating
  console.log('\n⭐ Örnek değerlendirme oluşturuluyor...');
  await prisma.rating.create({
    data: {
      noteId: note1.id,
      userId: testUser.id,
      rating: 5,
      comment: 'Çok faydalı notlar, teşekkürler!',
    },
  });
  console.log('✅ 5 yıldız değerlendirme eklendi');

  // Update note rating
  await prisma.note.update({
    where: { id: note1.id },
    data: { avgRating: 5, ratingCount: 1 },
  });

  console.log('\n🎉 Seed işlemi başarıyla tamamlandı!');
  console.log('\n📊 Oluşturulan Veriler:');
  console.log('   - 1 Üniversite (ODTÜ)');
  console.log('   - 1 Fakülte (Mühendislik)');
  console.log('   - 1 Bölüm (Elektrik Elektronik)');
  console.log('   - 1 Ders (Devre Teorisi)');
  console.log('   - 2 Kullanıcı (Admin + Test)');
  console.log('   - 2 Not (1 Onaylı, 1 Beklemede)');
  console.log('   - 1 Değerlendirme');
  console.log('\n🔐 Giriş Bilgileri:');
  console.log('   Admin: admin@karganot.com / 12345');
  console.log('   Test:  test@karganot.com / 12345');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error('❌ Seed hatası:', e);
    await prisma.$disconnect();
    process.exit(1);
  });
