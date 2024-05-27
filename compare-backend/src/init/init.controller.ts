import { Controller, Get, Param } from '@nestjs/common';
import { InitService } from './init.service';

@Controller({
  path: 'init',
  version: '1',
})
export class InitController {
  constructor(private readonly initService: InitService) {}

  @Get('/cities')
  listCities() {
    return this.initService.getAllCities();
  }

  @Get('/coverages')
  listCoverages() {
    return this.initService.getAllCoverages();
  }

  @Get('/discounts')
  listDiscounts() {
    return this.initService.getAllDiscounts();
  }

  @Get('/cities/:id')
  findCityById(@Param('id') id: string) {
    const city = this.initService.findCityById(id);

    if (!city) {
      throw new Error('City not found');
    }

    return city;
  }

  @Get('/cities/:name')
  findCityByName(@Param('name') name: string) {
    return this.initService.findCityByName(name);
  }
}
