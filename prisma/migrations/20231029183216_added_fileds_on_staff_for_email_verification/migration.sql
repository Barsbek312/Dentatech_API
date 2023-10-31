/*
  Warnings:

  - You are about to drop the column `gender` on the `Staff` table. All the data in the column will be lost.
  - Added the required column `isMale` to the `Staff` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Staff" DROP COLUMN "gender",
ADD COLUMN     "emailVerificationToken" TEXT,
ADD COLUMN     "isEmailVerified" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isMale" BOOLEAN NOT NULL,
ADD COLUMN     "tokenExpirationDate" TIMESTAMP(3);
