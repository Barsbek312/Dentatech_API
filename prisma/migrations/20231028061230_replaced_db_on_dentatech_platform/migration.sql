/*
  Warnings:

  - You are about to drop the column `price` on the `Work` table. All the data in the column will be lost.
  - You are about to drop the `Consumables` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `bookmarks` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `clinic` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `districts` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `jaw` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `positions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `status` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `statusStuff` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `statusTreatment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `typeWork` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `pictureURL` to the `Photo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `treatmentId` to the `Photo` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Branch" DROP CONSTRAINT "Branch_clinicId_fkey";

-- DropForeignKey
ALTER TABLE "Patient" DROP CONSTRAINT "Patient_districtId_fkey";

-- DropForeignKey
ALTER TABLE "RowJaw" DROP CONSTRAINT "RowJaw_jawId_fkey";

-- DropForeignKey
ALTER TABLE "Stuff" DROP CONSTRAINT "Stuff_positionId_fkey";

-- DropForeignKey
ALTER TABLE "Stuff" DROP CONSTRAINT "Stuff_statusStuffId_fkey";

-- DropForeignKey
ALTER TABLE "Work" DROP CONSTRAINT "Work_typeWorkId_fkey";

-- DropForeignKey
ALTER TABLE "bookmarks" DROP CONSTRAINT "bookmarks_userId_fkey";

-- AlterTable
ALTER TABLE "Patient" ADD COLUMN     "email" TEXT,
ALTER COLUMN "Age" DROP NOT NULL,
ALTER COLUMN "phone" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Photo" ADD COLUMN     "pictureURL" TEXT NOT NULL,
ADD COLUMN     "treatmentId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Work" DROP COLUMN "price";

-- DropTable
DROP TABLE "Consumables";

-- DropTable
DROP TABLE "bookmarks";

-- DropTable
DROP TABLE "clinic";

-- DropTable
DROP TABLE "districts";

-- DropTable
DROP TABLE "jaw";

-- DropTable
DROP TABLE "positions";

-- DropTable
DROP TABLE "status";

-- DropTable
DROP TABLE "statusStuff";

-- DropTable
DROP TABLE "statusTreatment";

-- DropTable
DROP TABLE "typeWork";

-- DropTable
DROP TABLE "users";

-- CreateTable
CREATE TABLE "District" (
    "id" SERIAL NOT NULL,
    "district" TEXT NOT NULL,

    CONSTRAINT "District_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StatusSchedule" (
    "id" SERIAL NOT NULL,
    "status" TEXT NOT NULL,

    CONSTRAINT "StatusSchedule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Clinic" (
    "id" SERIAL NOT NULL,
    "clinic" TEXT NOT NULL,

    CONSTRAINT "Clinic_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Diagnosis" (
    "id" SERIAL NOT NULL,
    "diagnosis" TEXT NOT NULL,

    CONSTRAINT "Diagnosis_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StatusStuff" (
    "id" SERIAL NOT NULL,
    "status" TEXT NOT NULL,

    CONSTRAINT "StatusStuff_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Position" (
    "id" SERIAL NOT NULL,
    "position" TEXT NOT NULL,

    CONSTRAINT "Position_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StatusTreatment" (
    "id" SERIAL NOT NULL,
    "status" TEXT NOT NULL,

    CONSTRAINT "StatusTreatment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TypeWork" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,

    CONSTRAINT "TypeWork_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Jaw" (
    "id" SERIAL NOT NULL,
    "jaw" TEXT NOT NULL,

    CONSTRAINT "Jaw_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WorkPrice" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "workId" INTEGER NOT NULL,

    CONSTRAINT "WorkPrice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Schedule" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "start" TEXT NOT NULL,
    "end" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "patientId" INTEGER NOT NULL,
    "statusId" INTEGER NOT NULL,
    "staffId" INTEGER NOT NULL,

    CONSTRAINT "Schedule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Treatment" (
    "id" SERIAL NOT NULL,
    "statusId" INTEGER NOT NULL,

    CONSTRAINT "Treatment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Allergy" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "treatmentId" INTEGER NOT NULL,

    CONSTRAINT "Allergy_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Teeth" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "rowJawId" INTEGER NOT NULL,
    "treatmentId" INTEGER NOT NULL,

    CONSTRAINT "Teeth_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TeethDiagnosis" (
    "id" SERIAL NOT NULL,
    "teethId" INTEGER NOT NULL,
    "diagnosisId" INTEGER NOT NULL,

    CONSTRAINT "TeethDiagnosis_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TeethWork" (
    "id" SERIAL NOT NULL,
    "teethId" INTEGER NOT NULL,
    "workId" INTEGER NOT NULL,

    CONSTRAINT "TeethWork_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "RowJaw" ADD CONSTRAINT "RowJaw_jawId_fkey" FOREIGN KEY ("jawId") REFERENCES "Jaw"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Patient" ADD CONSTRAINT "Patient_districtId_fkey" FOREIGN KEY ("districtId") REFERENCES "District"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Branch" ADD CONSTRAINT "Branch_clinicId_fkey" FOREIGN KEY ("clinicId") REFERENCES "Clinic"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Work" ADD CONSTRAINT "Work_typeWorkId_fkey" FOREIGN KEY ("typeWorkId") REFERENCES "TypeWork"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Stuff" ADD CONSTRAINT "Stuff_statusStuffId_fkey" FOREIGN KEY ("statusStuffId") REFERENCES "StatusStuff"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Stuff" ADD CONSTRAINT "Stuff_positionId_fkey" FOREIGN KEY ("positionId") REFERENCES "Position"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkPrice" ADD CONSTRAINT "WorkPrice_workId_fkey" FOREIGN KEY ("workId") REFERENCES "Work"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Schedule" ADD CONSTRAINT "Schedule_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Schedule" ADD CONSTRAINT "Schedule_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "StatusSchedule"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Schedule" ADD CONSTRAINT "Schedule_staffId_fkey" FOREIGN KEY ("staffId") REFERENCES "Stuff"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Treatment" ADD CONSTRAINT "Treatment_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "StatusTreatment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Allergy" ADD CONSTRAINT "Allergy_treatmentId_fkey" FOREIGN KEY ("treatmentId") REFERENCES "Treatment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Teeth" ADD CONSTRAINT "Teeth_rowJawId_fkey" FOREIGN KEY ("rowJawId") REFERENCES "RowJaw"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Teeth" ADD CONSTRAINT "Teeth_treatmentId_fkey" FOREIGN KEY ("treatmentId") REFERENCES "Treatment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Photo" ADD CONSTRAINT "Photo_treatmentId_fkey" FOREIGN KEY ("treatmentId") REFERENCES "Treatment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeethDiagnosis" ADD CONSTRAINT "TeethDiagnosis_teethId_fkey" FOREIGN KEY ("teethId") REFERENCES "Teeth"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeethDiagnosis" ADD CONSTRAINT "TeethDiagnosis_diagnosisId_fkey" FOREIGN KEY ("diagnosisId") REFERENCES "Diagnosis"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeethWork" ADD CONSTRAINT "TeethWork_teethId_fkey" FOREIGN KEY ("teethId") REFERENCES "Teeth"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeethWork" ADD CONSTRAINT "TeethWork_workId_fkey" FOREIGN KEY ("workId") REFERENCES "Work"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
