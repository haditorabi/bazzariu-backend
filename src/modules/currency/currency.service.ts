import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, Currency } from '@prisma/client';

@Injectable()
export class CurrencyService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.CurrencyCreateInput): Promise<Currency> {
    return this.prisma.currency.create({
      data,
    });
  }

  async findAll(): Promise<Currency[]> {
    return this.prisma.currency.findMany();
  }

  async findOne(id: string): Promise<Currency | null> {
    return this.prisma.currency.findUnique({
      where: { id },
    });
  }

  async update(
    id: string,
    data: Prisma.CurrencyUpdateInput,
  ): Promise<Currency> {
    return this.prisma.currency.update({
      where: { id },
      data,
    });
  }

  async delete(id: string): Promise<Currency> {
    return this.prisma.currency.delete({
      where: { id },
    });
  }
}
