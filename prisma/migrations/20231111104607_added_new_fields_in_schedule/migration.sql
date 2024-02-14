/*
  Warnings:

  - Added the required column `backgroundColor` to the `Schedule` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isCanceled` to the `Schedule` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Schedule" ADD COLUMN     "backgroundColor" TEXT NOT NULL,
ADD COLUMN     "isCanceled" BOOLEAN NOT NULL;
