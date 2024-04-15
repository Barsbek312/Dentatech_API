import { Module } from "@nestjs/common";
import { ClinicService } from "./clinic.service";
import { PrismaModule } from "src/prisma/prisma.module";
import { ClinicController } from "./clinic.controller";


@Module({
    imports: [PrismaModule],
    providers: [ClinicService],
    exports: [ClinicService],
    controllers: [ClinicController]
})

export class ClinicModule {}