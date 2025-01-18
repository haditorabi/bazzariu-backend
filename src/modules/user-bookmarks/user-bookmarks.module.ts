import { Module } from '@nestjs/common';
import { UserBookmarksService } from './user-bookmarks.service';
import { UserBookmarksResolver } from './user-bookmarks.resolver';

@Module({
  providers: [UserBookmarksService, UserBookmarksResolver]
})
export class UserBookmarksModule {}
