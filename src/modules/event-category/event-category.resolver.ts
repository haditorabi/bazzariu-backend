import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { EventCategoryService } from './event-category.service';
import {
  EventCategory,
  CreateEventCategoryInput,
  UpdateEventCategoryInput,
} from './event-category.graphql';
import { Prisma } from '@prisma/client';

@Resolver(() => EventCategory)
export class EventCategoryResolver {
  constructor(private service: EventCategoryService) {}

  @Query(() => [EventCategory])
  async bookingTimeSlots() {
    return this.service.findAll();
  }

  @Query(() => EventCategory)
  async bookingTimeSlot(@Args('id') id: string) {
    return this.service.findOne(id);
  }

  @Mutation(() => EventCategory)
  async createEventCategory(@Args('data') data: CreateEventCategoryInput) {
    const prismaData: Prisma.EventCategoryCreateInput = data;

    return this.service.create(prismaData);
  }

  @Mutation(() => EventCategory)
  async updateEventCategory(@Args('data') data: UpdateEventCategoryInput) {
    const { id, ...rest } = data;

    const prismaData: Prisma.EventCategoryUpdateInput = { ...rest };

    return this.service.update(id, prismaData);
  }
}
