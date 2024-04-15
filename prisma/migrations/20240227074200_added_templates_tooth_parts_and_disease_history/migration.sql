/*
  Warnings:

  - You are about to drop the column `patientId` on the `Allergy` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Allergy` table. All the data in the column will be lost.
  - You are about to drop the column `clinicId` on the `Branch` table. All the data in the column will be lost.
  - You are about to drop the column `teethId` on the `Diagnosis` table. All the data in the column will be lost.
  - You are about to drop the column `Age` on the `Patient` table. All the data in the column will be lost.
  - You are about to drop the column `branchId` on the `Patient` table. All the data in the column will be lost.
  - You are about to drop the column `positionId` on the `Staff` table. All the data in the column will be lost.
  - You are about to drop the `Position` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `RowJaw` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Schedule` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `StatusSchedule` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `StatusTreatment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Teeth` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Treatment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TreatmentWork` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TypeWork` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Work` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `WorkPrice` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `allergy` to the `Allergy` table without a default value. This is not possible if the table is not empty.
  - Added the required column `city` to the `Branch` table without a default value. This is not possible if the table is not empty.
  - Added the required column `street` to the `Branch` table without a default value. This is not possible if the table is not empty.
  - Added the required column `comment` to the `Diagnosis` table without a default value. This is not possible if the table is not empty.
  - Added the required column `toothPartId` to the `Diagnosis` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isMale` to the `Patient` table without a default value. This is not possible if the table is not empty.
  - Added the required column `patientStatusId` to the `Patient` table without a default value. This is not possible if the table is not empty.
  - Added the required column `patientTypeId` to the `Patient` table without a default value. This is not possible if the table is not empty.
  - Added the required column `toothId` to the `Photo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `staffPositionId` to the `Staff` table without a default value. This is not possible if the table is not empty.
  - Added the required column `staffStatusId` to the `Staff` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Allergy" DROP CONSTRAINT "Allergy_patientId_fkey";

-- DropForeignKey
ALTER TABLE "Branch" DROP CONSTRAINT "Branch_clinicId_fkey";

-- DropForeignKey
ALTER TABLE "Diagnosis" DROP CONSTRAINT "Diagnosis_teethId_fkey";

-- DropForeignKey
ALTER TABLE "Patient" DROP CONSTRAINT "Patient_branchId_fkey";

-- DropForeignKey
ALTER TABLE "RowJaw" DROP CONSTRAINT "RowJaw_jawId_fkey";

-- DropForeignKey
ALTER TABLE "Schedule" DROP CONSTRAINT "Schedule_patientId_fkey";

-- DropForeignKey
ALTER TABLE "Schedule" DROP CONSTRAINT "Schedule_staffId_fkey";

-- DropForeignKey
ALTER TABLE "Schedule" DROP CONSTRAINT "Schedule_statusId_fkey";

-- DropForeignKey
ALTER TABLE "Staff" DROP CONSTRAINT "Staff_positionId_fkey";

-- DropForeignKey
ALTER TABLE "Teeth" DROP CONSTRAINT "Teeth_rowJawId_fkey";

-- DropForeignKey
ALTER TABLE "Treatment" DROP CONSTRAINT "Treatment_diagnosisId_fkey";

-- DropForeignKey
ALTER TABLE "Treatment" DROP CONSTRAINT "Treatment_statusId_fkey";

-- DropForeignKey
ALTER TABLE "TreatmentWork" DROP CONSTRAINT "TreatmentWork_treatmentId_fkey";

-- DropForeignKey
ALTER TABLE "TreatmentWork" DROP CONSTRAINT "TreatmentWork_workId_fkey";

-- DropForeignKey
ALTER TABLE "Work" DROP CONSTRAINT "Work_typeWorkId_fkey";

-- DropForeignKey
ALTER TABLE "WorkPrice" DROP CONSTRAINT "WorkPrice_workId_fkey";

-- AlterTable
ALTER TABLE "Allergy" DROP COLUMN "patientId",
DROP COLUMN "title",
ADD COLUMN     "allergy" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Branch" DROP COLUMN "clinicId",
ADD COLUMN     "apartment" TEXT,
ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "housing" TEXT,
ADD COLUMN     "number" TEXT,
ADD COLUMN     "street" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Diagnosis" DROP COLUMN "teethId",
ADD COLUMN     "comment" TEXT NOT NULL,
ADD COLUMN     "toothPartId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Patient" DROP COLUMN "Age",
DROP COLUMN "branchId",
ADD COLUMN     "apartment" TEXT,
ADD COLUMN     "birthDate" DATE,
ADD COLUMN     "city" TEXT,
ADD COLUMN     "housing" TEXT,
ADD COLUMN     "isMale" BOOLEAN NOT NULL,
ADD COLUMN     "number" TEXT,
ADD COLUMN     "patientStatusId" INTEGER NOT NULL,
ADD COLUMN     "patientTypeId" INTEGER NOT NULL,
ADD COLUMN     "patronymic" TEXT,
ADD COLUMN     "street" TEXT,
ADD COLUMN     "where" TEXT;

-- AlterTable
ALTER TABLE "Photo" ADD COLUMN     "toothId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Staff" DROP COLUMN "positionId",
ADD COLUMN     "birthDate" DATE,
ADD COLUMN     "staffPositionId" INTEGER NOT NULL,
ADD COLUMN     "staffStatusId" INTEGER NOT NULL,
ALTER COLUMN "phone" DROP NOT NULL,
ALTER COLUMN "isAdmin" SET DEFAULT false;

-- DropTable
DROP TABLE "Position";

-- DropTable
DROP TABLE "RowJaw";

-- DropTable
DROP TABLE "Schedule";

-- DropTable
DROP TABLE "StatusSchedule";

-- DropTable
DROP TABLE "StatusTreatment";

-- DropTable
DROP TABLE "Teeth";

-- DropTable
DROP TABLE "Treatment";

-- DropTable
DROP TABLE "TreatmentWork";

-- DropTable
DROP TABLE "TypeWork";

-- DropTable
DROP TABLE "Work";

-- DropTable
DROP TABLE "WorkPrice";

-- CreateTable
CREATE TABLE "PatientType" (
    "id" SERIAL NOT NULL,
    "patientType" TEXT NOT NULL,

    CONSTRAINT "PatientType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PatientStatus" (
    "id" SERIAL NOT NULL,
    "patientStatus" TEXT NOT NULL,

    CONSTRAINT "PatientStatus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReceptionStatus" (
    "id" SERIAL NOT NULL,
    "receptionStatus" TEXT NOT NULL,

    CONSTRAINT "ReceptionStatus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StaffPosition" (
    "id" SERIAL NOT NULL,
    "staffPosition" TEXT NOT NULL,

    CONSTRAINT "StaffPosition_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StaffStatus" (
    "id" SERIAL NOT NULL,
    "staffStatus" TEXT NOT NULL,

    CONSTRAINT "StaffStatus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TemplateType" (
    "id" SERIAL NOT NULL,
    "templateType" TEXT NOT NULL,

    CONSTRAINT "TemplateType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProcedureType" (
    "id" SERIAL NOT NULL,
    "procedureType" TEXT NOT NULL,

    CONSTRAINT "ProcedureType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Row" (
    "id" SERIAL NOT NULL,
    "row" TEXT NOT NULL,
    "jawId" INTEGER NOT NULL,

    CONSTRAINT "Row_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Procedure" (
    "id" SERIAL NOT NULL,
    "procedure" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "designation" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "price" DECIMAL(65,30) NOT NULL,
    "procedureTypeId" INTEGER NOT NULL,

    CONSTRAINT "Procedure_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ToothType" (
    "id" SERIAL NOT NULL,
    "toothType" TEXT NOT NULL,
    "rowId" INTEGER NOT NULL,

    CONSTRAINT "ToothType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Template" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "templateTypeId" INTEGER NOT NULL,
    "procedureId" INTEGER NOT NULL,

    CONSTRAINT "Template_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TemplateText" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "procedureId" INTEGER NOT NULL,

    CONSTRAINT "TemplateText_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TemplateInput" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "templateId" INTEGER NOT NULL,

    CONSTRAINT "TemplateInput_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TemplateCheckbox" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "templateId" INTEGER NOT NULL,

    CONSTRAINT "TemplateCheckbox_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TemplateSelect" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "templateId" INTEGER NOT NULL,

    CONSTRAINT "TemplateSelect_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tooth" (
    "id" SERIAL NOT NULL,
    "tooth" TEXT NOT NULL,
    "toothTypeId" INTEGER NOT NULL,

    CONSTRAINT "Tooth_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PatientAllergy" (
    "id" SERIAL NOT NULL,
    "allergyId" INTEGER NOT NULL,
    "patientId" INTEGER NOT NULL,

    CONSTRAINT "PatientAllergy_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reception" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "start" TIMESTAMP(3) NOT NULL,
    "end" TIMESTAMP(3) NOT NULL,
    "description" TEXT,
    "isCanceled" BOOLEAN NOT NULL,
    "backgroundColor" TEXT NOT NULL,
    "receptionStatusId" INTEGER NOT NULL,

    CONSTRAINT "Reception_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TemplateHistory" (
    "id" SERIAL NOT NULL,
    "text" TEXT NOT NULL,
    "templateId" INTEGER NOT NULL,
    "patientId" INTEGER NOT NULL,
    "toothId" INTEGER NOT NULL,
    "receptionId" INTEGER NOT NULL,

    CONSTRAINT "TemplateHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ToothPart" (
    "id" SERIAL NOT NULL,
    "toothPart" TEXT NOT NULL,
    "toothId" INTEGER NOT NULL,

    CONSTRAINT "ToothPart_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TemplateSelectOption" (
    "id" SERIAL NOT NULL,
    "option" TEXT NOT NULL,
    "templateSelectId" INTEGER NOT NULL,

    CONSTRAINT "TemplateSelectOption_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlannedProcedure" (
    "id" SERIAL NOT NULL,
    "toothPartId" INTEGER NOT NULL,
    "procedureId" INTEGER NOT NULL,
    "patientId" INTEGER NOT NULL,
    "staffId" INTEGER NOT NULL,

    CONSTRAINT "PlannedProcedure_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DiseaseHistory" (
    "id" SERIAL NOT NULL,
    "receptionId" INTEGER NOT NULL,
    "procedureId" INTEGER NOT NULL,
    "toothPartId" INTEGER NOT NULL,

    CONSTRAINT "DiseaseHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TemplateTextHistory" (
    "id" SERIAL NOT NULL,
    "text" TEXT NOT NULL,
    "date" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "templateHistoryId" INTEGER NOT NULL,

    CONSTRAINT "TemplateTextHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TemplateSelectHistory" (
    "id" SERIAL NOT NULL,
    "templateSelectId" INTEGER NOT NULL,
    "templateSelectOptionId" INTEGER NOT NULL,
    "templateHistoryId" INTEGER NOT NULL,

    CONSTRAINT "TemplateSelectHistory_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Row" ADD CONSTRAINT "Row_jawId_fkey" FOREIGN KEY ("jawId") REFERENCES "Jaw"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Procedure" ADD CONSTRAINT "Procedure_procedureTypeId_fkey" FOREIGN KEY ("procedureTypeId") REFERENCES "ProcedureType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Patient" ADD CONSTRAINT "Patient_patientTypeId_fkey" FOREIGN KEY ("patientTypeId") REFERENCES "PatientType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Patient" ADD CONSTRAINT "Patient_patientStatusId_fkey" FOREIGN KEY ("patientStatusId") REFERENCES "PatientStatus"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Staff" ADD CONSTRAINT "Staff_staffPositionId_fkey" FOREIGN KEY ("staffPositionId") REFERENCES "StaffPosition"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Staff" ADD CONSTRAINT "Staff_staffStatusId_fkey" FOREIGN KEY ("staffStatusId") REFERENCES "StaffStatus"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ToothType" ADD CONSTRAINT "ToothType_rowId_fkey" FOREIGN KEY ("rowId") REFERENCES "Row"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Template" ADD CONSTRAINT "Template_templateTypeId_fkey" FOREIGN KEY ("templateTypeId") REFERENCES "TemplateType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Template" ADD CONSTRAINT "Template_procedureId_fkey" FOREIGN KEY ("procedureId") REFERENCES "Procedure"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TemplateText" ADD CONSTRAINT "TemplateText_procedureId_fkey" FOREIGN KEY ("procedureId") REFERENCES "Procedure"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TemplateInput" ADD CONSTRAINT "TemplateInput_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "Template"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TemplateCheckbox" ADD CONSTRAINT "TemplateCheckbox_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "Template"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TemplateSelect" ADD CONSTRAINT "TemplateSelect_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "Template"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tooth" ADD CONSTRAINT "Tooth_toothTypeId_fkey" FOREIGN KEY ("toothTypeId") REFERENCES "ToothType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PatientAllergy" ADD CONSTRAINT "PatientAllergy_allergyId_fkey" FOREIGN KEY ("allergyId") REFERENCES "Allergy"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PatientAllergy" ADD CONSTRAINT "PatientAllergy_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reception" ADD CONSTRAINT "Reception_receptionStatusId_fkey" FOREIGN KEY ("receptionStatusId") REFERENCES "ReceptionStatus"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Photo" ADD CONSTRAINT "Photo_toothId_fkey" FOREIGN KEY ("toothId") REFERENCES "Tooth"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TemplateHistory" ADD CONSTRAINT "TemplateHistory_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "Template"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TemplateHistory" ADD CONSTRAINT "TemplateHistory_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TemplateHistory" ADD CONSTRAINT "TemplateHistory_toothId_fkey" FOREIGN KEY ("toothId") REFERENCES "Tooth"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TemplateHistory" ADD CONSTRAINT "TemplateHistory_receptionId_fkey" FOREIGN KEY ("receptionId") REFERENCES "Reception"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ToothPart" ADD CONSTRAINT "ToothPart_toothId_fkey" FOREIGN KEY ("toothId") REFERENCES "Tooth"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TemplateSelectOption" ADD CONSTRAINT "TemplateSelectOption_templateSelectId_fkey" FOREIGN KEY ("templateSelectId") REFERENCES "TemplateSelect"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Diagnosis" ADD CONSTRAINT "Diagnosis_toothPartId_fkey" FOREIGN KEY ("toothPartId") REFERENCES "ToothPart"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlannedProcedure" ADD CONSTRAINT "PlannedProcedure_toothPartId_fkey" FOREIGN KEY ("toothPartId") REFERENCES "ToothPart"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlannedProcedure" ADD CONSTRAINT "PlannedProcedure_procedureId_fkey" FOREIGN KEY ("procedureId") REFERENCES "Procedure"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlannedProcedure" ADD CONSTRAINT "PlannedProcedure_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlannedProcedure" ADD CONSTRAINT "PlannedProcedure_staffId_fkey" FOREIGN KEY ("staffId") REFERENCES "Staff"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DiseaseHistory" ADD CONSTRAINT "DiseaseHistory_receptionId_fkey" FOREIGN KEY ("receptionId") REFERENCES "Reception"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DiseaseHistory" ADD CONSTRAINT "DiseaseHistory_procedureId_fkey" FOREIGN KEY ("procedureId") REFERENCES "Procedure"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DiseaseHistory" ADD CONSTRAINT "DiseaseHistory_toothPartId_fkey" FOREIGN KEY ("toothPartId") REFERENCES "ToothPart"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TemplateTextHistory" ADD CONSTRAINT "TemplateTextHistory_templateHistoryId_fkey" FOREIGN KEY ("templateHistoryId") REFERENCES "TemplateHistory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TemplateSelectHistory" ADD CONSTRAINT "TemplateSelectHistory_templateSelectId_fkey" FOREIGN KEY ("templateSelectId") REFERENCES "TemplateSelect"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TemplateSelectHistory" ADD CONSTRAINT "TemplateSelectHistory_templateSelectOptionId_fkey" FOREIGN KEY ("templateSelectOptionId") REFERENCES "TemplateSelectOption"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TemplateSelectHistory" ADD CONSTRAINT "TemplateSelectHistory_templateHistoryId_fkey" FOREIGN KEY ("templateHistoryId") REFERENCES "TemplateHistory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
