import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateTemplateHistoryDto {
    @IsString()
    text: string
    
    @IsNotEmpty()
    @IsNumber()
    templateId: number


    @IsNotEmpty()
    @IsNumber()
    patientId: number

    @IsNotEmpty()
    @IsNumber()
    toothId: number

    
}