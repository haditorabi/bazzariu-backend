import { Module } from '@nestjs/common';
import { UserFollowingsService } from './user-followings.service';
import { UserFollowingsResolver } from './user-followings.resolver';

@Module({
  providers: [UserFollowingsService, UserFollowingsResolver]
})
export class UserFollowingsModule {}
