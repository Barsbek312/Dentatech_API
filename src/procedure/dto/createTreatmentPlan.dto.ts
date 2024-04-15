import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
} from 'class-validator';

export class CreateTreatmentPlanDto {
  @IsNotEmpty()
  @IsArray()
  @IsNumber({}, { each: true })
  toothPartConnectId: number[];

  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  procedureId?: number[];

  @IsOptional()
  @IsNumber()
  diseaseId?: number;

  @IsNotEmpty()
  @IsNumber()
  patientId: number;

  @IsNotEmpty()
  @IsNumber()
  staffId: number;
}
