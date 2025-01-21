import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Pagination {
  @Field()
  totalCount: number;

  @Field()
  hasNextPage: boolean;
}
