import { Field, ObjectType, InputType, ID } from '@nestjs/graphql';
import { UserReviewStatus, UserReviewType } from '@prisma/client';
import { User } from 'src/graphql/user.type';

@ObjectType()
export class UserReview {
  @Field(() => ID)
  id: string;

  @Field(() => User)
  user: User;

  @Field()
  targetId: string;

  @Field()
  targetType: UserReviewType;

  @Field(() => [ID], { nullable: true })
  mediaId?: string[];

  @Field()
  rating: number;

  @Field()
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
  userId: string;

  @Field()
  targetId: string;

  @Field()
  targetType: UserReviewType;

  @Field(() => [ID], { nullable: true })
  mediaId?: string[];

  @Field()
  rating: number;

  @Field()
  content?: string;

  @Field()
  status: UserReviewStatus;
}

@InputType()
export class UpdateUserReviewInput {
  @Field(() => ID, { nullable: true })
  userId?: string;

  @Field({ nullable: true })
  targetId?: string;

  @Field({ nullable: true })
  targetType?: UserReviewType;

  @Field(() => [ID], { nullable: true })
  mediaId?: string[];

  @Field({ nullable: true })
  rating?: number;

  @Field({ nullable: true })
  content?: string;

  @Field({ nullable: true })
  status?: UserReviewStatus;
}
