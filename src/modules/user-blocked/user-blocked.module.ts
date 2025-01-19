import { Module } from '@nestjs/common';
import { UserBlockedService } from './user-blocked.service';
import { UserBlockedResolver } from './user-blocked.resolver';

@Module({
  providers: [UserBlockedService, UserBlockedResolver],
})
export class UserBlockedModule {}
