import { Body, Controller, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { JwtGuard } from "src/guard";
import { ScheduleService } from "./schedule.service";
import { AddScheduleDto, UpdateAdmissionDto } from "./dto";

@UseGuards(JwtGuard)
@Controller("schedule")
export class ScheduleController {

    constructor(private scheduleService: ScheduleService) {}

    @Patch("updateAdmission/:scheduleId")
    updateAdmission(@Param('scheduleId') scheduleId: string,
                    @Body() dto: UpdateAdmissionDto) {
        return this.scheduleService.updateAdmission(dto, parseInt(scheduleId));
    }

    @Post("addAdmission")
    addAdmission(@Body() dto: AddScheduleDto) {
        return this.scheduleService.addAdmission(dto);
    }

    @Get('getStatus')
    getStatusSchedule() {
        return this.scheduleService.getStatusSchedule();
    }

    @Get(':id')
    getPatients(@Param('id') id: string) {
        return this.scheduleService.getPatientsAndSchedule(id);
    }
}