import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { Staff } from '@prisma/client';
import { GetUser } from './../auth/decorator';
import { JwtGuard } from './../guard';

@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
    @Get('me')
    getMe(@GetUser() user: Staff,
        @GetUser("email") email: Staff) {
        console.log({
            email,
        })
        return user;
    }

    @Patch()
    editUser() {
        
    }

}
