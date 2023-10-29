import { Module } from "@nestjs/common";
import { ClinicService } from "./clinic.service";
import { PrismaModule } from "src/prisma/prisma.module";


@Module({
    imports: [PrismaModule],
    providers: [ClinicService],
    exports: [ClinicService]
})

export class ClinicModule {}