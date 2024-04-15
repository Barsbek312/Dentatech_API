import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { DiseaseHistoryService } from './disease-history.service';
import { DiseaseHistoryController } from './disease-history.controller';

@Module({
  imports: [PrismaModule],
  providers: [DiseaseHistoryService],
  controllers: [DiseaseHistoryController],
})
export class DiseaseHistoryModule {}
