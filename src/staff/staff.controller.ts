import {
  Controller,
  Get,
  Param,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from 'src/guard';
import { StaffService } from './staff.service';

@UseGuards(JwtGuard)
@Controller('staff')
export class StaffController {
  constructor(
    private staffService: StaffService,
  ) {}

  @Get(`get-staff-profile/:staffId`)
  getStaffProfile(
    @Param('staffId') staffId: string,
  ) {
    return this.staffService.getStaffProfile(
      staffId,
    );
  }
}
