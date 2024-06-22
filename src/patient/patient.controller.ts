import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from 'src/guard';
import { PatientService } from './patient.service';
import { CreatePatientDto } from './dto';
import { UpdatePatientDto } from './dto/updatePatient.dto';

@UseGuards(JwtGuard)
@Controller('patient')
export class PatientController {
  constructor(
    private patientService: PatientService,
  ) {}

  @Get('get-patient-schedule/:patientId')
  getPatientSchedule(
    @Param('patientId') patientId: string,
  ) {
    return this.patientService.getPatientSchedule(
      patientId,
    );
  }

  @Get('district')
  getDistrict() {
    return this.patientService.getDistrict();
  }

  @Post('createPatient')
  createPatient(@Body() dto: CreatePatientDto) {
    return this.patientService.createPatient(dto);
  }

  @Get('getPatient/:id')
  async getPatient(@Param('id') id: string) {
    return this.patientService.getPatient(id);
  }

  @Get('getOnePatient/:id')
  async getOnePatien(@Param('id') id: string) {
    return this.patientService.getOnePatient(id);
  }

  @Get('getPatientStatus')
  async getPatientStatus() {
    return this.patientService.getPatientStatus();
  }

  @Get('getPatientType')
  async getPatientType() {
    return this.patientService.getPatientType();
  }

  @Patch('updatePatient/:id')
  async updatePatient(
    @Param('id') id: string,
    @Body() dto: UpdatePatientDto,
  ) {
    return this.patientService.updatePatient(
      parseInt(id),
      dto,
    );
  }

  @Get('get-staff-patient-list/:id')
  async getStaffPatientList(@Param('id') dentistId: string) {
    return this.patientService.getStaffPatientList(dentistId);
  }
}
