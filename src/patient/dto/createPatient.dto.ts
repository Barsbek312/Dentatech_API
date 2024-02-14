import { IsEmail, IsNotEmpty, IsOptional } from "class-validator";


export class CreatePatientDto {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    surname: string;

    @IsOptional()
    Age?: number;

    @IsEmail()
    @IsOptional()    
    email?: string;

    @IsOptional()
    phone?: string;

    @IsNotEmpty()
    districtId: number;

    @IsNotEmpty()
    branchId: number;
}