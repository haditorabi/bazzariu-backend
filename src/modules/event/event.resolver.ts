import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { EventService } from './event.service';
import { Event, CreateEventInput, UpdateEventInput } from './event.graphql';
import { Prisma } from '@prisma/client';
import { CommonEventCategory } from 'src/graphql/event-category.type';
import { PaginationArgs } from 'src/graphql/pagination-args-types';

@Resolver(() => Event)
export class EventResolver {
  constructor(private service: EventService) {}

  @Query(() => [Event])
  async events(@Args() paginationArgs: PaginationArgs) {
    return this.service.findAll(paginationArgs);
  }

  @Query(() => Event)
  async event(@Args('id') id: string) {
    return this.service.findOne(id);
  }

  @Mutation(() => Event)
  async createEvent(@Args('data') data: CreateEventInput) {
    const { categoryId, ...rest } = data;
    const prismaData: Prisma.EventCreateInput = {
      ...rest,
      ...(categoryId && {
        category: {
          connect: categoryId.map((id) => ({ id })),
        },
      }),
    };
    return this.service.create(prismaData);
  }

  @Mutation(() => Event)
  async updateEvent(
    @Args('id') id: string,
    @Args('data') data: UpdateEventInput,
  ) {
    const { categoryId, ...rest } = data;
    const prismaData: Prisma.EventUpdateInput = {
      ...rest,
      ...(categoryId && {
        category: {
          connect: categoryId.map((id) => ({ id })),
        },
      }),
    };
    return this.service.update(id, prismaData);
  }

  @Mutation(() => Event)
  async deleteEvent(@Args('id') id: string) {
    return this.service.delete(id);
  }
  @ResolveField(() => [CommonEventCategory], { nullable: true })
  async category(@Parent() event: Event) {
    return this.service.findCategories(event.categoryId);
  }
}
