import { Module } from "@nestjs/common";
import { PrismaModule } from "src/prisma/prisma.module";
import { DiseaseController } from "./disease.controller";
import { DiseaseService } from "./disease.service";

@Module({
    imports: [PrismaModule],
    controllers: [DiseaseController],
    providers: [DiseaseService]
})
export class DiseaseModule {}