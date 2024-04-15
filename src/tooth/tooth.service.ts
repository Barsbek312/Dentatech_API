import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ToothService {
  constructor(
    private prismaService: PrismaService,
  ) {}

  async getPatientToothStatus(patientId: string) {
    try {
      const toothStatus =
        await this.prismaService.jaw.findMany({
          select: {
            id: true,
            rows: {
              select: {
                row: true,
                teeth: {
                  select: {
                    id: true,
                    tooth: true,
                    toothTypeId: true,
                    teethPartConnect: true,
                  },
                },
              },
            },
          },
        });

      return toothStatus;
    } catch (err) {
      throw new Error(err.message);
    }
  }
}
