import { Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';
import { InitService } from './init.service';
import { City, CitySchema } from './model/city.schema';
import { InitController } from './init.controller';
import { Coverage, CoverageSchema } from './model/coverages.schema';
import { Discounts, DiscountsSchema } from './model/discounts.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: City.name, schema: CitySchema }]),
    MongooseModule.forFeature([
      { name: Coverage.name, schema: CoverageSchema },
    ]),
    MongooseModule.forFeature([
      { name: Discounts.name, schema: DiscountsSchema },
    ]),
  ],
  providers: [InitService],
  controllers: [InitController],
  exports: [InitService],
})
export class InitModule {}
