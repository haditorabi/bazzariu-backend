import { Module } from '@nestjs/common';
import { BusinessLocationService } from './business-location.service';
import { BusinessLocationResolver } from './business-location.resolver';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [BusinessLocationService, BusinessLocationResolver],
})
export class BusinessLocationModule {}
