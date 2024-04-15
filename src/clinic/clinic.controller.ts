import { Controller, Get, Param, UseGuards } from "@nestjs/common";
import { JwtGuard } from "src/guard";
import { ClinicService } from "./clinic.service";

@UseGuards(JwtGuard)
@Controller('clinic')
export class ClinicController {
    constructor(private clinicService: ClinicService) {}

    @Get("personal/:clinicId")
    getPersonal(@Param('clinicId') clinicId: string) {
        return this.clinicService.getPersonalOfClinic(clinicId);
    }
}