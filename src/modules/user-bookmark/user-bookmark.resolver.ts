import {
  Resolver,
  Query,
  Mutation,
  Args,
  Parent,
  ResolveField,
} from '@nestjs/graphql';
import { UserBookmarkService } from './user-bookmark.service';
import {
  UserBookmark,
  CreateUserBookmarkInput,
  UpdateUserBookmarkInput,
} from './user-bookmark.graphql';
import { Prisma } from '@prisma/client';
import { PaginationArgs } from 'src/graphql/pagination-args-types';
import { CommonUser } from 'src/graphql/user.type';

@Resolver(() => UserBookmark)
export class UserBookmarkResolver {
  constructor(private service: UserBookmarkService) {}

  @Query(() => [UserBookmark])
  async userBookmarks(@Args() paginationArgs: PaginationArgs) {
    return this.service.findAll(paginationArgs);
  }

  @Query(() => UserBookmark)
  async userBookmark(@Args('id') id: string) {
    return this.service.findOne(id);
  }

  @Mutation(() => UserBookmark)
  async createUserBookmark(@Args('data') data: CreateUserBookmarkInput) {
    const { userId, ...rest } = data;

    const prismaData: Prisma.UserBookmarkCreateInput = {
      ...rest,
      user: {
        connect: { id: userId },
      },
    };

    return this.service.create(prismaData);
  }

  @Mutation(() => UserBookmark)
  async updateUserBookmark(
    @Args('id') id: string,
    @Args('data')
    data: UpdateUserBookmarkInput,
  ) {
    const { userId, ...rest } = data;

    const prismaData: Prisma.UserBookmarkUpdateInput = {
      ...rest,
      ...(userId && {
        user: {
          connect: { id: userId },
        },
      }),
    };

    return this.service.update(id, prismaData);
  }
  @Mutation(() => UserBookmark)
  async deleteUserBookmark(@Args('id') id: string) {
    return this.service.delete(id);
  }
  @ResolveField(() => CommonUser)
  async user(@Parent() userBookmark: UserBookmark) {
    return this.service.getUser(userBookmark.userId);
  }
}
