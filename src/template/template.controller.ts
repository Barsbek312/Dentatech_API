import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from 'src/guard';
import { TemplateService } from './template.service';
import { CreateTemplateHistoryDto } from './dto/createTemplateHistory.dto';

@UseGuards(JwtGuard)
@Controller('template')
export class TemplateController {
  constructor(
    private templateService: TemplateService,
  ) {}

  @Get(
    `get-patient-tooth-template-history/:patientId/:toothId`,
  )
  getPatientToothTemplateHistory(
    @Param('patientId') patientId: string,
    @Param('toothId') toothId: string,
  ) {
    return this.templateService.getPatientToothTemplateHistory(
      patientId,
      toothId,
    );
  }

  @Get(`get-template-type`)
  getTemplateType() {
    return this.templateService.getTemplateType();
  }

  @Get(
    `get-template-list-by-type/:templateTypeId`,
  )
  getTemplateListByType(
    @Param('templateTypeId')
    templateTypeId: string,
  ) {
    return this.templateService.getTemplateListByType(
      templateTypeId,
    );
  }

  @Post(`create-template-history`)
  createTemplateHistory(
    @Body() dto: CreateTemplateHistoryDto,
  ) {
    return this.templateService.createTemplateHistory(
      dto,
    );
  }
}
