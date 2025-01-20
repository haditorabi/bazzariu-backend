import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, Report } from '@prisma/client';

@Injectable()
export class ReportService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.ReportCreateInput): Promise<Report> {
    return this.prisma.report.create({
      data,
    });
  }

  async findAll(): Promise<Report[]> {
    return this.prisma.report.findMany();
  }

  async findOne(id: string): Promise<Report | null> {
    return this.prisma.report.findUnique({
      where: { id },
    });
  }

  async update(id: string, data: Prisma.ReportUpdateInput): Promise<Report> {
    return this.prisma.report.update({
      where: { id },
      data,
    });
  }

  async delete(id: string): Promise<Report> {
    return this.prisma.report.delete({
      where: { id },
    });
  }
}
