/*
  Warnings:

  - Added the required column `isAdmin` to the `Staff` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Staff" ADD COLUMN     "isAdmin" BOOLEAN NOT NULL;
