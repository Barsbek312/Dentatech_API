-- DropForeignKey
ALTER TABLE "TemplateHistory" DROP CONSTRAINT "TemplateHistory_receptionId_fkey";

-- AddForeignKey
ALTER TABLE "TemplateHistory" ADD CONSTRAINT "TemplateHistory_receptionId_fkey" FOREIGN KEY ("receptionId") REFERENCES "Reception"("id") ON DELETE CASCADE ON UPDATE CASCADE;
