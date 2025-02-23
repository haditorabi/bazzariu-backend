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
import { PaginationArgs } from 'src/graphql/pagination-args-types';
import { PaginatedEventCategory } from 'src/graphql/paginated-response';

@Resolver(() => EventCategory)
export class EventCategoryResolver {
  constructor(private service: EventCategoryService) {}

  @Query(() => [EventCategory])
  async eventCategories(@Args() paginationArgs: PaginationArgs) {
    return this.service.findAll(paginationArgs);
  }
  @Query(() => PaginatedEventCategory)
  async allEventCategory(@Args() paginationArgs: PaginationArgs) {
    const [items, totalCount] = await this.service.findAndCount(paginationArgs);
    return { items, totalCount };
  }

  @ResolveField(() => [CommonEvent], { nullable: true })
  async event(@Parent() eventCategory: EventCategory) {
    if (!eventCategory.eventId || !eventCategory.eventId.length) {
      return null;
    }
    return this.service.getEvents(eventCategory.eventId);
  }

  @Query(() => EventCategory)
  async eventCategory(@Args('id') id: string) {
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
  @Mutation(() => EventCategory)
  async deleteEventCategory(@Args('id') id: string) {
    return this.service.delete(id);
  }
}
