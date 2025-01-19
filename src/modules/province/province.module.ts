import { Module } from '@nestjs/common';
import { ProvinceService } from './province.service';
import { ProvinceResolver } from './province.resolver';

@Module({
  providers: [ProvinceService, ProvinceResolver],
})
export class ProvinceModule {}
