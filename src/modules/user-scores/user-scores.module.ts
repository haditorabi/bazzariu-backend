import { Module } from '@nestjs/common';
import { UserScoresService } from './user-scores.service';
import { UserScoresResolver } from './user-scores.resolver';

@Module({
  providers: [UserScoresService, UserScoresResolver]
})
export class UserScoresModule {}
