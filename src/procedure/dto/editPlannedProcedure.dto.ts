import { IsNotEmpty, IsNumber } from "class-validator";

export class EditPlannedProcedureDto {
    @IsNotEmpty()
    @IsNumber()
    procedureId: number;

    @IsNotEmpty()
    @IsNumber()
    staffId: number;
}