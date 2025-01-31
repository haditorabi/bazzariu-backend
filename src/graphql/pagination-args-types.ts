import { ArgsType, Field, Int } from '@nestjs/graphql';

@ArgsType()
export class PaginationArgs {
  @Field(() => Int, {
    defaultValue: 1,
    description: 'The page number to fetch',
  })
  page: number = 1;

  @Field(() => Int, {
    defaultValue: 10,
    description: 'The number of items per page',
  })
  limit: number = 10;

  get skip(): number {
    const page = Number(this.page) || 1;
    const limit = Number(this.limit) || 10;

    // Ensure page is at least 1
    if (page < 1) throw new Error('Page number must be at least 1');

    // Ensure limit is a positive integer
    if (limit <= 0) throw new Error('Limit must be a positive integer');

    return (page - 1) * limit;
  }

  get take(): number {
    const limit = Number(this.limit) || 10;

    // Ensure limit is a positive integer
    if (limit <= 0) throw new Error('Limit must be a positive integer');

    return limit;
  }
}
