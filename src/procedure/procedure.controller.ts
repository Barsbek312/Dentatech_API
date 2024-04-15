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
import { ProcedureService } from './procedure.service';
import { CreateProcedureDto } from './dto/createProcedure.dto';
import { CreateTreatmentPlanDto } from './dto/createTreatmentPlan.dto';
import { EditPlannedProcedureDto } from './dto/editPlannedProcedure.dto';
import { CreateCompletedProcedureDto } from './dto/createCompletedProcedure.dto';
import { EditCompletedProcedureDto } from './dto/editCompletedProcedure.dto';

@UseGuards(JwtGuard)
@Controller('procedure')
export class ProcedureController {
  constructor(
    private procedureService: ProcedureService,
  ) {}

  @Get('get-procedure-type')
  getProcedureType() {
    return this.procedureService.getProcedureType();
  }

  @Get('get-all-procedure/:clinicId')
  getAllProcedure(
    @Param('clinicId') clinicId: string,
  ) {
    return this.procedureService.getProcedure(
      clinicId,
    );
  }

  @Post('create-procedure')
  createProcedure(
    @Body() dto: CreateProcedureDto,
  ) {
    return this.procedureService.createProcedure(
      dto,
    );
  }

  @Patch(
    'edit-planned-procedure/:plannedProcedureId',
  )
  editPlannedProcedure(
    @Param('plannedProcedureId')
    plannedProcedureId,
    @Body() dto: EditPlannedProcedureDto,
  ) {
    return this.procedureService.editPlannedProcedure(
      dto,
      plannedProcedureId,
    );
  }

  @Delete(
    'delete-planned-procedure/:plannedProcedureId',
  )
  deletePlannedProcedure(
    @Param('plannedProcedureId')
    plannedProcedureId,
  ) {
    return this.procedureService.deletePlannedProcedure(
      plannedProcedureId,
    );
  }

  @Post('create-completed-procedure')
  createCompletedProcedure(
    @Body() dto: CreateCompletedProcedureDto,
  ) {
    return this.procedureService.createCompletedProcedure(
      dto,
    );
  }

  @Patch(
    `edit-completed-procedure/:diseaseHistoryId`,
  )
  editCompletedProcedure(
    @Param('diseaseHistoryId')
    diseaseHistoryId: string,
    @Body() dto: EditCompletedProcedureDto,
  ) {
    return this.procedureService.editCompletedProcedure(
      diseaseHistoryId,
      dto,
    );
  }

  @Delete(
    'delete-completed-procedure/:diseaseHistoryId',
  )
  deleteCompletedProcedure(
    @Param('diseaseHistoryId')
    diseaseHistoryId: string,
  ) {
    return this.procedureService.deleteCompletedProcedure(
      diseaseHistoryId,
    );
  }

  @Get(
    'get-completed-procedure/:receptionId/:toothId',
  )
  getCompletedProcedure(
    @Param('receptionId') receptionId: string,
    @Param('toothId') toothId: string,
  ) {
    return this.procedureService.getCompletedProcedure(
      receptionId,
      toothId,
    );
  }

  @Post('create-treatment-plan')
  createTreatmentPlan(
    @Body() dto: CreateTreatmentPlanDto,
  ) {
    return this.procedureService.createTreatmentPlan(
      dto,
    );
  }

  @Get('get-treatment-plan/:patientId/:toothId')
  getTreatmentPlanByPatientId(
    @Param('patientId') patientId: string,
    @Param('toothId') toothId: string,
  ) {
    return this.procedureService.getPatientTreatmentPlan(
      patientId,
      toothId,
    );
  }
}
