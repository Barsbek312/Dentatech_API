import { Module } from "@nestjs/common";
import { BranchService } from "./branch.service";
import { PrismaModule } from "src/prisma/prisma.module";
import { BranchController } from "./branch.controller";


@Module({
    imports: [PrismaModule],
    providers: [BranchService],
    exports: [BranchService],
    controllers: [BranchController]
})
export class BranchModule {}