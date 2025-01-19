import { Module } from '@nestjs/common';
import { BusinessFollowingService } from './business-following.service';
import { BusinessFollowingResolver } from './business-following.resolver';

@Module({
  providers: [BusinessFollowingService, BusinessFollowingResolver],
})
export class BusinessFollowingModule {}
