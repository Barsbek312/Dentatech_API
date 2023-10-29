-- CreateTable
CREATE TABLE "districts" (
    "id" SERIAL NOT NULL,
    "district" TEXT NOT NULL,

    CONSTRAINT "districts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "status" (
    "id" SERIAL NOT NULL,
    "status" TEXT NOT NULL,

    CONSTRAINT "status_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "clinic" (
    "id" SERIAL NOT NULL,
    "clinic" TEXT NOT NULL,

    CONSTRAINT "clinic_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "statusStuff" (
    "id" SERIAL NOT NULL,
    "status" TEXT NOT NULL,

    CONSTRAINT "statusStuff_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "positions" (
    "id" SERIAL NOT NULL,
    "position" TEXT NOT NULL,

    CONSTRAINT "positions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "statusTreatment" (
    "id" SERIAL NOT NULL,
    "status" TEXT NOT NULL,

    CONSTRAINT "statusTreatment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "typeWork" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,

    CONSTRAINT "typeWork_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "jaw" (
    "id" SERIAL NOT NULL,
    "jaw" TEXT NOT NULL,

    CONSTRAINT "jaw_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Consumables" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "price" INTEGER NOT NULL,

    CONSTRAINT "Consumables_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Photo" (
    "id" SERIAL NOT NULL,

    CONSTRAINT "Photo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RowJaw" (
    "id" SERIAL NOT NULL,
    "row" INTEGER NOT NULL,
    "jawId" INTEGER NOT NULL,

    CONSTRAINT "RowJaw_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Patient" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "surname" TEXT NOT NULL,
    "Age" INTEGER NOT NULL,
    "phone" TEXT NOT NULL,
    "districtId" INTEGER NOT NULL,

    CONSTRAINT "Patient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Branch" (
    "id" SERIAL NOT NULL,
    "branch" TEXT NOT NULL,
    "clinicId" INTEGER NOT NULL,

    CONSTRAINT "Branch_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Work" (
    "id" SERIAL NOT NULL,
    "work" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "typeWorkId" INTEGER NOT NULL,

    CONSTRAINT "Work_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Stuff" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "surname" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "gender" BOOLEAN NOT NULL,
    "email" TEXT NOT NULL,
    "hash" TEXT NOT NULL,
    "branchId" INTEGER NOT NULL,
    "statusStuffId" INTEGER NOT NULL,
    "positionId" INTEGER NOT NULL,

    CONSTRAINT "Stuff_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "RowJaw" ADD CONSTRAINT "RowJaw_jawId_fkey" FOREIGN KEY ("jawId") REFERENCES "jaw"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Patient" ADD CONSTRAINT "Patient_districtId_fkey" FOREIGN KEY ("districtId") REFERENCES "districts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Branch" ADD CONSTRAINT "Branch_clinicId_fkey" FOREIGN KEY ("clinicId") REFERENCES "clinic"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Work" ADD CONSTRAINT "Work_typeWorkId_fkey" FOREIGN KEY ("typeWorkId") REFERENCES "typeWork"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Stuff" ADD CONSTRAINT "Stuff_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES "Branch"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Stuff" ADD CONSTRAINT "Stuff_statusStuffId_fkey" FOREIGN KEY ("statusStuffId") REFERENCES "statusStuff"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Stuff" ADD CONSTRAINT "Stuff_positionId_fkey" FOREIGN KEY ("positionId") REFERENCES "positions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
