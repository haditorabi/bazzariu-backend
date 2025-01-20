import { Module } from '@nestjs/common';
import { BusinessProductService } from './business-product.service';
import { BusinessProductResolver } from './business-product.resolver';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [BusinessProductService, BusinessProductResolver],
})
export class BusinessProductModule {}
