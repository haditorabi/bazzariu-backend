import { Module } from '@nestjs/common';
import { UserActionLogService } from './user-action-log.service';
import { UserActionLogResolver } from './user-action-log.resolver';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [UserActionLogService, UserActionLogResolver],
})
export class UserActionLogModule {}
