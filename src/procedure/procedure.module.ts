import { Module } from "@nestjs/common";
import { PrismaModule } from "src/prisma/prisma.module";
import { ProcedureService } from "./procedure.service";
import { ProcedureController } from "./procedure.controller";

@Module({
    imports: [PrismaModule],
    controllers: [ProcedureController],
    providers: [ProcedureService]
})
export class ProcedureModule {}