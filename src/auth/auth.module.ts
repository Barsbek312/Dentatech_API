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
    imports: [PrismaModule, JwtModule.register({}), ClinicModule, BranchModule, MailerModule],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy, MailerService],
    
})
 
export class AuthModule {}