import { Module } from '@nestjs/common';
import { UserActionService } from './user-action.service';
import { UserActionResolver } from './user-action.resolver';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [UserActionService, UserActionResolver],
})
export class UserActionModule {}
