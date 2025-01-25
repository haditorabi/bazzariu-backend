import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CommonPagination {
  @Field()
  totalCount: number;

  @Field()
  hasNextPage: boolean;
}
