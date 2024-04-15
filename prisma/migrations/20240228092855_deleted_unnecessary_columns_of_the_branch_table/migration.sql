/*
  Warnings:

  - You are about to drop the column `apartment` on the `Branch` table. All the data in the column will be lost.
  - You are about to drop the column `housing` on the `Branch` table. All the data in the column will be lost.
  - You are about to drop the column `number` on the `Branch` table. All the data in the column will be lost.
  - Added the required column `clinicId` to the `Branch` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Branch" DROP COLUMN "apartment",
DROP COLUMN "housing",
DROP COLUMN "number",
ADD COLUMN     "clinicId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Branch" ADD CONSTRAINT "Branch_clinicId_fkey" FOREIGN KEY ("clinicId") REFERENCES "Clinic"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
