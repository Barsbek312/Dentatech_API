import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { BillService } from './bill.service';
import { BillController } from './bill.controller';

@Module({
  imports: [PrismaModule],
  providers: [BillService],
  controllers: [BillController],
})
export class BillModule {}
