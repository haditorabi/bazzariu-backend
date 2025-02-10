import {
  Field,
  ObjectType,
  InputType,
  ID,
  registerEnumType,
} from '@nestjs/graphql';
import { BusinessTagStatus } from '@prisma/client';
import {
  IsNotEmpty,
  IsString,
  Length,
  IsEnum,
  IsOptional,
} from 'class-validator';
registerEnumType(BusinessTagStatus, {
  name: 'BusinessTagStatus',
});
@ObjectType()
export class BusinessTag {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field(() => BusinessTagStatus)
  status: BusinessTagStatus;

  @Field({ nullable: true })
  createdAt?: Date;
}

@InputType()
export class CreateBusinessTagInput {
  @Field()
  @IsNotEmpty()
  @IsString()
  @Length(3, 30)
  name: string;

  @Field(() => BusinessTagStatus)
  @IsNotEmpty()
  @IsEnum(BusinessTagStatus)
  status: BusinessTagStatus;
}

@InputType()
export class UpdateBusinessTagInput {
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @Length(3, 30)
  name?: string;

  @Field(() => BusinessTagStatus, { nullable: true })
  @IsOptional()
  @IsEnum(BusinessTagStatus)
  status?: BusinessTagStatus;
}
