import { Module } from '@nestjs/common';
import { BusinessFollowingService } from './business-following.service';
import { BusinessFollowingResolver } from './business-following.resolver';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [BusinessFollowingService, BusinessFollowingResolver],
})
export class BusinessFollowingModule {}
