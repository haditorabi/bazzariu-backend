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
import { PaginatedReport } from 'src/graphql/paginated-response';

@Resolver(() => Report)
export class ReportResolver {
  constructor(private service: ReportService) {}

  // Pagination added to reports query
  @Query(() => [Report])
  async reports(@Args() paginationArgs: PaginationArgs) {
    return this.service.findAll(paginationArgs);
  }
  @Query(() => PaginatedReport)
  async allReport(@Args() paginationArgs: PaginationArgs) {
    const [items, totalCount] = await this.service.findAndCount(paginationArgs);
    return { items, totalCount };
  }

  @Query(() => Report)
  async report(@Args('id') id: string) {
    return this.service.findOne(id);
  }

  @Mutation(() => Report)
  async createReport(@Args('data') data: CreateReportInput) {
    const { byId, ...rest } = data;

    const prismaData: Prisma.ReportCreateInput = {
      ...rest,
      by: {
        connect: { id: byId },
      },
    };

    return this.service.create(prismaData);
  }

  @Mutation(() => Report)
  async updateReport(
    @Args('id') id: string,
    @Args('data') data: UpdateReportInput,
  ) {
    const { byId, ...rest } = data;

    const prismaData: Prisma.ReportUpdateInput = {
      ...rest,
      ...(byId && {
        by: {
          connect: { id: byId },
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
