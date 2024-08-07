import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DiseaseHistoryService {
  constructor(
    private prismaService: PrismaService,
  ) {}

  async getDiseaseHistoryByToothAndPatient(
    patientId: string,
    toothId: string,
  ) {
    try {
      const res =
        await this.prismaService.reception.findMany(
          {
            where: {
              AND: [
                {
                  patientId: parseInt(patientId),
                },
                {
                  medicalHistory: {
                    some: {
                      toothPartConnect: {
                        toothId:
                          parseInt(toothId),
                      },
                    },
                  },
                },
              ],
            },
            select: {
              id: true,
              end: true,
              description: true,
              attendingStaff: {
                select: {
                  name: true,
                  surname: true,
                  staffPosition: {
                    select: {
                      staffPosition: true,
                    },
                  },
                  branch: {
                    select: {
                      street: true,
                      clinic: {
                        select: {
                          clinic: true,
                        },
                      },
                    },
                  },
                },
              },
              medicalHistory: {
                where: {
                  toothPartConnect: {
                    toothId: parseInt(toothId),
                  },
                },
                select: {
                  id: true,
                  procedure: {
                    select: {
                      id: true,
                      procedure: true,
                      price: true,
                    },
                  },
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

  async getDiseaseHistoryByReception(
    receptionId: string,
  ) {
    try {
      const res =
        await this.prismaService.diseaseHistory.findMany(
          {
            where: {
              receptionId: parseInt(receptionId),
            },
            select: {
              id: true,
              receptionId: true,
              procedure: {
                select: {
                  id: true,
                  procedure: true,
                  price: true,
                },
              },
              toothPartConnect: {
                select: {
                  tooth: {
                    select: {
                      id: true,
                      tooth: true
                    },
                  },
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
}
