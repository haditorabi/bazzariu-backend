import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, Currency } from '@prisma/client';
import { ServiceErrorHandler } from 'src/common/decorators/ServiceErrorHandler';
import { PaginationArgs } from 'src/graphql/pagination-args-types';

@Injectable()
export class CurrencyService {
  constructor(private prisma: PrismaService) {}

  @ServiceErrorHandler('createCurrency')
  async create(data: Prisma.CurrencyCreateInput): Promise<Currency> {
    return this.prisma.currency.create({
      data,
    });
  }

  @ServiceErrorHandler('findAllCurrencies')
  async findAll(paginationArgs: PaginationArgs): Promise<Currency[]> {
    const { take, skip } = paginationArgs;

    return this.prisma.currency.findMany({
      skip,
      take,
    });
  }
  @ServiceErrorHandler('find all Currency')
  async findAndCount(
    paginationArgs: PaginationArgs,
  ): Promise<[Currency[], number]> {
    const { take, skip } = paginationArgs;
    const [items, totalCount] = await this.prisma.$transaction([
      this.prisma.currency.findMany({
        skip,
        take,
      }),
      this.prisma.currency.count(),
    ]);
    return [items, totalCount];
  }
  @ServiceErrorHandler('findOneCurrency')
  async findOne(id: string): Promise<Currency | null> {
    return this.prisma.currency.findUnique({
      where: { id },
    });
  }

  @ServiceErrorHandler('updateCurrency')
  async update(
    id: string,
    data: Prisma.CurrencyUpdateInput,
  ): Promise<Currency> {
    return this.prisma.currency.update({
      where: { id },
      data,
    });
  }

  @ServiceErrorHandler('deleteCurrency')
  async delete(id: string): Promise<Currency> {
    return this.prisma.currency.delete({
      where: { id },
    });
  }
}
