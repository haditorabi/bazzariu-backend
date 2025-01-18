import { Module } from '@nestjs/common';
import { UserCheckinsService } from './user-checkins.service';
import { UserCheckinsResolver } from './user-checkins.resolver';

@Module({
  providers: [UserCheckinsService, UserCheckinsResolver]
})
export class UserCheckinsModule {}
