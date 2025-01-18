import { Module } from '@nestjs/common';
import { BusinessProductsPricesService } from './business-products-prices.service';
import { BusinessProductsPricesResolver } from './business-products-prices.resolver';

@Module({
  providers: [BusinessProductsPricesService, BusinessProductsPricesResolver]
})
export class BusinessProductsPricesModule {}
