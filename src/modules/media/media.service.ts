import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, Media } from '@prisma/client';
import { ServiceErrorHandler } from 'src/common/decorators/ServiceErrorHandler';
import { PaginationArgs } from 'src/graphql/pagination-args-types';

@Injectable()
export class MediaService {
  constructor(private prisma: PrismaService) {}

  @ServiceErrorHandler('Create Media')
  async create(data: Prisma.MediaCreateInput): Promise<Media> {
    return this.prisma.media.create({
      data,
    });
  }

  @ServiceErrorHandler('Find All Media')
  async findAll(paginationArgs: PaginationArgs): Promise<Media[]> {
    const { take, skip } = paginationArgs;
    return this.prisma.media.findMany({
      skip,
      take,
    });
  }

  @ServiceErrorHandler('Find Media by ID')
  async findOne(id: string): Promise<Media | null> {
    return this.prisma.media.findUnique({
      where: { id },
    });
  }

  @ServiceErrorHandler('Find Media by IDs')
  async findManyByIDs(ids: string[]): Promise<Media[]> {
    return this.prisma.media.findMany({
      where: { id: { in: ids } },
    });
  }

  @ServiceErrorHandler('Update Media')
  async update(id: string, data: Prisma.MediaUpdateInput): Promise<Media> {
    return this.prisma.media.update({
      where: { id },
      data,
    });
  }

  @ServiceErrorHandler('Delete Media')
  async delete(id: string): Promise<Media> {
    return this.prisma.media.delete({
      where: { id },
    });
  }
}
