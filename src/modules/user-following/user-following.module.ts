import { Module } from '@nestjs/common';
import { UserFollowingService } from './user-following.service';
import { UserFollowingResolver } from './user-following.resolver';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [UserFollowingService, UserFollowingResolver],
})
export class UserFollowingModule {}
