import { Module } from '@nestjs/common';
import { UserReviewsService } from './user-reviews.service';
import { UserReviewsResolver } from './user-reviews.resolver';

@Module({
  providers: [UserReviewsService, UserReviewsResolver]
})
export class UserReviewsModule {}
