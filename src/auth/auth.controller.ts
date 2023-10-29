import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginDto, RegistrationDto } from "./dto";


@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {

    }

    @Post('signup')
    signup(@Body() dto: RegistrationDto) {
        return this.authService.signup(dto);
    }
    
    @HttpCode(HttpStatus.OK)
    @Post('signin')
    signin(@Body() dto: LoginDto) {
        return this.authService.signin(dto);
    }

}