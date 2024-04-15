import { Controller, Get } from '@nestjs/common';
import { CityService } from './city.service';
import { transformAuthInfo } from 'passport';

@Controller('city')
export class CityController {
  constructor(private cityService: CityService) {}

  @Get("get-city")
  async getCity() {
    return this.cityService.getCity();
  }
}
