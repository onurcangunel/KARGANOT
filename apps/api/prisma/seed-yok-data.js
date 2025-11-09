/* eslint-disable @typescript-eslint/no-var-requires */
const { PrismaClient } = require("@prisma/client");
const fs = require("fs");
const path = require("path");

const prisma = new PrismaClient();

async function main() {
  const dataFile = path.resolve(__dirname, "../../../src/data/yok-data.json");
  const raw = fs.readFileSync(dataFile, "utf8");
  const universities = JSON.parse(raw);

  console.log(`📚 Importing ${universities.length} universities from yok-data.json...`);

  for (const uni of universities) {
    const university = await prisma.university.upsert({
      where: { name: uni.name },
      update: {
        city: uni.city || "Türkiye",
        type: uni.type || undefined,
      },
      create: {
        name: uni.name,
        city: uni.city || "Türkiye",
        type: uni.type || undefined,
      },
    });

    for (const faculty of uni.faculties || []) {
      const fac = await prisma.faculty.upsert({
        where: { universityId_name: { universityId: university.id, name: faculty.name } },
        update: {},
        create: { name: faculty.name, universityId: university.id },
      });

      for (const dept of faculty.departments || []) {
        await prisma.department.upsert({
          where: { universityId_name: { universityId: university.id, name: dept.name } },
          update: { facultyId: fac.id },
          create: { name: dept.name, universityId: university.id, facultyId: fac.id },
        });
      }
    }

    console.log(`✅ ${university.name} imported`);
  }

  console.log("\n🎉 YÖK Atlas verisi başarıyla veritabanına aktarıldı!\n");
}

main()
  .catch((e) => {
    console.error("❌ Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
