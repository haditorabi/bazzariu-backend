import { Module } from '@nestjs/common';
import { UserActionLogService } from './user-action-log.service';
import { UserActionLogResolver } from './user-action-log.resolver';

@Module({
  providers: [UserActionLogService, UserActionLogResolver],
})
export class UserActionLogModule {}
