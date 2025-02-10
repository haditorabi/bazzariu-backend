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
  @Field(() => ID)
  @IsNotEmpty()
  @IsMongoId()
  byId: string;

  @Field(() => ID)
  @IsNotEmpty()
  @IsMongoId()
  targetId: string;

  @Field(() => ReportTargetType)
  @IsNotEmpty()
  @IsEnum(ReportTargetType)
  targetType: ReportTargetType;

  @Field(() => ReportReasonType)
  @IsNotEmpty()
  @IsEnum(ReportReasonType)
  reason: ReportReasonType;
}

@InputType()
export class UpdateReportInput {
  @Field(() => ID, { nullable: true })
  @IsOptional()
  @IsMongoId()
  byId?: string;

  @Field(() => ID, { nullable: true })
  @IsOptional()
  @IsMongoId()
  targetId?: string;

  @Field(() => ReportTargetType, { nullable: true })
  @IsOptional()
  @IsEnum(ReportTargetType)
  targetType?: ReportTargetType;

  @Field(() => ReportReasonType, { nullable: true })
  @IsOptional()
  @IsEnum(ReportReasonType)
  reason?: ReportReasonType;
}
