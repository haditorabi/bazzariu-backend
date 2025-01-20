import { Module } from '@nestjs/common';
import { UserBookmarkService } from './user-bookmark.service';
import { UserBookmarkResolver } from './user-bookmark.resolver';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [UserBookmarkService, UserBookmarkResolver],
})
export class UserBookmarkModule {}
