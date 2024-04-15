import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateProcedureDto {
  @IsNotEmpty()
  @IsString()
  procedure: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsNotEmpty()
  @IsNumber()
  procedureTypeId: number;

  @IsNotEmpty()
  @IsNumber()
  clinicId: number;
}
