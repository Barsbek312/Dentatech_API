-- CreateTable
CREATE TABLE "TemplateCheckboxOption" (
    "id" SERIAL NOT NULL,
    "option" TEXT NOT NULL,
    "templateCheckboxId" INTEGER NOT NULL,

    CONSTRAINT "TemplateCheckboxOption_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TemplateInputHistory" (
    "id" SERIAL NOT NULL,
    "value" TEXT NOT NULL,
    "date" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "templateInputId" INTEGER NOT NULL,
    "templateHistoryId" INTEGER NOT NULL,

    CONSTRAINT "TemplateInputHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TemplateCheckboxHistory" (
    "id" SERIAL NOT NULL,
    "templateCheckboxId" INTEGER NOT NULL,
    "templateHistoryId" INTEGER NOT NULL,

    CONSTRAINT "TemplateCheckboxHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TemplateCheckboxOptionHistory" (
    "id" SERIAL NOT NULL,
    "templateCheckboxHistoryId" INTEGER NOT NULL,
    "templateCheckboxOptionId" INTEGER NOT NULL,

    CONSTRAINT "TemplateCheckboxOptionHistory_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TemplateCheckboxOption" ADD CONSTRAINT "TemplateCheckboxOption_templateCheckboxId_fkey" FOREIGN KEY ("templateCheckboxId") REFERENCES "TemplateCheckbox"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TemplateInputHistory" ADD CONSTRAINT "TemplateInputHistory_templateInputId_fkey" FOREIGN KEY ("templateInputId") REFERENCES "TemplateInput"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TemplateInputHistory" ADD CONSTRAINT "TemplateInputHistory_templateHistoryId_fkey" FOREIGN KEY ("templateHistoryId") REFERENCES "TemplateHistory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TemplateCheckboxHistory" ADD CONSTRAINT "TemplateCheckboxHistory_templateCheckboxId_fkey" FOREIGN KEY ("templateCheckboxId") REFERENCES "TemplateCheckbox"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TemplateCheckboxHistory" ADD CONSTRAINT "TemplateCheckboxHistory_templateHistoryId_fkey" FOREIGN KEY ("templateHistoryId") REFERENCES "TemplateHistory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TemplateCheckboxOptionHistory" ADD CONSTRAINT "TemplateCheckboxOptionHistory_templateCheckboxHistoryId_fkey" FOREIGN KEY ("templateCheckboxHistoryId") REFERENCES "TemplateCheckboxHistory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TemplateCheckboxOptionHistory" ADD CONSTRAINT "TemplateCheckboxOptionHistory_templateCheckboxOptionId_fkey" FOREIGN KEY ("templateCheckboxOptionId") REFERENCES "TemplateCheckboxOption"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
