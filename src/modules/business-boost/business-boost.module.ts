import { Module } from '@nestjs/common';
import { BusinessBoostService } from './business-boost.service';
import { BusinessBoostResolver } from './business-boost.resolver';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [BusinessBoostService, BusinessBoostResolver]
})
export class BusinessBoostModule {}
