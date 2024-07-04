import {
  Controller,
  Get,
  Param,
  UseGuards,
} from '@nestjs/common';
import { DiseaseHistoryService } from './disease-history.service';
import { JwtGuard } from 'src/guard';

@UseGuards(JwtGuard)
@Controller('disease-history')
export class DiseaseHistoryController {
  constructor(
    private diseaseHistoryService: DiseaseHistoryService,
  ) {}

  @Get('get-disease-history/:patientId/:toothId')
  getDiseaseHistory(
    @Param('patientId') patientId: string,
    @Param('toothId') toothId: string,
  ) {
    return this.diseaseHistoryService.getDiseaseHistoryByToothAndPatient(
      patientId,
      toothId,
    );
  }

  @Get('get-disease-history-of-reception/:receptionId') 
  getDiseaseHistoryOfReception(@Param('receptionId') receptionId: string) {
    return this.diseaseHistoryService.getDiseaseHistoryByReception(receptionId);
  }
}
