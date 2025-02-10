import {
  Field,
  ObjectType,
  InputType,
  ID,
  registerEnumType,
} from '@nestjs/graphql';
import { MediaType, ModuleType } from '@prisma/client';
import { IsNotEmpty, IsUrl, IsEnum, IsOptional } from 'class-validator';
registerEnumType(MediaType, {
  name: 'MediaType',
});
registerEnumType(ModuleType, {
  name: 'ModuleType',
});
@ObjectType()
export class Media {
  @Field(() => ID)
  id: string;

  @Field()
  url: string;

  @Field(() => MediaType)
  type: MediaType;

  @Field(() => ModuleType)
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

  @Field(() => MediaType)
  @IsNotEmpty()
  @IsEnum(MediaType)
  type: MediaType;

  @Field(() => ModuleType)
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

  @Field(() => MediaType, { nullable: true })
  @IsOptional()
  @IsEnum(MediaType)
  type?: MediaType;

  @Field(() => ModuleType, { nullable: true })
  @IsOptional()
  @IsEnum(ModuleType)
  moduleType?: ModuleType;
}
