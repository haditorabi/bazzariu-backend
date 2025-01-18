import { Module } from '@nestjs/common';
import { UserActionsLogsService } from './user-actions-logs.service';
import { UserActionsLogsResolver } from './user-actions-logs.resolver';

@Module({
  providers: [UserActionsLogsService, UserActionsLogsResolver]
})
export class UserActionsLogsModule {}
