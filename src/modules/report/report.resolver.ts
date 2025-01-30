import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { ReportService } from './report.service';
import { Report, CreateReportInput, UpdateReportInput } from './report.graphql';
import { Prisma } from '@prisma/client';
import { CommonUser } from 'src/graphql/user.type';

@Resolver(() => Report)
export class ReportResolver {
  constructor(private service: ReportService) {}

  // Pagination added to reports query
  @Query(() => [Report])
  async reports(
    @Args('page', { type: () => Number, nullable: true }) page = 1,
    @Args('limit', { type: () => Number, nullable: true }) limit = 10,
  ) {
    return this.service.findAll({ page, limit });
  }

  @Query(() => Report)
  async report(@Args('id') id: string) {
    return this.service.findOne(id);
  }

  @Mutation(() => Report)
  async createReport(@Args('data') data: CreateReportInput) {
    const { by, ...rest } = data;

    const prismaData: Prisma.ReportCreateInput = {
      ...rest,
      by: {
        connect: { id: by },
      },
    };

    return this.service.create(prismaData);
  }

  @Mutation(() => Report)
  async updateReport(
    @Args('id') id: string,
    @Args('data') data: UpdateReportInput,
  ) {
    const { by, ...rest } = data;

    const prismaData: Prisma.ReportUpdateInput = {
      ...rest,
      ...(by && {
        by: {
          connect: { id: by },
        },
      }),
    };

    return this.service.update(id, prismaData);
  }
  @ResolveField(() => CommonUser)
  async by(@Parent() report: Report) {
    return this.service.getUserById(report.by.id);
  }
}
