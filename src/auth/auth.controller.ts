import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RegistrationDto } from './dto';
import { JwtGuard } from 'src/guard';
import { ChangePasswordDto } from './dto/changePasswordDto.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signup(@Body() dto: RegistrationDto) {
    return this.authService.signup(dto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('signin')
  signin(@Body() dto: LoginDto) {
    return this.authService.signin(dto);
  }

  @Post('verify-email')
  async verifyEmail(
    @Body('token') token: string,
  ) {
    return this.authService.verifyEmail(token);
  }

  @Get('positions')
  async getPositions() {
    return this.authService.getPositions();
  }

  @Post('change-password/:staffId')
  @UseGuards(JwtGuard)
  async changePassword(
    @Param('staffId') staffId: string,
    @Body() changePasswordDto: ChangePasswordDto,
  ) {
    return this.authService.changePassword(
      staffId,
      changePasswordDto,
    );
  }
}
