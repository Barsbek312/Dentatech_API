import {
  Body,
  Controller,
  Get,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { Staff } from '@prisma/client';
import { GetUser } from './../auth/decorator';
import { JwtGuard } from './../guard';
import { BranchService } from 'src/branch/branch.service';

@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
  constructor(
    private readonly branchService: BranchService,
  ) {}

  @Get('me')
  async getMe(
    @GetUser() user: Staff,
    @GetUser('email') email: Staff,
  ) {
    const branch =
      await this.branchService.findById(
        user?.branchId,
      );
    const enhancedUser = {
      ...user,
      clinicId: branch?.clinicId
    };

    return enhancedUser;
  }

  @Patch()
  editUser() {}
}
