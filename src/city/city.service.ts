import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CityService {
  constructor(private prisma: PrismaService) {}

  async getCity() {
    const cities =
      await this.prisma.city.findMany({
        select: {
          id: true,
          city: true,
        },
      });
    return cities;
  }
}
