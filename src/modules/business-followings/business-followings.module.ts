import { Module } from '@nestjs/common';
import { BusinessFollowingsService } from './business-followings.service';
import { BusinessFollowingsResolver } from './business-followings.resolver';

@Module({
  providers: [BusinessFollowingsService, BusinessFollowingsResolver]
})
export class BusinessFollowingsModule {}
