import { Module } from '@nestjs/common';
import { UserReviewService } from './user-review.service';
import { UserReviewResolver } from './user-review.resolver';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [UserReviewService, UserReviewResolver],
})
export class UserReviewModule {}
