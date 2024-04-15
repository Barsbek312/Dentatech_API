import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateDiseaseDto } from './dto/createDisease.dto';
import { EditDiagnosisDto } from './dto/editDiagnosis.dto';

@Injectable()
export class DiseaseService {
  constructor(
    private prismaService: PrismaService,
  ) {}

  async getDisease(clinicId: string) {
    try {
      const res =
        await this.prismaService.disease.findMany(
          {
            where: {
              clinicId: parseInt(clinicId),
            },
            select: {
              id: true,
              disease: true,
            },
          },
        );

      return res;
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async createDisease(dto: CreateDiseaseDto) {
    try {
      const res =
        await this.prismaService.disease.create({
          data: {
            disease: dto.disease,
            clinicId: dto.clinicId,
          },
        });

      return res;
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async editDiagnosis(
    dto: EditDiagnosisDto,
    diagnosisId: string,
  ) {
    try {
      const res =
        await this.prismaService.diagnosis.update(
          {
            where: {
              id: parseInt(diagnosisId),
            },
            data: {
              ...dto,
            },
          },
        );

      return res;
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async deleteDiagnosis(diagnosisId: string) {
    try {
      const res =
        await this.prismaService.diagnosis.delete(
          {
            where: {
              id: parseInt(diagnosisId),
            },
          },
        );

      return res.id;
    } catch (err) {
      throw new Error(err.message);
    }
  }
}
