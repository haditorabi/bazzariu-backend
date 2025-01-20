import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, BusinessTag } from '@prisma/client';

@Injectable()
export class BusinessTagService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.BusinessTagCreateInput): Promise<BusinessTag> {
    return this.prisma.businessTag.create({
      data,
    });
  }

  async findAll(): Promise<BusinessTag[]> {
    return this.prisma.businessTag.findMany();
  }

  async findOne(id: string): Promise<BusinessTag | null> {
    return this.prisma.businessTag.findUnique({
      where: { id },
    });
  }

  async update(
    id: string,
    data: Prisma.BusinessTagUpdateInput,
  ): Promise<BusinessTag> {
    return this.prisma.businessTag.update({
      where: { id },
      data,
    });
  }

  async delete(id: string): Promise<BusinessTag> {
    return this.prisma.businessTag.delete({
      where: { id },
    });
  }
}
