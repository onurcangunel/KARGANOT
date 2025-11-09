import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";

const prisma = new PrismaClient();

type DepartmentIn = { id?: number | string; name: string };
type FacultyIn = { id?: number | string; name: string; departments: DepartmentIn[] };
type UniversityIn = {
  id?: number | string;
  name: string;
  city: string;
  type?: string;
  faculties: FacultyIn[];
};

async function main() {
  // Monorepo kökünden yok-data.json'a gider
  const dataFile = path.resolve(__dirname, "../../../src/data/yok-data.json");
  const raw = fs.readFileSync(dataFile, "utf8");
  const universities: UniversityIn[] = JSON.parse(raw);

  console.log(`📚 Importing ${universities.length} universities from yok-data.json...`);

  for (const uni of universities) {
    // University upsert (unique: name)
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

    // Faculties
    for (const faculty of uni.faculties || []) {
      const fac = await prisma.faculty.upsert({
        // composite unique: (universityId, name)
        where: { universityId_name: { universityId: university.id, name: faculty.name } },
        update: {},
        create: { name: faculty.name, universityId: university.id },
      });

      // Departments
      for (const dept of faculty.departments || []) {
        await prisma.department.upsert({
          // composite unique: (universityId, name)
          where: { universityId_name: { universityId: university.id, name: dept.name } },
          update: {
            facultyId: fac.id,
          },
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
