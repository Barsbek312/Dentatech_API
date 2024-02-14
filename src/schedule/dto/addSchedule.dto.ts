import { IsNotEmpty, IsOptional } from "class-validator";

export class AddScheduleDto {
    @IsOptional()
    title?: string

    @IsNotEmpty()
    start: string

    @IsNotEmpty()
    end: string 

    @IsOptional()
    description?: string 

    @IsNotEmpty()
    isCanceled: boolean

    @IsNotEmpty()
    backgroundColor: string 

    @IsNotEmpty()
    patientId: number

    @IsNotEmpty()
    statusId: number 

    @IsNotEmpty()
    staffId: number
}