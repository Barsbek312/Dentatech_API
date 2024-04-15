import { Controller, Get, Param, UseGuards } from "@nestjs/common";
import { JwtGuard } from "src/guard";
import { ToothService } from "./tooth.service";

@UseGuards(JwtGuard)
@Controller('tooth')
export class ToothController {
    constructor(private toothService: ToothService) {}

    @Get('tooth-status/:patientId')
    getToothStatus(@Param('patientId') patientId: string) {
        return this.toothService.getPatientToothStatus(patientId)
    }
}