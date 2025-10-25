-- CreateTable
CREATE TABLE "university_units" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "universityId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "university_units_universityId_fkey" FOREIGN KEY ("universityId") REFERENCES "universities" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_departments" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "facultyId" TEXT,
    "universityUnitId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "departments_facultyId_fkey" FOREIGN KEY ("facultyId") REFERENCES "faculties" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "departments_universityUnitId_fkey" FOREIGN KEY ("universityUnitId") REFERENCES "university_units" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_departments" ("createdAt", "facultyId", "id", "name", "slug", "updatedAt") SELECT "createdAt", "facultyId", "id", "name", "slug", "updatedAt" FROM "departments";
DROP TABLE "departments";
ALTER TABLE "new_departments" RENAME TO "departments";
CREATE INDEX "departments_facultyId_idx" ON "departments"("facultyId");
CREATE INDEX "departments_universityUnitId_idx" ON "departments"("universityUnitId");
CREATE UNIQUE INDEX "departments_facultyId_slug_key" ON "departments"("facultyId", "slug");
CREATE UNIQUE INDEX "departments_universityUnitId_slug_key" ON "departments"("universityUnitId", "slug");
CREATE TABLE "new_documents" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "fileName" TEXT NOT NULL,
    "fileUrl" TEXT NOT NULL,
    "fileSize" INTEGER NOT NULL,
    "fileType" TEXT NOT NULL,
    "thumbnailUrl" TEXT,
    "pageCount" INTEGER,
    "universityId" TEXT NOT NULL,
    "universityUnitId" TEXT,
    "facultyId" TEXT,
    "departmentId" TEXT,
    "courseId" TEXT,
    "documentType" TEXT NOT NULL DEFAULT 'DERS_NOTU',
    "semester" TEXT,
    "academicYear" TEXT,
    "tags" TEXT DEFAULT '[]',
    "language" TEXT NOT NULL DEFAULT 'tr',
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "rejectionReason" TEXT,
    "moderatedAt" DATETIME,
    "moderatedBy" TEXT,
    "viewCount" INTEGER NOT NULL DEFAULT 0,
    "downloadCount" INTEGER NOT NULL DEFAULT 0,
    "likeCount" INTEGER NOT NULL DEFAULT 0,
    "ratingAvg" REAL,
    "ratingCount" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "documents_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "documents_universityId_fkey" FOREIGN KEY ("universityId") REFERENCES "universities" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "documents_universityUnitId_fkey" FOREIGN KEY ("universityUnitId") REFERENCES "university_units" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "documents_facultyId_fkey" FOREIGN KEY ("facultyId") REFERENCES "faculties" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "documents_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "departments" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "documents_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "courses" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_documents" ("academicYear", "courseId", "createdAt", "departmentId", "description", "documentType", "downloadCount", "facultyId", "fileName", "fileSize", "fileType", "fileUrl", "id", "language", "likeCount", "moderatedAt", "moderatedBy", "pageCount", "ratingAvg", "ratingCount", "rejectionReason", "semester", "status", "tags", "thumbnailUrl", "title", "universityId", "updatedAt", "userId", "viewCount") SELECT "academicYear", "courseId", "createdAt", "departmentId", "description", "documentType", "downloadCount", "facultyId", "fileName", "fileSize", "fileType", "fileUrl", "id", "language", "likeCount", "moderatedAt", "moderatedBy", "pageCount", "ratingAvg", "ratingCount", "rejectionReason", "semester", "status", "tags", "thumbnailUrl", "title", "universityId", "updatedAt", "userId", "viewCount" FROM "documents";
DROP TABLE "documents";
ALTER TABLE "new_documents" RENAME TO "documents";
CREATE INDEX "documents_userId_idx" ON "documents"("userId");
CREATE INDEX "documents_universityId_idx" ON "documents"("universityId");
CREATE INDEX "documents_universityUnitId_idx" ON "documents"("universityUnitId");
CREATE INDEX "documents_facultyId_idx" ON "documents"("facultyId");
CREATE INDEX "documents_departmentId_idx" ON "documents"("departmentId");
CREATE INDEX "documents_courseId_idx" ON "documents"("courseId");
CREATE INDEX "documents_status_idx" ON "documents"("status");
CREATE INDEX "documents_documentType_idx" ON "documents"("documentType");
CREATE INDEX "documents_createdAt_idx" ON "documents"("createdAt");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE INDEX "university_units_universityId_idx" ON "university_units"("universityId");

-- CreateIndex
CREATE INDEX "university_units_type_idx" ON "university_units"("type");

-- CreateIndex
CREATE UNIQUE INDEX "university_units_universityId_slug_key" ON "university_units"("universityId", "slug");
