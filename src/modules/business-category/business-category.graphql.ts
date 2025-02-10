import {
  Field,
  ObjectType,
  InputType,
  ID,
  registerEnumType,
} from '@nestjs/graphql';
import { BusinessCategoryStatus } from '@prisma/client';
import {
  IsDate,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
registerEnumType(BusinessCategoryStatus, {
  name: 'BusinessCategoryStatus',
});
@ObjectType()
export class BusinessCategory {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field(() => ID, { nullable: true })
  mediaId?: string;

  @Field(() => BusinessCategoryStatus)
  status: BusinessCategoryStatus;

  @Field({ nullable: true })
  @IsDate()
  createdAt?: Date;

  @Field({ nullable: true })
  @IsDate()
  updatedAt?: Date;
}

@InputType()
export class CreateBusinessCategoryInput {
  @Field()
  @IsNotEmpty()
  @IsString()
  @Length(3, 30)
  name: string;

  @Field(() => ID, { nullable: true })
  @IsOptional()
  @IsMongoId()
  mediaId?: string;

  @Field(() => BusinessCategoryStatus)
  @IsNotEmpty()
  @IsEnum(BusinessCategoryStatus)
  status: BusinessCategoryStatus;
}

@InputType()
export class UpdateBusinessCategoryInput {
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @Length(3, 30)
  name?: string;

  @Field(() => ID, { nullable: true })
  @IsOptional()
  @IsMongoId()
  mediaId?: string;

  @Field(() => BusinessCategoryStatus, { nullable: true })
  @IsEnum(BusinessCategoryStatus)
  @IsOptional()
  status?: BusinessCategoryStatus;
}
