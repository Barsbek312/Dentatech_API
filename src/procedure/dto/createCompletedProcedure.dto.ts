import {
    IsArray,
  IsNotEmpty,
  IsNumber,
} from 'class-validator';

export class CreateCompletedProcedureDto {
  @IsNotEmpty()
  @IsNumber()
  receptionId: number;

  @IsNotEmpty()
  @IsArray()
  @IsNumber({}, { each: true })
  procedureId: number[];

  @IsNotEmpty()
  @IsArray()
  @IsNumber({}, { each: true })
  toothPartConnectId: number[];
}
