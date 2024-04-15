/*
  Warnings:

  - You are about to drop the column `toothPartId` on the `Diagnosis` table. All the data in the column will be lost.
  - You are about to drop the column `toothPartId` on the `DiseaseHistory` table. All the data in the column will be lost.
  - You are about to drop the column `toothPartId` on the `PlannedProcedure` table. All the data in the column will be lost.
  - You are about to drop the column `toothId` on the `ToothPart` table. All the data in the column will be lost.
  - Added the required column `toothPartConnectId` to the `Diagnosis` table without a default value. This is not possible if the table is not empty.
  - Added the required column `toothPartConnectId` to the `DiseaseHistory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `toothPartConnectId` to the `PlannedProcedure` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Diagnosis" DROP CONSTRAINT "Diagnosis_toothPartId_fkey";

-- DropForeignKey
ALTER TABLE "DiseaseHistory" DROP CONSTRAINT "DiseaseHistory_toothPartId_fkey";

-- DropForeignKey
ALTER TABLE "PlannedProcedure" DROP CONSTRAINT "PlannedProcedure_toothPartId_fkey";

-- DropForeignKey
ALTER TABLE "ToothPart" DROP CONSTRAINT "ToothPart_toothId_fkey";

-- AlterTable
ALTER TABLE "Diagnosis" DROP COLUMN "toothPartId",
ADD COLUMN     "toothPartConnectId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "DiseaseHistory" DROP COLUMN "toothPartId",
ADD COLUMN     "toothPartConnectId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "PlannedProcedure" DROP COLUMN "toothPartId",
ADD COLUMN     "toothPartConnectId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "ToothPart" DROP COLUMN "toothId";

-- CreateTable
CREATE TABLE "ToothPartConnect" (
    "id" SERIAL NOT NULL,
    "toothPartId" INTEGER NOT NULL,
    "toothId" INTEGER NOT NULL,

    CONSTRAINT "ToothPartConnect_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ToothPartConnect" ADD CONSTRAINT "ToothPartConnect_toothPartId_fkey" FOREIGN KEY ("toothPartId") REFERENCES "ToothPart"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ToothPartConnect" ADD CONSTRAINT "ToothPartConnect_toothId_fkey" FOREIGN KEY ("toothId") REFERENCES "Tooth"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Diagnosis" ADD CONSTRAINT "Diagnosis_toothPartConnectId_fkey" FOREIGN KEY ("toothPartConnectId") REFERENCES "ToothPartConnect"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlannedProcedure" ADD CONSTRAINT "PlannedProcedure_toothPartConnectId_fkey" FOREIGN KEY ("toothPartConnectId") REFERENCES "ToothPartConnect"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DiseaseHistory" ADD CONSTRAINT "DiseaseHistory_toothPartConnectId_fkey" FOREIGN KEY ("toothPartConnectId") REFERENCES "ToothPartConnect"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
