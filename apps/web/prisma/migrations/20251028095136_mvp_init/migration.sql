/*
  Warnings:

  - You are about to drop the `documents` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `purchases` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `reviews` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `university_units` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `credits` on the `courses` table. All the data in the column will be lost.
  - You are about to drop the column `code` on the `departments` table. All the data in the column will be lost.
  - You are about to drop the column `quota` on the `departments` table. All the data in the column will be lost.
  - You are about to drop the column `scoreType` on the `departments` table. All the data in the column will be lost.
  - You are about to drop the column `universityUnitId` on the `departments` table. All the data in the column will be lost.
  - You are about to drop the column `yokAtlasId` on the `departments` table. All the data in the column will be lost.
  - You are about to drop the column `courseCode` on the `notes` table. All the data in the column will be lost.
  - You are about to drop the column `courseName` on the `notes` table. All the data in the column will be lost.
  - You are about to drop the column `department` on the `notes` table. All the data in the column will be lost.
  - You are about to drop the column `downloadCount` on the `notes` table. All the data in the column will be lost.
  - You are about to drop the column `faculty` on the `notes` table. All the data in the column will be lost.
  - You are about to drop the column `fileName` on the `notes` table. All the data in the column will be lost.
  - You are about to drop the column `fileSize` on the `notes` table. All the data in the column will be lost.
  - You are about to drop the column `fileType` on the `notes` table. All the data in the column will be lost.
  - You are about to drop the column `pageCount` on the `notes` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `notes` table. All the data in the column will be lost.
  - You are about to drop the column `sellerId` on the `notes` table. All the data in the column will be lost.
  - You are about to drop the column `semester` on the `notes` table. All the data in the column will be lost.
  - You are about to drop the column `thumbnailKey` on the `notes` table. All the data in the column will be lost.
  - You are about to drop the column `university` on the `notes` table. All the data in the column will be lost.
  - You are about to drop the column `viewCount` on the `notes` table. All the data in the column will be lost.
  - You are about to drop the column `year` on the `notes` table. All the data in the column will be lost.
  - You are about to drop the column `logo` on the `universities` table. All the data in the column will be lost.
  - You are about to drop the column `website` on the `universities` table. All the data in the column will be lost.
  - You are about to drop the column `yokAtlasId` on the `universities` table. All the data in the column will be lost.
  - You are about to drop the column `badges` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `balance` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `credits` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `department` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `faculty` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `gradeLevel` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `lastLogin` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `level` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `points` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `studentId` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `university` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `verified` on the `users` table. All the data in the column will be lost.
  - Made the column `facultyId` on table `departments` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `courseId` to the `notes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fileExt` to the `notes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sizeBytes` to the `notes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `universityId` to the `notes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `uploaderId` to the `notes` table without a default value. This is not possible if the table is not empty.
  - Made the column `name` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "documents_createdAt_idx";

-- DropIndex
DROP INDEX "documents_documentType_idx";

-- DropIndex
DROP INDEX "documents_status_idx";

-- DropIndex
DROP INDEX "documents_courseId_idx";

-- DropIndex
DROP INDEX "documents_departmentId_idx";

-- DropIndex
DROP INDEX "documents_facultyId_idx";

-- DropIndex
DROP INDEX "documents_universityUnitId_idx";

-- DropIndex
DROP INDEX "documents_universityId_idx";

-- DropIndex
DROP INDEX "documents_userId_idx";

-- DropIndex
DROP INDEX "purchases_userId_noteId_key";

-- DropIndex
DROP INDEX "reviews_userId_noteId_key";

-- DropIndex
DROP INDEX "university_units_universityId_slug_key";

-- DropIndex
DROP INDEX "university_units_yokAtlasId_idx";

-- DropIndex
DROP INDEX "university_units_type_idx";

-- DropIndex
DROP INDEX "university_units_universityId_idx";

-- DropIndex
DROP INDEX "university_units_yokAtlasId_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "documents";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "purchases";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "reviews";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "university_units";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "ratings" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "noteId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "comment" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "ratings_noteId_fkey" FOREIGN KEY ("noteId") REFERENCES "notes" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "ratings_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "reports" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "noteId" TEXT NOT NULL,
    "reporterId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "detail" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'OPEN',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "resolvedAt" DATETIME,
    "resolverId" TEXT,
    CONSTRAINT "reports_noteId_fkey" FOREIGN KEY ("noteId") REFERENCES "notes" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "reports_reporterId_fkey" FOREIGN KEY ("reporterId") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "downloads" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "noteId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "ipHash" TEXT NOT NULL,
    "userAgent" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "downloads_noteId_fkey" FOREIGN KEY ("noteId") REFERENCES "notes" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "downloads_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "transactions" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "amount" REAL NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'TRY',
    "status" TEXT NOT NULL,
    "providerRef" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "renewedAt" DATETIME,
    "expiresAt" DATETIME,
    CONSTRAINT "transactions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "webhooks" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "provider" TEXT NOT NULL,
    "payload" TEXT NOT NULL,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "audit_logs" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "actorUserId" TEXT,
    "action" TEXT NOT NULL,
    "entity" TEXT NOT NULL,
    "entityId" TEXT NOT NULL,
    "diff" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "audit_logs_actorUserId_fkey" FOREIGN KEY ("actorUserId") REFERENCES "users" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_courses" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "departmentId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT,
    "slug" TEXT NOT NULL,
    "semester" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "courses_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "departments" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_courses" ("code", "createdAt", "departmentId", "id", "name", "slug", "updatedAt") SELECT "code", "createdAt", "departmentId", "id", "name", "slug", "updatedAt" FROM "courses";
DROP TABLE "courses";
ALTER TABLE "new_courses" RENAME TO "courses";
CREATE UNIQUE INDEX "courses_departmentId_slug_key" ON "courses"("departmentId", "slug");
CREATE TABLE "new_departments" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "facultyId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "departments_facultyId_fkey" FOREIGN KEY ("facultyId") REFERENCES "faculties" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_departments" ("createdAt", "facultyId", "id", "isActive", "name", "slug", "updatedAt") SELECT "createdAt", "facultyId", "id", "isActive", "name", "slug", "updatedAt" FROM "departments";
DROP TABLE "departments";
ALTER TABLE "new_departments" RENAME TO "departments";
CREATE UNIQUE INDEX "departments_facultyId_slug_key" ON "departments"("facultyId", "slug");
CREATE TABLE "new_faculties" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "universityId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "faculties_universityId_fkey" FOREIGN KEY ("universityId") REFERENCES "universities" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_faculties" ("createdAt", "id", "name", "slug", "universityId", "updatedAt") SELECT "createdAt", "id", "name", "slug", "universityId", "updatedAt" FROM "faculties";
DROP TABLE "faculties";
ALTER TABLE "new_faculties" RENAME TO "faculties";
CREATE UNIQUE INDEX "faculties_universityId_slug_key" ON "faculties"("universityId", "slug");
CREATE TABLE "new_notes" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "courseId" TEXT NOT NULL,
    "uploaderId" TEXT NOT NULL,
    "universityId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "tags" TEXT NOT NULL DEFAULT '[]',
    "fileKey" TEXT NOT NULL,
    "fileExt" TEXT NOT NULL,
    "pages" INTEGER,
    "sizeBytes" INTEGER NOT NULL,
    "previewKey" TEXT,
    "ocrTextIndexed" BOOLEAN NOT NULL DEFAULT false,
    "downloads" INTEGER NOT NULL DEFAULT 0,
    "views" INTEGER NOT NULL DEFAULT 0,
    "avgRating" REAL,
    "ratingCount" INTEGER NOT NULL DEFAULT 0,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "moderationReason" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "notes_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "courses" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "notes_uploaderId_fkey" FOREIGN KEY ("uploaderId") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "notes_universityId_fkey" FOREIGN KEY ("universityId") REFERENCES "universities" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_notes" ("createdAt", "description", "fileKey", "id", "status", "title", "updatedAt") SELECT "createdAt", "description", "fileKey", "id", "status", "title", "updatedAt" FROM "notes";
DROP TABLE "notes";
ALTER TABLE "new_notes" RENAME TO "notes";
CREATE INDEX "notes_courseId_idx" ON "notes"("courseId");
CREATE INDEX "notes_uploaderId_idx" ON "notes"("uploaderId");
CREATE INDEX "notes_status_idx" ON "notes"("status");
CREATE TABLE "new_universities" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "city" TEXT,
    "type" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_universities" ("city", "createdAt", "id", "isActive", "name", "slug", "type", "updatedAt") SELECT "city", "createdAt", "id", "isActive", "name", "slug", "type", "updatedAt" FROM "universities";
DROP TABLE "universities";
ALTER TABLE "new_universities" RENAME TO "universities";
CREATE UNIQUE INDEX "universities_name_key" ON "universities"("name");
CREATE UNIQUE INDEX "universities_slug_key" ON "universities"("slug");
CREATE TABLE "new_users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "emailVerified" DATETIME,
    "passwordHash" TEXT,
    "name" TEXT NOT NULL,
    "image" TEXT,
    "universityId" TEXT,
    "departmentId" TEXT,
    "role" TEXT NOT NULL DEFAULT 'USER',
    "status" TEXT NOT NULL DEFAULT 'ACTIVE',
    "plan" TEXT NOT NULL DEFAULT 'FREE',
    "planRenewsAt" DATETIME,
    "monthlyDownloadQuota" INTEGER NOT NULL DEFAULT 3,
    "monthlyDownloadUsed" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "lastLoginAt" DATETIME,
    CONSTRAINT "users_universityId_fkey" FOREIGN KEY ("universityId") REFERENCES "universities" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "users_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "departments" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_users" ("createdAt", "email", "emailVerified", "id", "image", "name", "role", "updatedAt") SELECT "createdAt", "email", "emailVerified", "id", "image", "name", "role", "updatedAt" FROM "users";
DROP TABLE "users";
ALTER TABLE "new_users" RENAME TO "users";
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
CREATE INDEX "users_email_idx" ON "users"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "ratings_noteId_userId_key" ON "ratings"("noteId", "userId");
