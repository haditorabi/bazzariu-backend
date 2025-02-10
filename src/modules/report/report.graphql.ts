import {
  Field,
  ObjectType,
  InputType,
  ID,
  registerEnumType,
} from '@nestjs/graphql';
import { ReportReasonType, ReportTargetType } from '@prisma/client';
import { IsNotEmpty, IsMongoId, IsEnum, IsOptional } from 'class-validator';
import { CommonUser } from 'src/graphql/user.type';
import { ValidationMessages } from '../../common/messages/validation-messages';

registerEnumType(ReportReasonType, {
  name: 'ReportReasonType',
});
registerEnumType(ReportTargetType, {
  name: 'ReportTargetType',
});
@ObjectType()
export class Report {
  @Field(() => ID)
  id: string;

  @Field(() => CommonUser)
  by?: CommonUser;

  @Field(() => ID)
  byId: string;

  @Field()
  targetId: string;

  @Field(() => ReportTargetType)
  targetType: ReportTargetType;

  @Field(() => ReportReasonType, { nullable: true })
  reason?: ReportReasonType;

  @Field()
  createdAt: Date;
}

@InputType()
export class CreateReportInput {
  @Field(() => ID, { nullable: true })
  @IsNotEmpty({ message: ValidationMessages.IS_NOT_EMPTY })
  @IsMongoId({ message: ValidationMessages.IS_MONGO_ID })
  byId: string;

  @Field(() => ID, { nullable: true })
  @IsNotEmpty({ message: ValidationMessages.IS_NOT_EMPTY })
  @IsMongoId({ message: ValidationMessages.IS_MONGO_ID })
  targetId: string;

  @Field(() => ReportTargetType, { nullable: true })
  @IsNotEmpty({ message: ValidationMessages.IS_NOT_EMPTY })
  @IsEnum(ReportTargetType, { message: ValidationMessages.IS_ENUM })
  targetType: ReportTargetType;

  @Field(() => ReportReasonType, { nullable: true })
  @IsNotEmpty({ message: ValidationMessages.IS_NOT_EMPTY })
  @IsEnum(ReportReasonType, { message: ValidationMessages.IS_ENUM })
  reason: ReportReasonType;
}

@InputType()
export class UpdateReportInput {
  @Field(() => ID, { nullable: true })
  @IsOptional({ message: ValidationMessages.IS_OPTIONAL })
  @IsMongoId({ message: ValidationMessages.IS_MONGO_ID })
  byId?: string;

  @Field(() => ID, { nullable: true })
  @IsOptional({ message: ValidationMessages.IS_OPTIONAL })
  @IsMongoId({ message: ValidationMessages.IS_MONGO_ID })
  targetId?: string;

  @Field(() => ReportTargetType, { nullable: true })
  @IsOptional({ message: ValidationMessages.IS_OPTIONAL })
  @IsEnum(ReportTargetType, { message: ValidationMessages.IS_ENUM })
  targetType?: ReportTargetType;

  @Field(() => ReportReasonType, { nullable: true })
  @IsOptional({ message: ValidationMessages.IS_OPTIONAL })
  @IsEnum(ReportReasonType, { message: ValidationMessages.IS_ENUM })
  reason?: ReportReasonType;
}
