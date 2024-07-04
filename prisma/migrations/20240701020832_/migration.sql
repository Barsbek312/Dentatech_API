/*
  Warnings:

  - You are about to drop the `TemplateCheckboxOption` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TemplateCheckboxOptionHistory` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "TemplateCheckboxOption" DROP CONSTRAINT "TemplateCheckboxOption_templateCheckboxId_fkey";

-- DropForeignKey
ALTER TABLE "TemplateCheckboxOptionHistory" DROP CONSTRAINT "TemplateCheckboxOptionHistory_templateCheckboxHistoryId_fkey";

-- DropForeignKey
ALTER TABLE "TemplateCheckboxOptionHistory" DROP CONSTRAINT "TemplateCheckboxOptionHistory_templateCheckboxOptionId_fkey";

-- AlterTable
ALTER TABLE "TemplateCheckboxHistory" ADD COLUMN     "value" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "TemplateSelectHistory" ADD COLUMN     "date" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- DropTable
DROP TABLE "TemplateCheckboxOption";

-- DropTable
DROP TABLE "TemplateCheckboxOptionHistory";
