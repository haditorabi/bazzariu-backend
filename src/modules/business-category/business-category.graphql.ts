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
import { ValidationMessages } from '../../common/messages/validation-messages';

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
  @IsDate({ message: ValidationMessages.IS_DATE })
  createdAt?: Date;

  @Field({ nullable: true })
  @IsDate({ message: ValidationMessages.IS_DATE })
  updatedAt?: Date;
}

@InputType()
export class CreateBusinessCategoryInput {
  @Field({ nullable: true })
  @IsNotEmpty({ message: ValidationMessages.IS_NOT_EMPTY })
  @IsString({ message: ValidationMessages.IS_STRING })
  @Length(3, 30, { message: ValidationMessages.LENGTH })
  name: string;

  @Field(() => ID, { nullable: true })
  @IsOptional({ message: ValidationMessages.IS_OPTIONAL })
  @IsMongoId({ message: ValidationMessages.IS_MONGO_ID })
  mediaId?: string;

  @Field(() => BusinessCategoryStatus, { nullable: true })
  @IsNotEmpty({ message: ValidationMessages.IS_NOT_EMPTY })
  @IsEnum(BusinessCategoryStatus, { message: ValidationMessages.IS_ENUM })
  status: BusinessCategoryStatus;
}

@InputType()
export class UpdateBusinessCategoryInput {
  @Field({ nullable: true })
  @IsOptional({ message: ValidationMessages.IS_OPTIONAL })
  @IsString({ message: ValidationMessages.IS_STRING })
  @Length(3, 30, { message: ValidationMessages.LENGTH })
  name?: string;

  @Field(() => ID, { nullable: true })
  @IsOptional({ message: ValidationMessages.IS_OPTIONAL })
  @IsMongoId({ message: ValidationMessages.IS_MONGO_ID })
  mediaId?: string;

  @Field(() => BusinessCategoryStatus, { nullable: true })
  @IsEnum(BusinessCategoryStatus, { message: ValidationMessages.IS_ENUM })
  @IsOptional({ message: ValidationMessages.IS_OPTIONAL })
  status?: BusinessCategoryStatus;
}
