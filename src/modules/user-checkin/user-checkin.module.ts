import { Module } from '@nestjs/common';
import { UserCheckinService } from './user-checkin.service';
import { UserCheckinResolver } from './user-checkin.resolver';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [UserCheckinService, UserCheckinResolver],
})
export class UserCheckinModule {}
