/*
  Warnings:

  - You are about to drop the column `staffId` on the `Reception` table. All the data in the column will be lost.
  - Added the required column `attendingDoctorId` to the `Reception` table without a default value. This is not possible if the table is not empty.
  - Added the required column `referringDoctorId` to the `Reception` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Reception" DROP CONSTRAINT "Reception_staffId_fkey";

-- AlterTable
ALTER TABLE "Reception" DROP COLUMN "staffId",
ADD COLUMN     "attendingDoctorId" INTEGER NOT NULL,
ADD COLUMN     "referringDoctorId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Reception" ADD CONSTRAINT "Reception_attendingDoctorId_fkey" FOREIGN KEY ("attendingDoctorId") REFERENCES "Staff"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reception" ADD CONSTRAINT "Reception_referringDoctorId_fkey" FOREIGN KEY ("referringDoctorId") REFERENCES "Staff"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
