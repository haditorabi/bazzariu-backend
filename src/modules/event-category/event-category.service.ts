import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, EventCategory } from '@prisma/client';

@Injectable()
export class EventCategoryService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.EventCategoryCreateInput): Promise<EventCategory> {
    return this.prisma.eventCategory.create({
      data,
    });
  }

  async findAll(): Promise<EventCategory[]> {
    return this.prisma.eventCategory.findMany();
  }

  async findOne(id: string): Promise<EventCategory | null> {
    return this.prisma.eventCategory.findUnique({
      where: { id },
    });
  }

  async update(
    id: string,
    data: Prisma.EventCategoryUpdateInput,
  ): Promise<EventCategory> {
    return this.prisma.eventCategory.update({
      where: { id },
      data,
    });
  }

  async delete(id: string): Promise<EventCategory> {
    return this.prisma.eventCategory.delete({
      where: { id },
    });
  }
}
