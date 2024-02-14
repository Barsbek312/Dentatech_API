import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { ClinicModule } from './clinic/clinic.module';
import { BranchModule } from './branch/branch.module';
import { ScheduleModule } from './schedule/schedule.module';
import { PatientModule } from './patient/patient.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    AuthModule,
    UserModule,
    PrismaModule,
    ClinicModule,
    BranchModule,
    ScheduleModule,
    PatientModule,
  ]
})

export class AppModule {}
