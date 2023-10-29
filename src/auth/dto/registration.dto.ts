import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator"

export class RegistrationDto {
    @IsEmail()
    @IsNotEmpty()
    @MinLength(6)
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    surname: string;

    @IsNotEmpty()
    phone: string;

    @IsNotEmpty()
    gender: boolean;

    @IsNotEmpty()
    clinic: string;

    @IsNotEmpty()
    branch: string;

    @IsNotEmpty()
    positionId: number

}