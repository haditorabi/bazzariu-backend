import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, Payment, User, Business, PaymentMethod } from '@prisma/client';
import { ServiceErrorHandler } from 'src/common/decorators/ServiceErrorHandler';
import { PaginationArgs } from 'src/graphql/pagination-args-types';

@Injectable()
export class PaymentService {
  constructor(private prisma: PrismaService) {}

  @ServiceErrorHandler('Create Payment') // Adding ServiceErrorHandler decorator
  async create(data: Prisma.PaymentCreateInput): Promise<Payment> {
    return this.prisma.payment.create({
      data,
    });
  }

  @ServiceErrorHandler('Find All Payments') // Adding ServiceErrorHandler decorator
  async findAll(paginationArgs: PaginationArgs): Promise<Payment[]> {
    const { take, skip } = paginationArgs;
    return this.prisma.payment.findMany({
      skip,
      take,
    });
  }
  @ServiceErrorHandler('find all Payment')
  async findAndCount(
    paginationArgs: PaginationArgs,
  ): Promise<[Payment[], number]> {
    const { take, skip } = paginationArgs;
    const [items, totalCount] = await this.prisma.$transaction([
      this.prisma.payment.findMany({
        skip,
        take,
      }),
      this.prisma.payment.count(),
    ]);
    return [items, totalCount];
  }
  @ServiceErrorHandler('Find One Payment') // Adding ServiceErrorHandler decorator
  async findOne(id: string): Promise<Payment | null> {
    return this.prisma.payment.findUnique({
      where: { id },
    });
  }

  @ServiceErrorHandler('Update Payment') // Adding ServiceErrorHandler decorator
  async update(id: string, data: Prisma.PaymentUpdateInput): Promise<Payment> {
    return this.prisma.payment.update({
      where: { id },
      data,
    });
  }

  @ServiceErrorHandler('Delete Payment') // Adding ServiceErrorHandler decorator
  async delete(id: string): Promise<Payment> {
    return this.prisma.payment.delete({
      where: { id },
    });
  }
  async findUserById(userId: string): Promise<User> {
    return this.prisma.user.findUnique({
      where: { id: userId },
    });
  }

  async findBusinessById(businessId: string | null): Promise<Business | null> {
    if (!businessId) return null;
    return this.prisma.business.findUnique({
      where: { id: businessId },
    });
  }

  async findPaymentMethodById(paymentMethodId: string): Promise<PaymentMethod> {
    return this.prisma.paymentMethod.findUnique({
      where: { id: paymentMethodId },
    });
  }
}
