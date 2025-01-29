import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, EventCategory, Event } from '@prisma/client';
import { ServiceErrorHandler } from 'src/common/decorators/ServiceErrorHandler';

@Injectable()
export class EventCategoryService {
  constructor(private prisma: PrismaService) {}

  @ServiceErrorHandler('create event category')
  async create(data: Prisma.EventCategoryCreateInput): Promise<EventCategory> {
    return this.prisma.eventCategory.create({
      data,
    });
  }

  @ServiceErrorHandler('find all event categories')
  async findAll({
    page,
    limit,
  }: {
    page: number;
    limit: number;
  }): Promise<EventCategory[]> {
    const skip = (page - 1) * limit;
    const take = limit;

    return this.prisma.eventCategory.findMany({
      skip,
      take,
    });
  }

  @ServiceErrorHandler('find one event category')
  async findOne(id: string): Promise<EventCategory | null> {
    return this.prisma.eventCategory.findUnique({
      where: { id },
    });
  }

  @ServiceErrorHandler('update event category')
  async update(
    id: string,
    data: Prisma.EventCategoryUpdateInput,
  ): Promise<EventCategory> {
    return this.prisma.eventCategory.update({
      where: { id },
      data,
    });
  }

  @ServiceErrorHandler('delete event category')
  async delete(id: string): Promise<EventCategory> {
    return this.prisma.eventCategory.delete({
      where: { id },
    });
  }

  @ServiceErrorHandler('get events for category')
  async getEventsForCategory(categoryId: string): Promise<Event[]> {
    return this.prisma.event.findMany({
      where: { categoryId: { has: categoryId } },
    });
  }
}
