/*
  Warnings:

  - Added the required column `receptionTypeId` to the `Reception` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Reception" ADD COLUMN     "receptionTypeId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "ReceptionType" (
    "id" SERIAL NOT NULL,
    "receptionType" TEXT NOT NULL,

    CONSTRAINT "ReceptionType_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Reception" ADD CONSTRAINT "Reception_receptionTypeId_fkey" FOREIGN KEY ("receptionTypeId") REFERENCES "ReceptionType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
