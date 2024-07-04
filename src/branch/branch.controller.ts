import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { BranchService } from "./branch.service";
import { CreateBranchDto } from "./dto/createBranch.dto";
import { JwtGuard } from "src/guard";


@Controller('branch')
export class BranchController {

    constructor(private branchService: BranchService) {}

    @Get('getBranches/:clinicId')
    getBranches(@Param("clinicId") clinicId: string) {
        return this.branchService.getBranches(clinicId);
    }

    @UseGuards(JwtGuard)
    @Post('create-branch')
    createBranch(@Body() dto: CreateBranchDto) {
        return this.branchService.createBranch(dto.clinicId, dto.branch, dto.cityId, dto.street);
    }
}