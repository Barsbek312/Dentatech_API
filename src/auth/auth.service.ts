import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "./../prisma/prisma.service";
import { LoginDto, RegistrationDto } from "./dto";
import * as argon from "argon2"
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { ClinicService } from "src/clinic/clinic.service";
import { BranchService } from "src/branch/branch.service";
import { randomBytes } from "crypto";
import { MailerService } from "@nestjs-modules/mailer";


@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService,
        private jwt: JwtService,
        private config: ConfigService,
        private clinic: ClinicService,
        private branch: BranchService,
        private readonly mailerService: MailerService) { }

    async sendVerificationEmail(email: string, token: string) {
        const url = `http://localhost:3000/verify-email?token=${token}?email=${email}`;

        await this.mailerService.sendMail({
            to: email,
            subject: 'Подтверждение регистрации на платформе Dentatech',
            text: `Здравствуйте!

              Благодарим вас за регистрацию на платформе Dentatech. Мы рады приветствовать вас в нашем сообществе!
              
              Для завершения регистрации и активации вашего аккаунта, пожалуйста, подтвердите свою электронную почту, перейдя по следующей ссылке: ${url}
              
              Если вы не регистрировались на платформе Dentatech, проигнорируйте это письмо.
              
              С уважением, команда Dentatech`,
            context: {
                url: url
            },
        });
    }

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
                    isMale: dto.isMale,
                    email: dto.email,
                    branchId,
                    positionId: dto.positionId,
                    isAdmin: dto.isAdmin,
                    hash,
                }
            })

            const verificationToken = this.generateVerificationToken();

            const tokenExpirationDate = new Date();
            tokenExpirationDate.setHours(tokenExpirationDate.getHours() + 24); // Устанавливаем срок действия токена на 24 часа

            await this.prisma.staff.update({
                where: { email: dto.email },
                data: {
                    emailVerificationToken: verificationToken,
                    tokenExpirationDate: tokenExpirationDate
                }
            });

            await this.sendVerificationEmail(dto.email, verificationToken);

            return this.signToken(user.id, user.email);

        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === "P2002") {
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
        if (!user) throw new ForbiddenException("Credentials incorrect")

        // Check if the email is verified
        if (!user.isEmailVerified) {
            throw new ForbiddenException("Email is not verified");
        }

        // compare password
        const pwMathces = await argon.verify(user.hash, dto.password)

        // if password incorrect throw exception
        if (!pwMathces)
            throw new ForbiddenException("Credentials incorrect")

        // send back the user
        return this.signToken(user.id, user.email);
    }



    async signToken(userId: number, email: string): Promise<{ access_token: string }> {
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

    generateVerificationToken(): string {
        return randomBytes(32).toString('hex');
    }

    async verifyEmail(token: string) {
        const user = await this.prisma.staff.findUnique({
            where: {
                emailVerificationToken: token
            }
        });

        if (!user || new Date() > user.tokenExpirationDate) {
            throw new ForbiddenException("Token is invalid or has expired.");
        }

        await this.prisma.staff.update({
            where: {
                id: user.id
            },
            data: {
                isEmailVerified: true,
                emailVerificationToken: null,
                tokenExpirationDate: null
            }
        });

        return { message: "Email verified successfully." };
    }

    async getPositions() {
        const positions = await this.prisma.position.findMany({
            select: {
                id: true,
                position: true,
            }
        });
        return positions;
    }



}