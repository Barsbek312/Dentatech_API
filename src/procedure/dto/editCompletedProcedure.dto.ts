import { IsNotEmpty, IsNumber } from "class-validator";

export class EditCompletedProcedureDto {
    @IsNotEmpty()
    @IsNumber()
    procedureId: number;   
}