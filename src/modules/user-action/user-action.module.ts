import { Module } from '@nestjs/common';
import { UserActionService } from './user-action.service';
import { UserActionResolver } from './user-action.resolver';

@Module({
  providers: [UserActionService, UserActionResolver],
})
export class UserActionModule {}
