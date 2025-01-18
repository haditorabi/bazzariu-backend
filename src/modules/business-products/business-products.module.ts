import { Module } from '@nestjs/common';
import { BusinessProductsService } from './business-products.service';
import { BusinessProductsResolver } from './business-products.resolver';

@Module({
  providers: [BusinessProductsService, BusinessProductsResolver]
})
export class BusinessProductsModule {}
