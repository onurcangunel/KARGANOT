-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_departments" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "facultyId" TEXT,
    "universityUnitId" TEXT,
    "yokAtlasId" TEXT,
    "code" TEXT,
    "scoreType" TEXT,
    "quota" INTEGER,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "departments_facultyId_fkey" FOREIGN KEY ("facultyId") REFERENCES "faculties" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "departments_universityUnitId_fkey" FOREIGN KEY ("universityUnitId") REFERENCES "university_units" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_departments" ("createdAt", "facultyId", "id", "name", "slug", "universityUnitId", "updatedAt") SELECT "createdAt", "facultyId", "id", "name", "slug", "universityUnitId", "updatedAt" FROM "departments";
DROP TABLE "departments";
ALTER TABLE "new_departments" RENAME TO "departments";
CREATE UNIQUE INDEX "departments_yokAtlasId_key" ON "departments"("yokAtlasId");
CREATE INDEX "departments_facultyId_idx" ON "departments"("facultyId");
CREATE INDEX "departments_universityUnitId_idx" ON "departments"("universityUnitId");
CREATE INDEX "departments_yokAtlasId_idx" ON "departments"("yokAtlasId");
CREATE INDEX "departments_scoreType_idx" ON "departments"("scoreType");
CREATE UNIQUE INDEX "departments_facultyId_slug_key" ON "departments"("facultyId", "slug");
CREATE UNIQUE INDEX "departments_universityUnitId_slug_key" ON "departments"("universityUnitId", "slug");
CREATE TABLE "new_universities" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "city" TEXT,
    "type" TEXT,
    "logo" TEXT,
    "website" TEXT,
    "yokAtlasId" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_universities" ("city", "createdAt", "id", "logo", "name", "slug", "type", "updatedAt", "website") SELECT "city", "createdAt", "id", "logo", "name", "slug", "type", "updatedAt", "website" FROM "universities";
DROP TABLE "universities";
ALTER TABLE "new_universities" RENAME TO "universities";
CREATE UNIQUE INDEX "universities_name_key" ON "universities"("name");
CREATE UNIQUE INDEX "universities_slug_key" ON "universities"("slug");
CREATE UNIQUE INDEX "universities_yokAtlasId_key" ON "universities"("yokAtlasId");
CREATE INDEX "universities_slug_idx" ON "universities"("slug");
CREATE INDEX "universities_city_idx" ON "universities"("city");
CREATE INDEX "universities_yokAtlasId_idx" ON "universities"("yokAtlasId");
CREATE TABLE "new_university_units" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "universityId" TEXT NOT NULL,
    "yokAtlasId" TEXT,
    "shortName" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "university_units_universityId_fkey" FOREIGN KEY ("universityId") REFERENCES "universities" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_university_units" ("createdAt", "id", "name", "slug", "type", "universityId", "updatedAt") SELECT "createdAt", "id", "name", "slug", "type", "universityId", "updatedAt" FROM "university_units";
DROP TABLE "university_units";
ALTER TABLE "new_university_units" RENAME TO "university_units";
CREATE UNIQUE INDEX "university_units_yokAtlasId_key" ON "university_units"("yokAtlasId");
CREATE INDEX "university_units_universityId_idx" ON "university_units"("universityId");
CREATE INDEX "university_units_type_idx" ON "university_units"("type");
CREATE INDEX "university_units_yokAtlasId_idx" ON "university_units"("yokAtlasId");
CREATE UNIQUE INDEX "university_units_universityId_slug_key" ON "university_units"("universityId", "slug");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
