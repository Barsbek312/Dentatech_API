import { IsEmail, IsOptional } from "class-validator";

export class UpdatePatientDto {
    @IsOptional()
    name?: string;

    @IsOptional()
    surname?: string;

    @IsOptional()
    isMale?: boolean;

    @IsOptional()
    patronymic?: string

    @IsOptional()
    birthDate?: string

    @IsOptional()
    phone?: string;

    @IsOptional()
    cityId?: number;

    @IsOptional()
    street?: string;

    @IsOptional()
    where?: string;

    @IsOptional()
    description?: string;

    @IsEmail()
    @IsOptional()    
    email?: string;

    @IsOptional()
    districtId?: number;

    @IsOptional()
    clinicId?: number;

    @IsOptional()
    patientTypeId?: number;

    @IsOptional()
    patientStatusId?: number;
}