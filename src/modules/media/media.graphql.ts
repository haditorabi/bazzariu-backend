import { Field, ObjectType, InputType, ID } from '@nestjs/graphql';
import { MediaType, ModuleType } from '@prisma/client';
import { IsNotEmpty, IsUrl, IsEnum, IsOptional } from 'class-validator';

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

  @Field({ nullable: true })
  createdAt?: Date;
}

@InputType()
export class CreateMediaInput {
  @Field()
  @IsNotEmpty()
  @IsUrl()
  url: string;

  @Field()
  @IsNotEmpty()
  @IsEnum(MediaType)
  type: MediaType;

  @Field()
  @IsNotEmpty()
  @IsEnum(ModuleType)
  moduleType: ModuleType;
}

@InputType()
export class UpdateMediaInput {
  @Field({ nullable: true })
  @IsOptional()
  @IsUrl()
  url?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsEnum(MediaType)
  type?: MediaType;

  @Field({ nullable: true })
  @IsOptional()
  @IsEnum(ModuleType)
  moduleType?: ModuleType;
}
