import {
  Field,
  ObjectType,
  InputType,
  ID,
  registerEnumType,
} from '@nestjs/graphql';
import { LanguageStatus } from '@prisma/client';
import { IsNotEmpty, Length, IsEnum, IsOptional } from 'class-validator';
import { ValidationMessages } from '../../common/messages/validation-messages';

registerEnumType(LanguageStatus, {
  name: 'LanguageStatus',
});
@ObjectType()
export class Language {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  code: string;

  @Field(() => LanguageStatus)
  status: LanguageStatus;
}

@InputType()
export class CreateLanguageInput {
  @Field({ nullable: true })
  @IsNotEmpty({ message: ValidationMessages.IS_NOT_EMPTY })
  @Length(3, 30, { message: ValidationMessages.LENGTH })
  name: string;

  @Field({ nullable: true })
  @IsNotEmpty({ message: ValidationMessages.IS_NOT_EMPTY })
  @Length(2, 2, { message: ValidationMessages.LENGTH })
  code: string;

  @Field(() => LanguageStatus, { nullable: true })
  @IsNotEmpty({ message: ValidationMessages.IS_NOT_EMPTY })
  @IsEnum(LanguageStatus, { message: ValidationMessages.IS_ENUM })
  status: LanguageStatus;
}

@InputType()
export class UpdateLanguageInput {
  @Field({ nullable: true })
  @IsOptional({ message: ValidationMessages.IS_OPTIONAL })
  @Length(3, 30, { message: ValidationMessages.LENGTH })
  name?: string;

  @Field({ nullable: true })
  @IsOptional({ message: ValidationMessages.IS_OPTIONAL })
  @Length(2, 2, { message: ValidationMessages.LENGTH })
  code?: string;

  @Field(() => LanguageStatus, { nullable: true })
  @IsOptional({ message: ValidationMessages.IS_OPTIONAL })
  @IsEnum(LanguageStatus, { message: ValidationMessages.IS_ENUM })
  status?: LanguageStatus;
}
