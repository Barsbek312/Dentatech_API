import { IsOptional } from "class-validator";

export class UpdateAdmissionDto {
    @IsOptional()
    title?: string

    @IsOptional()
    start?: string

    @IsOptional()
    end?: string 

    @IsOptional()
    description?: string 

    @IsOptional()
    isCanceled?: boolean

    @IsOptional()
    backgroundColor?: string 

    @IsOptional()
    patientId?: number

    @IsOptional()
    statusId?: number 

    @IsOptional()
    staffId?: number
}
