import { Module } from "@nestjs/common";
import { PrismaModule } from "src/prisma/prisma.module";
import { PatientService } from "./patient.service";
import { PatientController } from "./patient.controller";


@Module({
    imports: [PrismaModule],
    providers: [PatientService],
    controllers: [PatientController]
})
export class PatientModule {}