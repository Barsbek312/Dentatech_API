import { IsEmail, IsNotEmpty, IsOptional } from "class-validator";


export class CreatePatientDto {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    surname: string;

    @IsNotEmpty()
    isMale: boolean;

    @IsOptional()
    patronymic?: string

    @IsNotEmpty()
    birthDate: string

    @IsOptional()
    phone?: string;

    @IsOptional()
    cityId?: number;

    @IsOptional()
    street?: string;

    @IsOptional()
    where?: string;

    @IsEmail()
    @IsOptional()    
    email?: string;

    @IsNotEmpty()
    districtId: number;

    @IsNotEmpty()
    clinicId: number;

    @IsNotEmpty()
    patientTypeId: number;

    @IsNotEmpty()
    patientStatusId: number;
}