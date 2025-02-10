import {
  Field,
  ObjectType,
  InputType,
  ID,
  registerEnumType,
} from '@nestjs/graphql';
import { LanguageStatus } from '@prisma/client';
import { IsNotEmpty, Length, IsEnum, IsOptional } from 'class-validator';
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
  @Field()
  @IsNotEmpty()
  @Length(3, 30)
  name: string;

  @Field()
  @IsNotEmpty()
  @Length(2, 2)
  code: string;

  @Field(() => LanguageStatus)
  @IsNotEmpty()
  @IsEnum(LanguageStatus)
  status: LanguageStatus;
}

@InputType()
export class UpdateLanguageInput {
  @Field({ nullable: true })
  @IsOptional()
  @Length(3, 30)
  name?: string;

  @Field({ nullable: true })
  @IsOptional()
  @Length(2, 2)
  code?: string;

  @Field(() => LanguageStatus, { nullable: true })
  @IsOptional()
  @IsEnum(LanguageStatus)
  status?: LanguageStatus;
}
