/*
  Warnings:

  - Added the required column `patientId` to the `Reception` table without a default value. This is not possible if the table is not empty.
  - Added the required column `staffId` to the `Reception` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Reception" ADD COLUMN     "patientId" INTEGER NOT NULL,
ADD COLUMN     "staffId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Reception" ADD CONSTRAINT "Reception_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reception" ADD CONSTRAINT "Reception_staffId_fkey" FOREIGN KEY ("staffId") REFERENCES "Staff"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
