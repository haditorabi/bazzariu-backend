import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ReportService } from './report.service';
import { Report, CreateReportInput, UpdateReportInput } from './report.graphql';
import { Prisma } from '@prisma/client';

@Resolver(() => Report)
export class ReportResolver {
  constructor(private service: ReportService) {}

  @Query(() => [Report])
  async reports() {
    return this.service.findAll();
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
  async updateReport(@Args('data') data: UpdateReportInput) {
    const { id, by, ...rest } = data;

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
}
