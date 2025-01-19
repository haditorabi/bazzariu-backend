import { Module } from '@nestjs/common';
import { UserBookmarkService } from './user-bookmark.service';
import { UserBookmarkResolver } from './user-bookmark.resolver';

@Module({
  providers: [UserBookmarkService, UserBookmarkResolver],
})
export class UserBookmarkModule {}
