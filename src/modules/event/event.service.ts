import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, Event, EventCategory } from '@prisma/client';
import { ServiceErrorHandler } from 'src/common/decorators/ServiceErrorHandler';
import { PaginationArgs } from 'src/graphql/pagination-args-types';

@Injectable()
export class EventService {
  constructor(private prisma: PrismaService) {}

  @ServiceErrorHandler('Creating event')
  async create(data: Prisma.EventCreateInput): Promise<Event> {
    return this.prisma.event.create({
      data,
    });
  }

  @ServiceErrorHandler('Fetching all events')
  async findAll(paginationArgs: PaginationArgs): Promise<Event[]> {
    const { take, skip } = paginationArgs;

    return this.prisma.event.findMany({
      skip,
      take,
    });
  }

  @ServiceErrorHandler('Fetching event by ID')
  async findOne(id: string): Promise<Event | null> {
    return this.prisma.event.findUnique({
      where: { id },
    });
  }

  @ServiceErrorHandler('Updating event')
  async update(id: string, data: Prisma.EventUpdateInput): Promise<Event> {
    return this.prisma.event.update({
      where: { id },
      data,
    });
  }

  @ServiceErrorHandler('Deleting event')
  async delete(id: string): Promise<Event> {
    return this.prisma.event.delete({
      where: { id },
    });
  }
  @ServiceErrorHandler('Fetching event categories')
  async findCategories(categoryIds: string[]): Promise<EventCategory[]> {
    console.log(categoryIds);
    return this.prisma.eventCategory.findMany({
      where: {
        id: { in: categoryIds },
      },
    });
  }
}
