import { IsOptional } from "class-validator";

export class UpdateAdmissionDto {
    @IsOptional()
    start?: string

    @IsOptional()
    end?: string 

    @IsOptional()
    description?: string 

    @IsOptional()
    receptionStatusId?: number

    @IsOptional()
    receptionTypeId?: number

    @IsOptional()
    backgroundColor?: string 

    @IsOptional()
    patientId?: number

    @IsOptional()
    attendingStaffId?: number

    @IsOptional()
    referringStaffId?: number
}
