import {
  Field,
  ObjectType,
  InputType,
  ID,
  registerEnumType,
} from '@nestjs/graphql';
import { MediaType, ModuleType } from '@prisma/client';
import { IsNotEmpty, IsUrl, IsEnum, IsOptional } from 'class-validator';
import { ValidationMessages } from '../../common/messages/validation-messages';

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
  @Field({ nullable: true })
  @IsNotEmpty({ message: ValidationMessages.IS_NOT_EMPTY })
  @IsUrl({}, { message: ValidationMessages.IS_URL })
  url: string;

  @Field(() => MediaType, { nullable: true })
  @IsNotEmpty({ message: ValidationMessages.IS_NOT_EMPTY })
  @IsEnum(MediaType, { message: ValidationMessages.IS_ENUM })
  type: MediaType;

  @Field(() => ModuleType, { nullable: true })
  @IsNotEmpty({ message: ValidationMessages.IS_NOT_EMPTY })
  @IsEnum(ModuleType, { message: ValidationMessages.IS_ENUM })
  moduleType: ModuleType;
}

@InputType()
export class UpdateMediaInput {
  @Field({ nullable: true })
  @IsOptional({ message: ValidationMessages.IS_OPTIONAL })
  @IsUrl({}, { message: ValidationMessages.IS_URL })
  url?: string;

  @Field(() => MediaType, { nullable: true })
  @IsOptional({ message: ValidationMessages.IS_OPTIONAL })
  @IsEnum(MediaType, { message: ValidationMessages.IS_ENUM })
  type?: MediaType;

  @Field(() => ModuleType, { nullable: true })
  @IsOptional({ message: ValidationMessages.IS_OPTIONAL })
  @IsEnum(ModuleType, { message: ValidationMessages.IS_ENUM })
  moduleType?: ModuleType;
}
