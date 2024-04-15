/*
  Warnings:

  - You are about to drop the column `rowId` on the `ToothType` table. All the data in the column will be lost.
  - Added the required column `rowId` to the `Tooth` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ToothType" DROP CONSTRAINT "ToothType_rowId_fkey";

-- AlterTable
ALTER TABLE "Tooth" ADD COLUMN     "rowId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "ToothType" DROP COLUMN "rowId";

-- AddForeignKey
ALTER TABLE "Tooth" ADD CONSTRAINT "Tooth_rowId_fkey" FOREIGN KEY ("rowId") REFERENCES "Row"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
