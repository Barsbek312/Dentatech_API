import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ClinicService {
  constructor(private prisma: PrismaService) {}

  async createClinic(
    clinicName: string,
  ): Promise<number> {
    try {
      const clinic =
        await this.prisma.clinic.create({
          data: {
            clinic: clinicName,
          },
        });

      return clinic.id;
    } catch (error) {
      throw error;
    }
  }

  async getPersonalOfClinic(clinicId: string) {
    try {
      const personal =
        await this.prisma.staff.findMany({
          where: {
            branch: {
              clinicId: parseInt(clinicId),
            },
          },
          select: {
            id: true,
            name: true,
            surname: true,
            isMale: true,
            phone: true,
            birthDate: true,
            isAdmin: true,
            email: true,
            branchId: true,
            staffPosition: true,
            staffStatus: true,
          },
        });

      return personal;
    } catch (err) {
      throw new Error(err.message);
    }
  }
}
