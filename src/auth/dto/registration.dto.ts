import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class RegistrationDto {
  @IsEmail()
  @IsNotEmpty()
  @MinLength(6)
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  surname: string;

  @IsNotEmpty()
  phone: string;

  @IsNotEmpty()
  isMale: boolean;

  @IsNotEmpty()
  birthDate: string;

  @IsNotEmpty()
  isAdmin: boolean;

  @IsNotEmpty()
  @IsOptional()
  clinic?: string;

  @IsOptional()
  branch?: string;

  @IsOptional()
  branchId: number;

  @IsOptional()
  cityId?: number;

  @IsOptional()
  street?: string;

  @IsNotEmpty()
  staffPositionId: number;

  @IsNotEmpty()
  staffStatusId: number;
}
