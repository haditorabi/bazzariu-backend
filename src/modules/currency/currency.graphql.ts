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
  @Field()
  @IsNotEmpty()
  @IsString()
  @Length(3, 100)
  name: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  @Length(3, 3)
  code: string;

  @Field(() => CurrencyStatus)
  @IsNotEmpty()
  @IsEnum(CurrencyStatus)
  status: CurrencyStatus;
}

@InputType()
export class UpdateCurrencyInput {
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @Length(3, 100)
  name?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @Length(3, 3)
  code?: string;

  @Field(() => CurrencyStatus, { nullable: true })
  @IsOptional()
  @IsEnum(CurrencyStatus)
  status?: CurrencyStatus;
}
