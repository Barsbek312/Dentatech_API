import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePatientDto } from './dto';
import { UpdatePatientDto } from './dto/updatePatient.dto';

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
              clinicId: parseInt(id),
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

  async getPatientStatus() {
    try {
      const patientStatus =
        await this.prismaService.patientStatus.findMany(
          {
            select: {
              id: true,
              patientStatus: true,
            },
          },
        );

      return patientStatus;
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async getPatientType() {
    try {
      const patientType =
        await this.prismaService.patientType.findMany(
          {
            select: {
              id: true,
              patientType: true,
            },
          },
        );

      return patientType;
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
            isMale: dto.isMale,
            patronymic: dto.patronymic,
            birthDate: dto.birthDate,
            phone: dto.phone,
            cityId: dto.cityId,
            street: dto.street,
            where: dto.where,
            email: dto.email,
            districtId: dto.districtId,
            clinicId: dto.clinicId,
            patientTypeId: dto.patientTypeId,
            patientStatusId: dto.patientStatusId,
          },
        });
      return patient;
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async updatePatient(
    patientId: number,
    dto: UpdatePatientDto,
  ) {
    try {
      const updatePatient =
        await this.prismaService.patient.update({
          where: {
            id: patientId,
          },
          data: {
            ...dto,
          },
          include: {
            district: true,
            city: true,
            patientStatus: true,
            patientType: true,
          },
        });

      return updatePatient;
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
            include: {
              district: true,
              city: true,
              patientStatus: true,
              patientType: true,
            },
          },
        );

      const patientReception =
        await this.prismaService.reception.findMany(
          {
            where: {
              patientId: patient.id,
              receptionStatusId: 4,
            },
            orderBy: {
              end: 'asc',
            },
            select: {
              start: true,
              end: true,
            },
          },
        );

      const firstPatientReception =
        patientReception[0];
      const lastPatientReception =
        patientReception[
          patientReception.length - 1
        ];

      const patientDentist =
        await this.prismaService.reception.findMany(
          {
            where: {
              patientId: patient.id,
            },
            distinct: ['attendingStaffId'],
            select: {
              attendingStaff: {
                select: {
                  name: true,
                  surname: true,
                },
              },
            },
          },
        );
      return {
        ...patient,
        firstPatientReception,
        lastPatientReception,
        patientDentist,
      };
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async getPatientSchedule(patientId: string) {
    try {
      const res =
        await this.prismaService.reception.findMany(
          {
            where: {
              patientId: parseInt(patientId),
            },
            select: {
              id: true,
              start: true,
              end: true,
              description: true,
              receptionStatus: {
                select: {
                  receptionStatus: true,
                },
              },
              receptionType: {
                select: {
                  receptionType: true,
                },
              },
              patient: {
                select: {
                  id: true,
                  name: true,
                  surname: true,
                },
              },
              attendingStaff: {
                select: {
                  id: true,
                  name: true,
                  surname: true,
                },
              },
              referringStaff: {
                select: {
                  id: true,
                  name: true,
                  surname: true,
                },
              },
              medicalHistory: {
                select: {
                  procedure: {
                    select: {
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

  async getStaffPatientList(dentistId: string) {
    try {
      const res =
        await this.prismaService.patient.findMany(
          {
            where: {
              receptions: {
                some: {
                  attendingStaffId:
                    parseInt(dentistId),
                },
              },
            },
            select: {
              id: true,
              name: true,
              surname: true,
              phone: true,
              patientStatusId: true,
              birthDate: true,
            },
          },
        );

      return res;
    } catch (err) {
      throw new Error(err.message);
    }
  }
}
