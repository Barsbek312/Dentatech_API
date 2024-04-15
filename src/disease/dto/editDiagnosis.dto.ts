import { IsNotEmpty, IsNumber } from "class-validator";

export class EditDiagnosisDto {
    @IsNotEmpty()
    @IsNumber()
    diseaseId: number;

    @IsNotEmpty()
    @IsNumber()
    staffId: number;
}