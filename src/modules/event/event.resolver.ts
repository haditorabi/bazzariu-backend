import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { EventService } from './event.service';
import { Event, CreateEventInput, UpdateEventInput } from './event.graphql';
import { Prisma } from '@prisma/client';

@Resolver(() => Event)
export class EventResolver {
  constructor(private service: EventService) {}

  @Query(() => [Event])
  async events() {
    return this.service.findAll();
  }

  @Query(() => Event)
  async event(@Args('id') id: string) {
    return this.service.findOne(id);
  }

  @Mutation(() => Event)
  async createEvent(@Args('data') data: CreateEventInput) {
    const prismaData: Prisma.EventCreateInput = data;

    return this.service.create(prismaData);
  }

  @Mutation(() => Event)
  async updateEvent(@Args('data') data: UpdateEventInput) {
    const { id, ...rest } = data;

    const prismaData: Prisma.EventUpdateInput = {
      ...rest,
    };

    return this.service.update(id, prismaData);
  }
}
