import {
  Field,
  ObjectType,
  InputType,
  ID,
  registerEnumType,
} from '@nestjs/graphql';
import { BusinessTagStatus } from '@prisma/client';
import {
  IsNotEmpty,
  IsString,
  Length,
  IsEnum,
  IsOptional,
} from 'class-validator';
import { ValidationMessages } from '../../common/messages/validation-messages';

registerEnumType(BusinessTagStatus, {
  name: 'BusinessTagStatus',
});
@ObjectType()
export class BusinessTag {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field(() => BusinessTagStatus)
  status: BusinessTagStatus;

  @Field({ nullable: true })
  createdAt?: Date;
}

@InputType()
export class CreateBusinessTagInput {
  @Field({ nullable: true })
  @IsNotEmpty({ message: ValidationMessages.IS_NOT_EMPTY })
  @IsString({ message: ValidationMessages.IS_STRING })
  @Length(3, 30, { message: ValidationMessages.LENGTH })
  name: string;

  @Field(() => BusinessTagStatus, { nullable: true })
  @IsNotEmpty({ message: ValidationMessages.IS_NOT_EMPTY })
  @IsEnum(BusinessTagStatus, { message: ValidationMessages.IS_ENUM })
  status: BusinessTagStatus;
}

@InputType()
export class UpdateBusinessTagInput {
  @Field({ nullable: true })
  @IsOptional({ message: ValidationMessages.IS_OPTIONAL })
  @IsString({ message: ValidationMessages.IS_STRING })
  @Length(3, 30, { message: ValidationMessages.LENGTH })
  name?: string;

  @Field(() => BusinessTagStatus, { nullable: true })
  @IsOptional({ message: ValidationMessages.IS_OPTIONAL })
  @IsEnum(BusinessTagStatus, { message: ValidationMessages.IS_ENUM })
  status?: BusinessTagStatus;
}
