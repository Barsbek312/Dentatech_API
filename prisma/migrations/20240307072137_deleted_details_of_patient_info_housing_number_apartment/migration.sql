/*
  Warnings:

  - You are about to drop the column `apartment` on the `Patient` table. All the data in the column will be lost.
  - You are about to drop the column `housing` on the `Patient` table. All the data in the column will be lost.
  - You are about to drop the column `number` on the `Patient` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Patient" DROP COLUMN "apartment",
DROP COLUMN "housing",
DROP COLUMN "number";
