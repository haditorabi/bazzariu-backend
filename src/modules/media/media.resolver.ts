import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { MediaService } from './media.service';
import { Media, CreateMediaInput, UpdateMediaInput } from './media.graphql';
import { Prisma } from '@prisma/client';
import { PaginationArgs } from 'src/graphql/pagination-args-types';
import { PaginatedMedia } from 'src/graphql/paginated-response';

@Resolver(() => Media)
export class MediaResolver {
  constructor(private service: MediaService) {}

  @Query(() => Media)
  async media(@Args('id') id: string) {
    return this.service.findOne(id);
  }

  @Query(() => [Media])
  async mediaList(@Args() paginationArgs: PaginationArgs) {
    return this.service.findAll(paginationArgs);
  }
  @Query(() => PaginatedMedia)
  async allMedia(@Args() paginationArgs: PaginationArgs) {
    const [items, totalCount] = await this.service.findAndCount(paginationArgs);
    return { items, totalCount };
  }

  @Query(() => [Media])
  async mediaByIDs(@Args('ids', { type: () => [String] }) ids: string[]) {
    return this.service.findManyByIDs(ids);
  }

  @Mutation(() => Media)
  async createMedia(@Args('data') data: CreateMediaInput) {
    const { ...rest } = data;

    const prismaData: Prisma.MediaCreateInput = {
      ...rest,
    };

    return this.service.create(prismaData);
  }

  @Mutation(() => Media)
  async updateMedia(
    @Args('id') id: string,
    @Args('data') data: UpdateMediaInput,
  ) {
    const { ...rest } = data;

    const prismaData: Prisma.MediaUpdateInput = {
      ...rest,
    };

    return this.service.update(id, prismaData);
  }

  @Mutation(() => Media)
  async deleteMedia(@Args('id') id: string) {
    return this.service.delete(id);
  }
}
