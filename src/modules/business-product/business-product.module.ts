import { Module } from '@nestjs/common';
import { BusinessProductService } from './business-product.service';
import { BusinessProductResolver } from './business-product.resolver';

@Module({
  providers: [BusinessProductService, BusinessProductResolver],
})
export class BusinessProductModule {}
