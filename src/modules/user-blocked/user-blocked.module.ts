import { Module } from '@nestjs/common';
import { UserBlockedService } from './user-blocked.service';
import { UserBlockedResolver } from './user-blocked.resolver';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [UserBlockedService, UserBlockedResolver],
})
export class UserBlockedModule {}
