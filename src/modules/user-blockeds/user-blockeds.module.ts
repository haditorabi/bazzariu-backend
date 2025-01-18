import { Module } from '@nestjs/common';
import { UserBlockedsService } from './user-blockeds.service';
import { UserBlockedsResolver } from './user-blockeds.resolver';

@Module({
  providers: [UserBlockedsService, UserBlockedsResolver]
})
export class UserBlockedsModule {}
