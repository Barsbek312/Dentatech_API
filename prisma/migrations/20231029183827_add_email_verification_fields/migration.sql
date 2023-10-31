/*
  Warnings:

  - You are about to alter the column `emailVerificationToken` on the `Staff` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.

*/
-- AlterTable
ALTER TABLE "Staff" ALTER COLUMN "emailVerificationToken" SET DATA TYPE VARCHAR(255);
