import { Module } from '@nestjs/common';
import { BusinessBoostService } from './business-boost.service';
import { BusinessBoostResolver } from './business-boost.resolver';

@Module({
  providers: [BusinessBoostService, BusinessBoostResolver]
})
export class BusinessBoostModule {}
