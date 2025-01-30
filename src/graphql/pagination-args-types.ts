import { ArgsType, Field, Int } from '@nestjs/graphql';

@ArgsType()
export class PaginationArgs {
  @Field(() => Int, {
    defaultValue: 1,
    description: 'The page number to fetch',
  })
  page: number;

  @Field(() => Int, {
    defaultValue: 10,
    description: 'The number of items per page',
  })
  limit: number;

  get skip(): number {
    return (this.page - 1) * this.limit;
  }

  get take(): number {
    return this.limit;
  }
}
