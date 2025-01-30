import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { EventCategoryService } from './event-category.service';
import {
  EventCategory,
  CreateEventCategoryInput,
  UpdateEventCategoryInput,
} from './event-category.graphql';
import { Prisma } from '@prisma/client';
import { CommonEvent } from 'src/graphql/event.type';

@Resolver(() => EventCategory)
export class EventCategoryResolver {
  constructor(private service: EventCategoryService) {}

  @Query(() => [EventCategory])
  async bookingTimeSlots(
    @Args('page', { type: () => Number, nullable: true }) page: number = 1,
    @Args('limit', { type: () => Number, nullable: true })
    limit: number = 10,
  ) {
    return this.service.findAll({ page, limit });
  }

  @ResolveField(() => [CommonEvent], { nullable: true })
  async event(@Parent() eventCategory: EventCategory) {
    const { id } = eventCategory;
    return this.service.getEventsForCategory(id);
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
  async updateEventCategory(
    @Args('id') id: string,
    @Args('data') data: UpdateEventCategoryInput,
  ) {
    const { ...rest } = data;

    const prismaData: Prisma.EventCategoryUpdateInput = { ...rest };

    return this.service.update(id, prismaData);
  }
}
