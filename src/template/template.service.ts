import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTemplateHistoryDto } from './dto/createTemplateHistory.dto';

@Injectable()
export class TemplateService {
  constructor(
    private prismaService: PrismaService,
  ) {}

  async getPatientToothTemplateHistory(
    patientId: string,
    toothId: string,
  ) {
    try {
      const res =
        await this.prismaService.templateHistory.findMany(
          {
            where: {
              AND: [
                {
                  patientId: parseInt(patientId),
                },
                {
                  toothId: parseInt(toothId),
                },
              ],
            },
          },
        );

      return res;
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async getTemplateType() {
    try {
      const res =
        await this.prismaService.templateType.findMany();

      return res;
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async getTemplateListByType(
    templateTypeId: string,
  ) {
    try {
      const res =
        await this.prismaService.template.findMany(
          {
            where: {
              templateTypeId: parseInt(
                templateTypeId,
              ),
            },
            select: {
              id: true,
              title: true,
              templateTypeId: true,
              templateInputs: {
                select: {
                  id: true,
                  title: true,
                },
              },
              templateSelects: {
                select: {
                  id: true,
                  title: true,
                  templateSelectsOption: {
                    select: {
                      id: true,
                      option: true,
                    },
                  },
                },
              },
              templateCheckboxes: {
                select: {
                  id: true,
                  title: true,
                },
              },
            },
          },
        );

      return res;
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async createTemplateHistory(dto: CreateTemplateHistoryDto) {
    try {
      const res =
        await this.prismaService.templateHistory.create(
          {
            data: {
              text: dto.text,
              templateId: dto.templateId,
              patientId: dto.patientId,
              toothId: dto.toothId,
            },
          },
        );

      return res;
    } catch (err) {
      throw new Error(err.message);
    }
  }
}
