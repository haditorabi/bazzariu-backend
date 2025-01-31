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
import { PaginationArgs } from 'src/graphql/pagination-args-types';

@Resolver(() => Report)
export class ReportResolver {
  constructor(private service: ReportService) {}

  // Pagination added to reports query
  @Query(() => [Report])
  async reports(@Args() paginationArgs: PaginationArgs) {
    return this.service.findAll(paginationArgs);
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
  @Mutation(() => Report)
  async deleteReport(@Args('id') id: string) {
    return this.service.delete(id);
  }
  @ResolveField(() => CommonUser)
  async by(@Parent() report: Report) {
    return this.service.getUserById(report.byId);
  }
}
