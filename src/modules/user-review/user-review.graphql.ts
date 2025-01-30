import { Field, ObjectType, InputType, ID, Int } from '@nestjs/graphql';
import { UserReviewStatus, UserReviewType } from '@prisma/client';
import { CommonUser } from 'src/graphql/user.type';

@ObjectType()
export class UserReview {
  @Field(() => ID)
  id: string;

  @Field(() => CommonUser)
  user: CommonUser;

  @Field(() => ID)
  userId: string;

  @Field(() => ID)
  targetId: string;

  @Field()
  targetType: UserReviewType;

  @Field(() => [ID], { nullable: true })
  mediaId?: string[];

  @Field()
  rating: number;

  @Field({ nullable: true })
  content?: string;

  @Field()
  status: UserReviewStatus;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}

@InputType()
export class CreateUserReviewInput {
  @Field(() => ID)
  user: string;

  @Field(() => ID, { nullable: true })
  targetId: string;

  @Field()
  targetType: UserReviewType;

  @Field(() => [ID], { nullable: true })
  mediaId?: string[];

  @Field(() => Int)
  rating: number;

  @Field({ nullable: true })
  content?: string;

  @Field()
  status: UserReviewStatus;
}

@InputType()
export class UpdateUserReviewInput {
  @Field(() => ID, { nullable: true })
  user?: string;

  @Field(() => ID, { nullable: true })
  targetId?: string;

  @Field({ nullable: true })
  targetType?: UserReviewType;

  @Field(() => [ID], { nullable: true })
  mediaId?: string[];

  @Field(() => Int, { nullable: true })
  rating?: number;

  @Field({ nullable: true })
  content?: string;

  @Field({ nullable: true })
  status?: UserReviewStatus;
}
