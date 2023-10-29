import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "./../prisma/prisma.service";
import { LoginDto, RegistrationDto } from "./dto";
import * as argon from "argon2"
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { ClinicService } from "src/clinic/clinic.service";
import { BranchService } from "src/branch/branch.service";

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService, 
        private jwt: JwtService, 
        private config: ConfigService,
        private clinic: ClinicService,
        private branch: BranchService) {}
    
    async signup(dto: RegistrationDto) {
        // generate the password hash
        const hash = await argon.hash(dto.password);

        // save the new user in the db
        try {
            const clinicId = await this.clinic.createClinic(dto.clinic);

            const branchId = await this.branch.createBranch(clinicId, dto.branch);

            const user = await this.prisma.staff.create({
                data: {
                    name: dto.name,
                    surname: dto.surname,
                    phone: dto.phone,
                    gender: dto.gender,
                    email: dto.email,
                    branchId,
                    positionId: dto.positionId, 
                    hash,
                }
            })
    
            return this.signToken(user.id, user.email);

        } catch(error) {
            if(error instanceof PrismaClientKnownRequestError) {
                if(error.code === "P2002") {
                    throw new ForbiddenException(
                        'Credentials taken',
                    )
                }
            }
            throw error;
        }
    }

    async signin(dto: LoginDto) {

        // find the user by email
        const user = await this.prisma.staff.findUnique({
            where: {
                email: dto.email,
            }
        })

        // if user does not exist throw exception
        if(!user) throw new ForbiddenException("Credentials incorrect")

        // compare password
        const pwMathces = await argon.verify(user.hash, dto.password)

        // if password incorrect throw exception
        if(!pwMathces) 
            throw new ForbiddenException("Credentials incorrect")

        // send back the user
        return this.signToken(user.id, user.email);
    }

    async signToken(userId: number, email: string): Promise<{access_token: string}> {
        const payload = {
            sub: userId,
            email
        }

        const secret = this.config.get("JWT_SECRET")

        const token = await this.jwt.signAsync(payload, {
            expiresIn: '2d',
            secret: secret,
        })

        return {
            access_token: token,
        }
    }
}