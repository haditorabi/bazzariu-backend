import { Field, ObjectType, InputType, ID } from '@nestjs/graphql';
import { LanguageStatus } from '@prisma/client';
import { IsNotEmpty, Length, IsEnum, IsOptional } from 'class-validator';

@ObjectType()
export class Language {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  code: string;

  @Field()
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

  @Field()
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

  @Field({ nullable: true })
  @IsOptional()
  @IsEnum(LanguageStatus)
  status?: LanguageStatus;
}
