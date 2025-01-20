import { Module } from '@nestjs/common';
import { UserScoreService } from './user-score.service';
import { UserScoreResolver } from './user-score.resolver';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [UserScoreService, UserScoreResolver],
})
export class UserScoreModule {}
