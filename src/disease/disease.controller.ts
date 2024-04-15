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
import { DiseaseService } from './disease.service';
import { CreateDiseaseDto } from './dto/createDisease.dto';
import { EditDiagnosisDto } from './dto/editDiagnosis.dto';

@UseGuards(JwtGuard)
@Controller('disease')
export class DiseaseController {
  constructor(
    private diseaseService: DiseaseService,
  ) {}

  @Get('get-disease/:clinicId')
  getDisease(
    @Param('clinicId') clinidId: string,
  ) {
    return this.diseaseService.getDisease(
      clinidId,
    );
  }

  @Post('create-disease')
  createDisease(
    @Body() createDiseaseDto: CreateDiseaseDto,
  ) {
    return this.diseaseService.createDisease(
      createDiseaseDto,
    );
  }

  @Patch('edit-diagnosis/:diagnosisId')
  editDiagnosis(
    @Param('diagnosisId') diagnosisId: string,
    @Body() editDiagnosisDto: EditDiagnosisDto,
  ) {
    return this.diseaseService.editDiagnosis(
      editDiagnosisDto,
      diagnosisId,
    );
  }

  @Delete('delete-diagnosis/:diagnosisId')
  deleteDiagnosis(
    @Param('diagnosisId') diagnosisId: string,
  ) {
    return this.diseaseService.deleteDiagnosis(
      diagnosisId,
    );
  }
}
