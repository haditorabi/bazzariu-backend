import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UserBookmarkService } from './user-bookmark.service';
import {
  UserBookmark,
  CreateUserBookmarkInput,
  UpdateUserBookmarkInput,
} from './user-bookmark.graphql';
import { Prisma } from '@prisma/client';

@Resolver(() => UserBookmark)
export class UserBookmarkResolver {
  constructor(private service: UserBookmarkService) {}

  @Query(() => [UserBookmark])
  async userBookmarks(
    @Args('page', { type: () => Number, defaultValue: 1 }) page: number,
    @Args('limit', { type: () => Number, defaultValue: 10 }) limit: number,
  ) {
    return this.service.findAll(page, limit);
  }

  @Query(() => UserBookmark)
  async userBookmark(@Args('id') id: string) {
    return this.service.findOne(id);
  }

  @Mutation(() => UserBookmark)
  async createUserBookmark(@Args('data') data: CreateUserBookmarkInput) {
    const { user, ...rest } = data;

    const prismaData: Prisma.UserBookmarkCreateInput = {
      ...rest,
      user: {
        connect: { id: user },
      },
    };

    return this.service.create(prismaData);
  }

  @Mutation(() => UserBookmark)
  async updateUserBookmark(@Args('data') data: UpdateUserBookmarkInput) {
    const { id, user, ...rest } = data;

    const prismaData: Prisma.UserBookmarkUpdateInput = {
      ...rest,
      ...(user && {
        user: {
          connect: { id: user },
        },
      }),
    };

    return this.service.update(id, prismaData);
  }
}
