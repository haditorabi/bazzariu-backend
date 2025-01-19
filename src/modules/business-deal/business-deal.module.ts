import { Module } from '@nestjs/common';
import { BusinessDealService } from './business-deal.service';
import { BusinessDealResolver } from './business-deal.resolver';

@Module({
  providers: [BusinessDealService, BusinessDealResolver],
})
export class BusinessDealModule {}
