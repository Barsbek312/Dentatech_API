-- DropForeignKey
ALTER TABLE "TemplateCheckboxHistory" DROP CONSTRAINT "TemplateCheckboxHistory_templateHistoryId_fkey";

-- DropForeignKey
ALTER TABLE "TemplateCheckboxOptionHistory" DROP CONSTRAINT "TemplateCheckboxOptionHistory_templateCheckboxHistoryId_fkey";

-- DropForeignKey
ALTER TABLE "TemplateInputHistory" DROP CONSTRAINT "TemplateInputHistory_templateHistoryId_fkey";

-- DropForeignKey
ALTER TABLE "TemplateSelectHistory" DROP CONSTRAINT "TemplateSelectHistory_templateHistoryId_fkey";

-- DropForeignKey
ALTER TABLE "TemplateTextHistory" DROP CONSTRAINT "TemplateTextHistory_templateHistoryId_fkey";

-- AddForeignKey
ALTER TABLE "TemplateTextHistory" ADD CONSTRAINT "TemplateTextHistory_templateHistoryId_fkey" FOREIGN KEY ("templateHistoryId") REFERENCES "TemplateHistory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TemplateInputHistory" ADD CONSTRAINT "TemplateInputHistory_templateHistoryId_fkey" FOREIGN KEY ("templateHistoryId") REFERENCES "TemplateHistory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TemplateCheckboxHistory" ADD CONSTRAINT "TemplateCheckboxHistory_templateHistoryId_fkey" FOREIGN KEY ("templateHistoryId") REFERENCES "TemplateHistory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TemplateSelectHistory" ADD CONSTRAINT "TemplateSelectHistory_templateHistoryId_fkey" FOREIGN KEY ("templateHistoryId") REFERENCES "TemplateHistory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TemplateCheckboxOptionHistory" ADD CONSTRAINT "TemplateCheckboxOptionHistory_templateCheckboxHistoryId_fkey" FOREIGN KEY ("templateCheckboxHistoryId") REFERENCES "TemplateCheckboxHistory"("id") ON DELETE CASCADE ON UPDATE CASCADE;
