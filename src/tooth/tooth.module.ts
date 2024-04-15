import { Module } from "@nestjs/common";
import { PrismaModule } from "src/prisma/prisma.module";
import { ToothService } from "./tooth.service";
import { ToothController } from "./tooth.controller";

@Module({
    imports: [PrismaModule],
    providers: [ToothService],
    controllers: [ToothController]
})
export class ToothModule {}