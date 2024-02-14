import { Injectable, Request } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { AddScheduleDto, UpdateAdmissionDto } from "./dto";

@Injectable()
export class ScheduleService {
    constructor(private prismaService: PrismaService) {}

    async getPatientsAndSchedule(id: string) {
        try {
            const scheduleAndPatients = await this.prismaService.schedule.findMany({
                where: {
                    staffId: parseInt(id)
                },
                include: {
                    patient: true
                }
            });

            return scheduleAndPatients;

        } catch(err) {
            throw new Error(err.message);
        }
    }

    async getStatusSchedule() {
        try {
            const statusSchedule = await this.prismaService.statusSchedule.findMany({
                select: {
                    id: true,
                    status: true,
                }
            })

            return statusSchedule;
        } catch(err) {
            throw new Error(err.message)
        }
    }

    async addAdmission(dto: AddScheduleDto) {
        try {
            const addSchedule = await this.prismaService.schedule.create({
                data: {
                    title: dto.title,
                    start: dto.start,
                    end: dto.end,
                    description: dto.description,
                    isCanceled: dto.isCanceled,
                    backgroundColor: dto.backgroundColor,
                    patientId: dto.patientId,
                    statusId: dto.statusId,
                    staffId: dto.staffId
                },
                include: {
                    patient: true
                }
            })

            return addSchedule
        } catch(err) {
            throw new Error(err.message);
        }
    }

    async updateAdmission(dto: UpdateAdmissionDto, scheduleId: number) {
        try {
            const updatedAdmission = await this.prismaService.schedule.update({
                where: {
                    id: scheduleId
                },
                data: {
                    ...dto,
                }
            })

            return updatedAdmission
        } catch(err) {
            throw new Error(err.message);
        }
    }
}