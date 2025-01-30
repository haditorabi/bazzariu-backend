import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, UserBookmark } from '@prisma/client';
import { ServiceErrorHandler } from 'src/common/decorators/ServiceErrorHandler';
import { PaginationArgs } from 'src/graphql/pagination-args-types';

@Injectable()
export class UserBookmarkService {
  constructor(private prisma: PrismaService) {}

  @ServiceErrorHandler('create user bookmark')
  async create(data: Prisma.UserBookmarkCreateInput): Promise<UserBookmark> {
    return this.prisma.userBookmark.create({
      data,
    });
  }

  @ServiceErrorHandler('find all user bookmarks')
  async findAll(paginationArgs: PaginationArgs): Promise<UserBookmark[]> {
    const { take, skip } = paginationArgs;
    return this.prisma.userBookmark.findMany({
      skip,
      take,
    });
  }

  @ServiceErrorHandler('find one user bookmark')
  async findOne(id: string): Promise<UserBookmark | null> {
    return this.prisma.userBookmark.findUnique({
      where: { id },
    });
  }

  @ServiceErrorHandler('update user bookmark')
  async update(
    id: string,
    data: Prisma.UserBookmarkUpdateInput,
  ): Promise<UserBookmark> {
    return this.prisma.userBookmark.update({
      where: { id },
      data,
    });
  }

  @ServiceErrorHandler('delete user bookmark')
  async delete(id: string): Promise<UserBookmark> {
    return this.prisma.userBookmark.delete({
      where: { id },
    });
  }
}
