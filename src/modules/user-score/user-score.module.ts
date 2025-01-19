import { Module } from '@nestjs/common';
import { UserScoreService } from './user-score.service';
import { UserScoreResolver } from './user-score.resolver';

@Module({
  providers: [UserScoreService, UserScoreResolver],
})
export class UserScoreModule {}
