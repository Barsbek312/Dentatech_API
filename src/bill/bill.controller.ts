import {
  Controller,
  Get,
  Param,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from 'src/guard';
import { BillService } from './bill.service';

@UseGuards(JwtGuard)
@Controller('bill')
export class BillController {
  constructor(private billService: BillService) {}

  @Get('get-patient-bill/:patientId')
  getPatientBill(
    @Param('patientId') patientId: string,
  ) {
    return this.billService.getPatientBill(
      patientId,
    );
  }
}
