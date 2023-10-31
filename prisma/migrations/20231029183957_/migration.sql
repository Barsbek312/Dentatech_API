/*
  Warnings:

  - A unique constraint covering the columns `[emailVerificationToken]` on the table `Staff` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Staff_emailVerificationToken_key" ON "Staff"("emailVerificationToken");
