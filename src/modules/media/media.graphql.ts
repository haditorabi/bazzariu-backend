import { Field, ObjectType, InputType, ID } from '@nestjs/graphql';
import { MediaType, ModuleType } from '@prisma/client';

@ObjectType()
export class Media {
  @Field(() => ID)
  id: string;

  @Field()
  url: string;

  @Field()
  type: MediaType;

  @Field()
  moduleType: ModuleType;

  @Field()
  createdAt: Date;
}

@InputType()
export class CreateMediaInput {
  @Field()
  url: string;

  @Field()
  type: MediaType;

  @Field()
  moduleType: ModuleType;
}

@InputType()
export class UpdateMediaInput {
  @Field({ nullable: true })
  url?: string;

  @Field({ nullable: true })
  type?: MediaType;

  @Field({ nullable: true })
  moduleType?: ModuleType;
}
