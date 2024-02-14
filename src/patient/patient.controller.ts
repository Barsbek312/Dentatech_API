import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from 'src/guard';
import { PatientService } from './patient.service';
import { CreatePatientDto } from './dto';

@UseGuards(JwtGuard)
@Controller('patient')
export class PatientController {
  constructor(
    private patientService: PatientService,
  ) {}

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
}
