import { Field, ObjectType, InputType, ID } from '@nestjs/graphql';
import { ReportReasonType, ReportTargetType } from '@prisma/client';
import { User } from 'src/graphql/user.type';

@ObjectType()
export class Report {
  @Field(() => ID)
  id: string;

  @Field(() => User)
  by: User;

  @Field()
  targetId: string;

  @Field()
  targetType: ReportTargetType;

  @Field()
  reason: ReportReasonType;

  @Field()
  createdAt: Date;
}

@InputType()
export class CreateReportInput {
  @Field(() => ID)
  byId: string;

  @Field(() => ID)
  targetId: string;

  @Field()
  targetType: ReportTargetType;

  @Field()
  reason: ReportReasonType;
}

@InputType()
export class UpdateReportInput {
  @Field(() => ID, { nullable: true })
  byId?: string;

  @Field(() => ID, { nullable: true })
  targetId?: string;

  @Field({ nullable: true })
  targetType?: ReportTargetType;

  @Field({ nullable: true })
  reason?: ReportReasonType;
}
