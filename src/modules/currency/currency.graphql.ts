import {
  Field,
  ObjectType,
  InputType,
  ID,
  registerEnumType,
} from '@nestjs/graphql';
import { CurrencyStatus } from '@prisma/client';
import {
  IsNotEmpty,
  IsString,
  Length,
  IsEnum,
  IsOptional,
} from 'class-validator';
import { ValidationMessages } from '../../common/messages/validation-messages';

registerEnumType(CurrencyStatus, {
  name: 'CurrencyStatus',
});
@ObjectType()
export class Currency {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  code: string;

  @Field(() => CurrencyStatus)
  status: CurrencyStatus;
}

@InputType()
export class CreateCurrencyInput {
  @Field({ nullable: true })
  @IsNotEmpty({ message: ValidationMessages.IS_NOT_EMPTY })
  @IsString({ message: ValidationMessages.IS_STRING })
  @Length(3, 100, { message: ValidationMessages.LENGTH })
  name: string;

  @Field({ nullable: true })
  @IsNotEmpty({ message: ValidationMessages.IS_NOT_EMPTY })
  @IsString({ message: ValidationMessages.IS_STRING })
  @Length(3, 3, { message: ValidationMessages.LENGTH })
  code: string;

  @Field(() => CurrencyStatus, { nullable: true })
  @IsNotEmpty({ message: ValidationMessages.IS_NOT_EMPTY })
  @IsEnum(CurrencyStatus, { message: ValidationMessages.IS_ENUM })
  status: CurrencyStatus;
}

@InputType()
export class UpdateCurrencyInput {
  @Field({ nullable: true })
  @IsOptional({ message: ValidationMessages.IS_OPTIONAL })
  @IsString({ message: ValidationMessages.IS_STRING })
  @Length(3, 100, { message: ValidationMessages.LENGTH })
  name?: string;

  @Field({ nullable: true })
  @IsOptional({ message: ValidationMessages.IS_OPTIONAL })
  @IsString({ message: ValidationMessages.IS_STRING })
  @Length(3, 3, { message: ValidationMessages.LENGTH })
  code?: string;

  @Field(() => CurrencyStatus, { nullable: true })
  @IsOptional({ message: ValidationMessages.IS_OPTIONAL })
  @IsEnum(CurrencyStatus, { message: ValidationMessages.IS_ENUM })
  status?: CurrencyStatus;
}
