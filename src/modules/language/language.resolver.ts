import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { LanguageService } from './language.service';
import {
  Language,
  CreateLanguageInput,
  UpdateLanguageInput,
} from './language.graphql';
import { Prisma } from '@prisma/client';

@Resolver(() => Language)
export class LanguageResolver {
  constructor(private service: LanguageService) {}

  @Query(() => [Language])
  async bookingTimeSlots() {
    return this.service.findAll();
  }

  @Query(() => Language)
  async bookingTimeSlot(@Args('id') id: string) {
    return this.service.findOne(id);
  }

  @Mutation(() => Language)
  async createLanguage(@Args('data') data: CreateLanguageInput) {
    const prismaData: Prisma.LanguageCreateInput = data;

    return this.service.create(prismaData);
  }

  @Mutation(() => Language)
  async updateLanguage(@Args('data') data: UpdateLanguageInput) {
    const { id, ...rest } = data;

    const prismaData: Prisma.LanguageUpdateInput = {
      ...rest,
    };

    return this.service.update(id, prismaData);
  }
}
