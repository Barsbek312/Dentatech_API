import { IsNotEmpty, IsOptional } from "class-validator";

export class AddScheduleDto {
    @IsNotEmpty()
    start: string

    @IsNotEmpty()
    end: string 

    @IsOptional()
    description?: string 

    @IsNotEmpty()
    backgroundColor: string 

    @IsNotEmpty()
    patientId: number 

    @IsNotEmpty()
    receptionTypeId: number

    @IsNotEmpty()
    attendingStaffId: number

    @IsNotEmpty()
    referringStaffId: number
}