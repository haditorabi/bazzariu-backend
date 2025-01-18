import { Module } from '@nestjs/common';
import { BusinessesService } from './businesses.service';
import { BusinessesResolver } from './businesses.resolver';

@Module({
  providers: [BusinessesService, BusinessesResolver]
})
export class BusinessesModule {}
