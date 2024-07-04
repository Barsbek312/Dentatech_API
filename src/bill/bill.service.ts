import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BillService {
  constructor(
    private prismaService: PrismaService,
  ) {}

  async getPatientBill(patientId: string) {
    try {
      const res =
        await this.prismaService.patient.findUnique(
          {
            where: {
              id: parseInt(patientId),
            },
            select: {
              id: true,
              name: true,
              surname: true,
              patronymic: true,
              receptions: {
                select: {
                  id: true,
                  end: true,
                  attendingStaff: {
                    select: {
                      id: true,
                      name: true,
                      surname: true,
                    },
                  },
                  medicalHistory: {
                    select: {
                      id: true,
                      procedure: {
                        select: {
                          id: true,
                          procedure: true,
                          description: true,
                          price: true,
                        },
                      },
                      toothPartConnect: {
                        select: {
                          id: true,
                          tooth: {
                            select: {
                              id: true,
                              tooth: true,
                            },
                          },
                        },
                      },
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
