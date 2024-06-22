import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class StaffService {
  constructor(
    private prismaService: PrismaService,
  ) {}

  async getStaffProfile(staffId: string) {
    const res =
      await this.prismaService.staff.findFirst({
        where: {
          id: parseInt(staffId),
        },
        select: {
          id: true,
          name: true,
          surname: true,
          isMale: true,
          phone: true,
          birthDate: true,
          isAdmin: true,
          email: true,
          branchId: true,
          staffPositionId: true,
          staffStatusId: true,
          isEmailVerified: true,
        },
      });

    return res;
  }
}
