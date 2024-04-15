/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Diagnosis` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `PlannedProcedure` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Diagnosis" DROP COLUMN "createdAt";

-- AlterTable
ALTER TABLE "PlannedProcedure" DROP COLUMN "createdAt";
