import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class ClinicService {
    constructor(private prisma: PrismaService) {}

    async createClinic(clinicName: string): Promise<number> {
        try {
            const clinic = await this.prisma.clinic.create({
                data: {
                    clinic: clinicName
                }
            })

            return clinic.id

        } catch(error) {
            throw error;
        }
    }
}