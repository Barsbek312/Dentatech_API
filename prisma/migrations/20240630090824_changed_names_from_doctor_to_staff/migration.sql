/*
  Warnings:

  - You are about to drop the column `attendingDoctorId` on the `Reception` table. All the data in the column will be lost.
  - You are about to drop the column `referringDoctorId` on the `Reception` table. All the data in the column will be lost.
  - Added the required column `attendingStaffId` to the `Reception` table without a default value. This is not possible if the table is not empty.
  - Added the required column `referringStaffId` to the `Reception` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Reception" DROP CONSTRAINT "Reception_attendingDoctorId_fkey";

-- DropForeignKey
ALTER TABLE "Reception" DROP CONSTRAINT "Reception_referringDoctorId_fkey";

-- AlterTable
ALTER TABLE "Reception" DROP COLUMN "attendingDoctorId",
DROP COLUMN "referringDoctorId",
ADD COLUMN     "attendingStaffId" INTEGER NOT NULL,
ADD COLUMN     "referringStaffId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Reception" ADD CONSTRAINT "Reception_attendingStaffId_fkey" FOREIGN KEY ("attendingStaffId") REFERENCES "Staff"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reception" ADD CONSTRAINT "Reception_referringStaffId_fkey" FOREIGN KEY ("referringStaffId") REFERENCES "Staff"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
