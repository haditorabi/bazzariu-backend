import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, Report, User } from '@prisma/client';
import { ServiceErrorHandler } from 'src/common/decorators/ServiceErrorHandler';

@Injectable()
export class ReportService {
  constructor(private prisma: PrismaService) {}

  @ServiceErrorHandler('create report')
  async create(data: Prisma.ReportCreateInput): Promise<Report> {
    return this.prisma.report.create({
      data,
    });
  }

  @ServiceErrorHandler('find all reports')
  async findAll({
    page = 1,
    limit = 10,
  }: {
    page: number;
    limit: number;
  }): Promise<Report[]> {
    const skip = (page - 1) * limit;
    return this.prisma.report.findMany({
      skip,
      take: limit,
    });
  }

  @ServiceErrorHandler('find report by id')
  async findOne(id: string): Promise<Report | null> {
    return this.prisma.report.findUnique({
      where: { id },
    });
  }

  @ServiceErrorHandler('update report')
  async update(id: string, data: Prisma.ReportUpdateInput): Promise<Report> {
    return this.prisma.report.update({
      where: { id },
      data,
    });
  }

  @ServiceErrorHandler('delete report')
  async delete(id: string): Promise<Report> {
    return this.prisma.report.delete({
      where: { id },
    });
  }

  @ServiceErrorHandler('get user by ID')
  async getUserById(userId: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { id: userId },
    });
  }
}
