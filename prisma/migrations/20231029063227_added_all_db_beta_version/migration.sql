/*
  Warnings:

  - You are about to drop the column `treatmentId` on the `Allergy` table. All the data in the column will be lost.
  - You are about to drop the column `diagnosis` on the `Diagnosis` table. All the data in the column will be lost.
  - You are about to drop the column `treatmentId` on the `Photo` table. All the data in the column will be lost.
  - You are about to drop the column `treatmentId` on the `Teeth` table. All the data in the column will be lost.
  - You are about to drop the `StatusStuff` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Stuff` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TeethDiagnosis` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TeethWork` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `patientId` to the `Allergy` table without a default value. This is not possible if the table is not empty.
  - Added the required column `diseaseId` to the `Diagnosis` table without a default value. This is not possible if the table is not empty.
  - Added the required column `patientId` to the `Diagnosis` table without a default value. This is not possible if the table is not empty.
  - Added the required column `staffId` to the `Diagnosis` table without a default value. This is not possible if the table is not empty.
  - Added the required column `teethId` to the `Diagnosis` table without a default value. This is not possible if the table is not empty.
  - Added the required column `diagnosisId` to the `Photo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `diagnosisId` to the `Treatment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Treatment` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Allergy" DROP CONSTRAINT "Allergy_treatmentId_fkey";

-- DropForeignKey
ALTER TABLE "Photo" DROP CONSTRAINT "Photo_treatmentId_fkey";

-- DropForeignKey
ALTER TABLE "Schedule" DROP CONSTRAINT "Schedule_staffId_fkey";

-- DropForeignKey
ALTER TABLE "Stuff" DROP CONSTRAINT "Stuff_branchId_fkey";

-- DropForeignKey
ALTER TABLE "Stuff" DROP CONSTRAINT "Stuff_positionId_fkey";

-- DropForeignKey
ALTER TABLE "Stuff" DROP CONSTRAINT "Stuff_statusStuffId_fkey";

-- DropForeignKey
ALTER TABLE "Teeth" DROP CONSTRAINT "Teeth_treatmentId_fkey";

-- DropForeignKey
ALTER TABLE "TeethDiagnosis" DROP CONSTRAINT "TeethDiagnosis_diagnosisId_fkey";

-- DropForeignKey
ALTER TABLE "TeethDiagnosis" DROP CONSTRAINT "TeethDiagnosis_teethId_fkey";

-- DropForeignKey
ALTER TABLE "TeethWork" DROP CONSTRAINT "TeethWork_teethId_fkey";

-- DropForeignKey
ALTER TABLE "TeethWork" DROP CONSTRAINT "TeethWork_workId_fkey";

-- AlterTable
ALTER TABLE "Allergy" DROP COLUMN "treatmentId",
ADD COLUMN     "patientId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Diagnosis" DROP COLUMN "diagnosis",
ADD COLUMN     "diseaseId" INTEGER NOT NULL,
ADD COLUMN     "patientId" INTEGER NOT NULL,
ADD COLUMN     "staffId" INTEGER NOT NULL,
ADD COLUMN     "teethId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Photo" DROP COLUMN "treatmentId",
ADD COLUMN     "diagnosisId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Teeth" DROP COLUMN "treatmentId";

-- AlterTable
ALTER TABLE "Treatment" ADD COLUMN     "diagnosisId" INTEGER NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Work" ADD COLUMN     "descriptionOfWork" TEXT;

-- DropTable
DROP TABLE "StatusStuff";

-- DropTable
DROP TABLE "Stuff";

-- DropTable
DROP TABLE "TeethDiagnosis";

-- DropTable
DROP TABLE "TeethWork";

-- CreateTable
CREATE TABLE "Disease" (
    "id" SERIAL NOT NULL,
    "disease" TEXT NOT NULL,

    CONSTRAINT "Disease_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Staff" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "surname" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "gender" BOOLEAN NOT NULL,
    "email" TEXT NOT NULL,
    "hash" TEXT NOT NULL,
    "branchId" INTEGER NOT NULL,
    "positionId" INTEGER NOT NULL,

    CONSTRAINT "Staff_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TreatmentWork" (
    "id" SERIAL NOT NULL,
    "workId" INTEGER NOT NULL,
    "treatmentId" INTEGER NOT NULL,

    CONSTRAINT "TreatmentWork_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Staff" ADD CONSTRAINT "Staff_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES "Branch"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Staff" ADD CONSTRAINT "Staff_positionId_fkey" FOREIGN KEY ("positionId") REFERENCES "Position"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Allergy" ADD CONSTRAINT "Allergy_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Schedule" ADD CONSTRAINT "Schedule_staffId_fkey" FOREIGN KEY ("staffId") REFERENCES "Staff"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Diagnosis" ADD CONSTRAINT "Diagnosis_diseaseId_fkey" FOREIGN KEY ("diseaseId") REFERENCES "Disease"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Diagnosis" ADD CONSTRAINT "Diagnosis_teethId_fkey" FOREIGN KEY ("teethId") REFERENCES "Teeth"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Diagnosis" ADD CONSTRAINT "Diagnosis_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Diagnosis" ADD CONSTRAINT "Diagnosis_staffId_fkey" FOREIGN KEY ("staffId") REFERENCES "Staff"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Treatment" ADD CONSTRAINT "Treatment_diagnosisId_fkey" FOREIGN KEY ("diagnosisId") REFERENCES "Diagnosis"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Photo" ADD CONSTRAINT "Photo_diagnosisId_fkey" FOREIGN KEY ("diagnosisId") REFERENCES "Diagnosis"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TreatmentWork" ADD CONSTRAINT "TreatmentWork_workId_fkey" FOREIGN KEY ("workId") REFERENCES "Work"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TreatmentWork" ADD CONSTRAINT "TreatmentWork_treatmentId_fkey" FOREIGN KEY ("treatmentId") REFERENCES "Treatment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
