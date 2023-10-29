import { Module } from "@nestjs/common";
import { BranchService } from "./branch.service";
import { PrismaModule } from "src/prisma/prisma.module";


@Module({
    imports: [PrismaModule],
    providers: [BranchService],
    exports: [BranchService],
    controllers: []
})
export class BranchModule {}