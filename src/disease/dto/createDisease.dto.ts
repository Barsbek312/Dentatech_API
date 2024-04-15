import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateDiseaseDto {
    @IsNotEmpty()
    disease: string;

    @IsNotEmpty()
    @IsNumber()
    clinicId: number;
}