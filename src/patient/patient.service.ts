import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePatientDto } from './dto';

@Injectable()
export class PatientService {
  constructor(
    private prismaService: PrismaService,
  ) {}

  async getPatient(id: string) {
    try {
      const patient =
        await this.prismaService.patient.findMany(
          {
            where: {
              branchId: parseInt(id),
            },
          },
        );

      return patient;
    } catch (err) {
      console.error(
        'Ошибка при получении диагноза:',
        err,
      );
      throw new Error(err.message);
    }
  }

  async getDistrict() {
    try {
      const district =
        await this.prismaService.district.findMany(
          {
            select: {
              id: true,
              district: true,
            },
          },
        );

      return district;
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async createPatient(dto: CreatePatientDto) {
    try {
      const patient =
        await this.prismaService.patient.create({
          data: {
            name: dto.name,
            surname: dto.surname,
            Age: dto.Age,
            phone: dto.phone,
            email: dto.email,
            districtId: dto.districtId,
            branchId: dto.branchId,
          },
        });
      return patient;
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async getOnePatient(id: string) {
    try {
      const patient =
        await this.prismaService.patient.findFirst(
          {
            where: {
              id: parseInt(id),
            },
          },
        );

      return patient;
    } catch (err) {
      throw new Error(err.message);
    }
  }
}
