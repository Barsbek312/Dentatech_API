import { Controller, Get, Param } from "@nestjs/common";
import { BranchService } from "./branch.service";


@Controller('branch')
export class BranchController {

    constructor(private branchService: BranchService) {}

    @Get('getBranches/:branchId')
    getBranches(@Param("branchId") branchId: string) {
        return this.branchService.getBranches(branchId);
    }
}