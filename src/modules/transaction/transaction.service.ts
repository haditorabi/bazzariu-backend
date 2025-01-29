import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, Transaction } from '@prisma/client';
import { ServiceErrorHandler } from 'src/common/decorators/ServiceErrorHandler';

@Injectable()
export class TransactionService {
  constructor(private prisma: PrismaService) {}

  @ServiceErrorHandler('create transaction')
  async create(data: Prisma.TransactionCreateInput): Promise<Transaction> {
    return this.prisma.transaction.create({ data });
  }

  @ServiceErrorHandler('find all transactions')
  async findAll(skip = 0, take = 10): Promise<Transaction[]> {
    return this.prisma.transaction.findMany({
      skip,
      take,
    });
  }

  @ServiceErrorHandler('find transaction by ID')
  async findOne(id: string): Promise<Transaction | null> {
    return this.prisma.transaction.findUnique({ where: { id } });
  }

  @ServiceErrorHandler('update transaction')
  async update(
    id: string,
    data: Prisma.TransactionUpdateInput,
  ): Promise<Transaction> {
    return this.prisma.transaction.update({ where: { id }, data });
  }

  @ServiceErrorHandler('delete transaction')
  async delete(id: string): Promise<Transaction> {
    return this.prisma.transaction.delete({ where: { id } });
  }

  @ServiceErrorHandler('get payment')
  async getPayment(paymentId: string) {
    return this.prisma.payment.findUnique({ where: { id: paymentId } });
  }

  @ServiceErrorHandler('get business')
  async getBusiness(businessId: string) {
    return this.prisma.business.findUnique({ where: { id: businessId } });
  }

  @ServiceErrorHandler('get user')
  async getUser(userId: string) {
    return this.prisma.user.findUnique({ where: { id: userId } });
  }
}
