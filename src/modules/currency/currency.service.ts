import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, Currency } from '@prisma/client';
import { ServiceErrorHandler } from 'src/common/decorators/ServiceErrorHandler';

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
  async findAll(page: number = 1, limit: number = 10): Promise<Currency[]> {
    const skip = (page - 1) * limit;

    return this.prisma.currency.findMany({
      skip,
      take: limit,
    });
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
