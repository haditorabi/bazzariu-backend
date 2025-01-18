import { Module } from '@nestjs/common';
import { UserActionsService } from './user-actions.service';
import { UserActionsResolver } from './user-actions.resolver';

@Module({
  providers: [UserActionsService, UserActionsResolver]
})
export class UserActionsModule {}
