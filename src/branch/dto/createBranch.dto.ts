import {
  IsNotEmpty,
  IsNumber,
} from 'class-validator';

export class CreateBranchDto {
  @IsNotEmpty()
  branch: string;

  @IsNotEmpty()
  street: string;

  @IsNotEmpty()
  @IsNumber()
  clinicId: number;

  @IsNotEmpty()
  @IsNumber()
  cityId: number;
}
