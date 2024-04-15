import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from 'src/guard';
import { ScheduleService } from './schedule.service';
import {
  AddScheduleDto,
  UpdateAdmissionDto,
} from './dto';

@UseGuards(JwtGuard)
@Controller('schedule')
export class ScheduleController {
  constructor(
    private scheduleService: ScheduleService,
  ) {}

  @Patch('updateAdmission/:scheduleId')
  updateAdmission(
    @Param('scheduleId') scheduleId: string,
    @Body() dto: UpdateAdmissionDto,
  ) {
    return this.scheduleService.updateAdmission(
      dto,
      parseInt(scheduleId),
    );
  }

  @Post('addAdmission')
  addAdmission(@Body() dto: AddScheduleDto) {
    return this.scheduleService.addAdmission(dto);
  }

  @Get('getScheduleType')
  getTypeSchedule() {
    return this.scheduleService.getTypeSchedule();
  }

  @Get('get-schedule-status')
  getScheduleStatus() {
    return this.scheduleService.getScheduleStatus();
  }

  @Get(':id')
  getPatients(@Param('id') id: string) {
    return this.scheduleService.getPatientsAndSchedule(
      id,
    );
  }

  @Get('scheduleOfClinic/:clinicId')
  getScheduleOfClinic(
    @Param('clinicId') clinicId: string,
  ) {
    return this.scheduleService.getClinicSchedule(
      clinicId,
    );
  }

  @Delete('delete-reception/:receptionId')
  deleteReception(
    @Param('receptionId') receptionId: string,
  ) {
    return this.scheduleService.deleteReception(
      receptionId,
    );
  }
}
