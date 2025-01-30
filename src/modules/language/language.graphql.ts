import { Field, ObjectType, InputType, ID } from '@nestjs/graphql';
import { LanguageStatus } from '@prisma/client';

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
  name: string;

  @Field()
  code: string;

  @Field()
  status: LanguageStatus;
}

@InputType()
export class UpdateLanguageInput {
  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  code?: string;

  @Field({ nullable: true })
  status?: LanguageStatus;
}
