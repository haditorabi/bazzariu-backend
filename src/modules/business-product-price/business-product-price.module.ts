import { Module } from '@nestjs/common';
import { BusinessProductPriceService } from './business-product-price.service';
import { BusinessProductPriceResolver } from './business-product-price.resolver';

@Module({
  providers: [BusinessProductPriceService, BusinessProductPriceResolver],
})
export class BusinessProductPriceModule {}
