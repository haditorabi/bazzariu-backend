import { Module } from '@nestjs/common';
import { BusinessProductPriceService } from './business-product-price.service';
import { BusinessProductPriceResolver } from './business-product-price.resolver';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [BusinessProductPriceService, BusinessProductPriceResolver],
})
export class BusinessProductPriceModule {}
