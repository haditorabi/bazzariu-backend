import { Module } from '@nestjs/common';
import { CityService } from './city.service';
import { CityResolver } from './city.resolver';

@Module({
  providers: [CityService, CityResolver],
})
export class CityModule {}
