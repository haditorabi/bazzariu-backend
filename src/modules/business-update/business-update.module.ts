import { Module } from '@nestjs/common';
import { BusinessUpdateService } from './business-update.service';
import { BusinessUpdateResolver } from './business-update.resolver';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [BusinessUpdateService, BusinessUpdateResolver],
})
export class BusinessUpdateModule {}
