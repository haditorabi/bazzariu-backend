import { Module } from '@nestjs/common';
import { RegionsService } from './regions.service';
import { RegionsResolver } from './regions.resolver';

@Module({
  providers: [RegionsService, RegionsResolver]
})
export class RegionsModule {}
