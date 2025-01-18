import { Module } from '@nestjs/common';
import { BusinessDealsService } from './business-deals.service';
import { BusinessDealsResolver } from './business-deals.resolver';

@Module({
  providers: [BusinessDealsService, BusinessDealsResolver]
})
export class BusinessDealsModule {}
