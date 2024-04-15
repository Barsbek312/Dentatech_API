/*
  Warnings:

  - You are about to drop the column `isCanceled` on the `Reception` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `DiseaseHistory` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "DiseaseHistory" DROP CONSTRAINT "DiseaseHistory_receptionId_fkey";

-- AlterTable
ALTER TABLE "DiseaseHistory" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Reception" DROP COLUMN "isCanceled";

-- AddForeignKey
ALTER TABLE "DiseaseHistory" ADD CONSTRAINT "DiseaseHistory_receptionId_fkey" FOREIGN KEY ("receptionId") REFERENCES "Reception"("id") ON DELETE CASCADE ON UPDATE CASCADE;
