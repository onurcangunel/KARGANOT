import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create universities
  const universities = await Promise.all([
    prisma.university.upsert({
      where: { code: 'IST' },
      update: {},
      create: {
        name: 'İstanbul Üniversitesi',
        city: 'İstanbul',
        code: 'IST',
      },
    }),
    prisma.university.upsert({
      where: { code: 'BOUN' },
      update: {},
      create: {
        name: 'Boğaziçi Üniversitesi',
        city: 'İstanbul',
        code: 'BOUN',
      },
    }),
    prisma.university.upsert({
      where: { code: 'ITU' },
      update: {},
      create: {
        name: 'İstanbul Teknik Üniversitesi',
        city: 'İstanbul',
        code: 'ITU',
      },
    }),
    prisma.university.upsert({
      where: { code: 'METU' },
      update: {},
      create: {
        name: 'Orta Doğu Teknik Üniversitesi',
        city: 'Ankara',
        code: 'METU',
      },
    }),
  ]);

  console.log('✅ Universities created');

  // Create departments for Istanbul University
  const istUni = universities[0];
  
  const ceDept = await prisma.department.upsert({
    where: { universityId_name: { universityId: istUni.id, name: 'Bilgisayar Mühendisliği' } },
    update: {},
    create: {
      name: 'Bilgisayar Mühendisliği',
      code: 'CE',
      universityId: istUni.id,
    },
  });

  const eeDept = await prisma.department.upsert({
    where: { universityId_name: { universityId: istUni.id, name: 'Elektrik-Elektronik Mühendisliği' } },
    update: {},
    create: {
      name: 'Elektrik-Elektronik Mühendisliği',
      code: 'EE',
      universityId: istUni.id,
    },
  });

  console.log('✅ Departments created');

  // Create courses
  const courses = await Promise.all([
    prisma.course.upsert({
      where: { departmentId_code: { departmentId: ceDept.id, code: 'CE201' } },
      update: {},
      create: {
        name: 'Veri Yapıları',
        code: 'CE201',
        credits: 4,
        semester: 'Fall',
        departmentId: ceDept.id,
      },
    }),
    prisma.course.upsert({
      where: { departmentId_code: { departmentId: ceDept.id, code: 'CE301' } },
      update: {},
      create: {
        name: 'Algoritmalar',
        code: 'CE301',
        credits: 4,
        semester: 'Spring',
        departmentId: ceDept.id,
      },
    }),
    prisma.course.upsert({
      where: { departmentId_code: { departmentId: ceDept.id, code: 'CE302' } },
      update: {},
      create: {
        name: 'Veritabanı Sistemleri',
        code: 'CE302',
        credits: 3,
        semester: 'Fall',
        departmentId: ceDept.id,
      },
    }),
  ]);

  console.log('✅ Courses created');

  // Create admin user
  const hashedPassword = await bcrypt.hash('Admin123!', 10);
  
  const admin = await prisma.user.upsert({
    where: { email: 'admin@karganot.com' },
    update: {},
    create: {
      email: 'admin@karganot.com',
      name: 'Admin User',
      password: hashedPassword,
      role: 'ADMIN',
      verified: true,
      university: 'KARGA NOT',
    },
  });

  console.log('✅ Admin user created');
  console.log('   Email: admin@karganot.com');
  console.log('   Password: Admin123!');

  // Create test student user
  const studentPassword = await bcrypt.hash('Student123!', 10);
  
  const student = await prisma.user.upsert({
    where: { email: 'student@test.com' },
    update: {},
    create: {
      email: 'student@test.com',
      name: 'Test Student',
      password: studentPassword,
      role: 'STUDENT',
      verified: true,
      university: istUni.name,
    },
  });

  console.log('✅ Test student created');
  console.log('   Email: student@test.com');
  console.log('   Password: Student123!');

  console.log('');
  console.log('🎉 Seeding completed!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
