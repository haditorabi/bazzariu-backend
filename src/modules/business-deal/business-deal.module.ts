import { Module } from '@nestjs/common';
import { BusinessDealService } from './business-deal.service';
import { BusinessDealResolver } from './business-deal.resolver';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [BusinessDealService, BusinessDealResolver],
})
export class BusinessDealModule {}
