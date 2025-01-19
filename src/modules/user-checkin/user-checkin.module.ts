import { Module } from '@nestjs/common';
import { UserCheckinService } from './user-checkin.service';
import { UserCheckinResolver } from './user-checkin.resolver';

@Module({
  providers: [UserCheckinService, UserCheckinResolver],
})
export class UserCheckinModule {}
