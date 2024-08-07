import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { ClinicModule } from './clinic/clinic.module';
import { BranchModule } from './branch/branch.module';
import { ScheduleModule } from './schedule/schedule.module';
import { PatientModule } from './patient/patient.module';
import { CityModule } from './city/city.module';
import { ToothModule } from './tooth/tooth.module';
import { DiseaseModule } from './disease/disease.module';
import { ProcedureModule } from './procedure/procedure.module';
import { BillModule } from './bill/bill.module';
import { DiseaseHistoryModule } from './disease-history/disease-history.module';
import { StaffModule } from './staff/staff.module';
import { TemplateModule } from './template/template.module';


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
    CityModule,
    ToothModule,
    DiseaseModule,
    ProcedureModule,
    BillModule,
    DiseaseHistoryModule,
    StaffModule,
    TemplateModule,
  ],
})
export class AppModule {}
