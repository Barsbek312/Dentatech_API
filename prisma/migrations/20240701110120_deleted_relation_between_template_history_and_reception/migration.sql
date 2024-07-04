/*
  Warnings:

  - You are about to drop the column `receptionId` on the `TemplateHistory` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "TemplateHistory" DROP CONSTRAINT "TemplateHistory_receptionId_fkey";

-- AlterTable
ALTER TABLE "TemplateHistory" DROP COLUMN "receptionId";
