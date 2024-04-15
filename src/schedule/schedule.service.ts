import {
  Injectable,
  Request,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  AddScheduleDto,
  UpdateAdmissionDto,
} from './dto';

@Injectable()
export class ScheduleService {
  constructor(
    private prismaService: PrismaService,
  ) {}

  async getPatientsAndSchedule(id: string) {
    try {
      const scheduleAndPatients =
        await this.prismaService.reception.findMany(
          {
            where: {
              staffId: parseInt(id),
            },
            include: {
              patient: true,
            },
          },
        );

      return scheduleAndPatients;
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async getClinicSchedule(clinicId: string) {
    try {
      const clinicSchedule =
        await this.prismaService.reception.findMany(
          {
            where: {
              staff: {
                branch: {
                  clinicId: parseInt(clinicId),
                },
              },
            },
            select: {
              id: true,
              start: true,
              end: true,
              description: true,
              backgroundColor: true,
              receptionStatusId: true,
              receptionTypeId: true,
              patientId: true,
              patient: true,
              staffId: true,
              staff: {
                select: {
                  id: true,
                  name: true,
                  surname: true,
                  phone: true,
                  isMale: true,
                  isAdmin: true,
                  birthDate: true,
                  email: true,
                  branch: true,
                  staffPosition: true,
                  staffStatus: true,
                },
              },
            },
          },
        );

      return clinicSchedule;
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async getTypeSchedule() {
    try {
      const statusSchedule =
        await this.prismaService.receptionType.findMany(
          {
            select: {
              id: true,
              receptionType: true,
            },
          },
        );

      return statusSchedule;
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async getScheduleStatus() {
    try {
      const typeSchedule =
        await this.prismaService.receptionStatus.findMany(
          {
            select: {
              id: true,
              receptionStatus: true,
            },
          },
        );

      return typeSchedule;
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async addAdmission(dto: AddScheduleDto) {
    try {
      const addSchedule =
        await this.prismaService.reception.create(
          {
            data: {
              start: dto.start,
              end: dto.end,
              description: dto.description,
              backgroundColor:
                dto.backgroundColor,
              patientId: dto.patientId,
              receptionTypeId:
                dto.receptionTypeId,
              staffId: dto.staffId,
            },
            include: {
              patient: true,
              staff: {
                select: {
                  id: true,
                  name: true,
                  surname: true,
                  phone: true,
                  isMale: true,
                  isAdmin: true,
                  birthDate: true,
                  email: true,
                  branch: true,
                  staffPosition: true,
                  staffStatus: true,
                },
              },
            },
          },
        );

      // const currenSchedule = aw

      return addSchedule;
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async updateAdmission(
    dto: UpdateAdmissionDto,
    scheduleId: number,
  ) {
    try {
      const updatedAdmission =
        await this.prismaService.reception.update(
          {
            where: {
              id: scheduleId,
            },
            data: {
              ...dto,
            },
            include: {
              patient: true,
              staff: {
                select: {
                  id: true,
                  name: true,
                  surname: true,
                  phone: true,
                  isMale: true,
                  isAdmin: true,
                  birthDate: true,
                  email: true,
                  branch: true,
                  staffPosition: true,
                  staffStatus: true,
                },
              },
            },
          },
        );

      return updatedAdmission;
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async deleteReception(receptionId: string) {
    try {
      const deleteAdmission =
        await this.prismaService.reception.delete(
          {
            where: {
              id: parseInt(receptionId),
            },
          },
        );

      return deleteAdmission.id;
    } catch (err) {
      throw new Error(err.message);
    }
  }
}
