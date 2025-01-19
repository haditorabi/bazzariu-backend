import { Module } from '@nestjs/common';
import { UserReviewService } from './user-review.service';
import { UserReviewResolver } from './user-review.resolver';

@Module({
  providers: [UserReviewService, UserReviewResolver],
})
export class UserReviewModule {}
