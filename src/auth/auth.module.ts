import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { PrismaModule } from "./../prisma/prisma.module";
import { JwtModule } from "@nestjs/jwt";
import { JwtStrategy } from "./strategy";
import { ClinicModule } from "src/clinic/clinic.module";
import { BranchModule } from "src/branch/branch.module";
import { MailerModule, MailerService } from "@nestjs-modules/mailer";


@Module({
    imports: [PrismaModule, JwtModule.register({}), ClinicModule, BranchModule, MailerModule.forRoot({
        transport: {
          host: 'smtp.gmail.com',
          port: 465,
          secure: true,
          auth: {
            user: "dentatech16@gmail.com",
            pass: "udgk cbbj iqmf zvgu"
          },
        },
        defaults: {
          from: '"nest-modules" <modules@nestjs.com>',
        },
      }),],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy],
    
})
 
export class AuthModule {}