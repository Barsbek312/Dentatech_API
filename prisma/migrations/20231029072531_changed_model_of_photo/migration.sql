/*
  Warnings:

  - You are about to drop the column `diagnosisId` on the `Photo` table. All the data in the column will be lost.
  - Added the required column `patientId` to the `Photo` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Photo" DROP CONSTRAINT "Photo_diagnosisId_fkey";

-- AlterTable
ALTER TABLE "Photo" DROP COLUMN "diagnosisId",
ADD COLUMN     "patientId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Schedule" ALTER COLUMN "description" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Photo" ADD CONSTRAINT "Photo_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
