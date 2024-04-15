import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProcedureDto } from './dto/createProcedure.dto';
import { CreateTreatmentPlanDto } from './dto/createTreatmentPlan.dto';
import { EditPlannedProcedureDto } from './dto/editPlannedProcedure.dto';
import { CreateCompletedProcedureDto } from './dto/createCompletedProcedure.dto';
import { EditCompletedProcedureDto } from './dto/editCompletedProcedure.dto';

@Injectable()
export class ProcedureService {
  constructor(
    private prismaService: PrismaService,
  ) {}

  async getProcedureType() {
    try {
      const res =
        await this.prismaService.procedureType.findMany(
          {
            select: {
              id: true,
              procedureType: true,
            },
          },
        );

      return res;
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async getProcedure(clinicId: string) {
    try {
      const res =
        await this.prismaService.procedure.findMany(
          {
            where: {
              clinicId: parseInt(clinicId),
            },
          },
        );

      return res;
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async createProcedure(dto: CreateProcedureDto) {
    try {
      const res =
        await this.prismaService.procedure.create(
          {
            data: {
              procedure: dto.procedure,
              description: dto.description,
              price: dto.price,
              procedureTypeId:
                dto.procedureTypeId,
              clinicId: dto.clinicId,
            },
          },
        );
      return res;
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async editPlannedProcedure(
    dto: EditPlannedProcedureDto,
    plannedProcedureId: string,
  ) {
    try {
      const res =
        await this.prismaService.plannedProcedure.update(
          {
            where: {
              id: parseInt(plannedProcedureId),
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

  async deletePlannedProcedure(
    plannedProcedureId: string,
  ) {
    try {
      const res =
        await this.prismaService.plannedProcedure.delete(
          {
            where: {
              id: parseInt(plannedProcedureId),
            },
          },
        );

      return res.id;
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async createCompletedProcedure(
    dto: CreateCompletedProcedureDto,
  ) {
    try {
      let procedureArr = [];
      dto.toothPartConnectId.forEach(
        async (toothPart) =>
          dto.procedureId.forEach(
            async (procedure) => {
              const onePlannedProcedure =
                await this.prismaService.diseaseHistory.create(
                  {
                    data: {
                      receptionId:
                        dto.receptionId,
                      procedureId: procedure,
                      toothPartConnectId:
                        toothPart,
                    },
                  },
                );
              procedureArr.push(
                onePlannedProcedure,
              );
            },
          ),
      );

      return procedureArr;
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async getCompletedProcedure(
    receptionId: string,
    toothId: string,
  ) {
    try {
      const res =
        await this.prismaService.tooth.findMany({
          where: {
            id: parseInt(toothId),
          },
          select: {
            id: true,
            teethPartConnect: {
              select: {
                id: true,
                toothPartId: true,
                medicalHistory: {
                  where: {
                    receptionId:
                      parseInt(receptionId),
                  },
                  select: {
                    id: true,
                    updatedAt: true,
                    procedure: {
                      select: {
                        id: true,
                        procedure: true,
                        description: true,
                        procedureType: {
                          select: {
                            id: true,
                            procedureType: true,
                          },
                        },
                      },
                    },
                    reception: {
                      select: {
                        id: true,
                        patientId: true,
                        staff: {
                          select: {
                            id: true,
                            name: true,
                            surname: true,
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        });

      return res;
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async editCompletedProcedure(
    diseaseHistoryId: string,
    dto: EditCompletedProcedureDto,
  ) {
    try {
      const res =
        await this.prismaService.diseaseHistory.update(
          {
            where: {
              id: parseInt(diseaseHistoryId),
            },
            data: {
              procedureId: dto.procedureId,
            },
          },
        );

      return res;
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async deleteCompletedProcedure(
    diseaseHistoryId: string,
  ) {
    try {
      const res =
        await this.prismaService.diseaseHistory.delete(
          {
            where: {
              id: parseInt(diseaseHistoryId),
            },
          },
        );

      return res.id;
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async createTreatmentPlan(
    dto: CreateTreatmentPlanDto,
  ) {
    try {
      let res = {
        diagnosis: null,
        procedure: null,
      };
      if (dto.diseaseId) {
        const diagnosis =
          dto.toothPartConnectId.map(
            async (item) =>
              await this.prismaService.diagnosis.create(
                {
                  data: {
                    diseaseId: dto.diseaseId,
                    toothPartConnectId: item,
                    patientId: dto.patientId,
                    staffId: dto.staffId,
                  },
                },
              ),
          );

        res.diagnosis = diagnosis;
      }
      if (dto.procedureId) {
        let procedureArr = [];
        dto.toothPartConnectId.forEach(
          async (toothPart) =>
            dto.procedureId.forEach(
              async (procedure) => {
                const onePlannedProcedure =
                  await this.prismaService.plannedProcedure.create(
                    {
                      data: {
                        toothPartConnectId:
                          toothPart,
                        procedureId: procedure,
                        patientId: dto.patientId,
                        staffId: dto.staffId,
                      },
                    },
                  );
                procedureArr.push(
                  onePlannedProcedure,
                );
              },
            ),
        );
        res.procedure = procedureArr;
      }
      // FIX!!!!!!!!
      return res;
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async getPatientTreatmentPlan(
    patientId: string,
    toothId: string,
  ) {
    const patientPlannedProcedure =
      await this.prismaService.tooth.findMany({
        where: {
          id: parseInt(toothId),
        },
        select: {
          id: true,
          tooth: true,
          teethPartConnect: {
            select: {
              id: true,
              plannedProcedures: {
                where: {
                  patientId: parseInt(patientId),
                },
                select: {
                  id: true,
                  patientId: true,
                  updatedAt: true,
                  staff: {
                    select: {
                      id: true,
                      name: true,
                      surname: true,
                    },
                  },
                  procedure: {
                    select: {
                      id: true,
                      procedure: true,
                      description: true,
                      procedureType: {
                        select: {
                          id: true,
                          procedureType: true,
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      });
    const patientDiagnosis =
      await this.prismaService.tooth.findMany({
        where: {
          id: parseInt(toothId),
        },
        select: {
          id: true,
          tooth: true,
          teethPartConnect: {
            select: {
              id: true,
              diagnosis: {
                where: {
                  patientId: parseInt(patientId),
                },
                select: {
                  id: true,
                  patientId: true,
                  updatedAt: true,
                  staff: {
                    select: {
                      id: true,
                      name: true,
                      surname: true,
                    },
                  },
                  diseases: {
                    select: {
                      id: true,
                      disease: true,
                    },
                  },
                },
              },
            },
          },
        },
      });
    const res = [
      patientDiagnosis,
      patientPlannedProcedure,
    ];

    return res;
  }
}
