import { Field, ObjectType, InputType, ID } from '@nestjs/graphql';
import { IsNotEmpty, IsMongoId, IsOptional } from 'class-validator';
import { CommonBusiness } from 'src/graphql/business.type';
import { CommonUser } from 'src/graphql/user.type';

@ObjectType()
export class BusinessFollowing {
  @Field(() => ID)
  id: string;

  @Field(() => CommonBusiness, { nullable: true })
  business?: CommonBusiness;

  @Field(() => ID)
  businessId: string;

  @Field(() => CommonUser, { nullable: true })
  user?: CommonUser;

  @Field(() => ID)
  userId: string;
}

@InputType()
export class CreateBusinessFollowingInput {
  @Field(() => ID)
  @IsNotEmpty()
  @IsMongoId()
  businessId: string;

  @Field(() => ID)
  @IsNotEmpty()
  @IsMongoId()
  userId: string;
}

@InputType()
export class UpdateBusinessFollowingInput {
  @Field(() => ID, { nullable: true })
  @IsOptional()
  @IsMongoId()
  businessId?: string;

  @Field(() => ID, { nullable: true })
  @IsOptional()
  @IsMongoId()
  userId?: string;
}
