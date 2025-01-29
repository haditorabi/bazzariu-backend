import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, PaymentMethod } from '@prisma/client';
import { ServiceErrorHandler } from 'src/common/decorators/ServiceErrorHandler';

Injectable();
export class PaymentMethodService {
  constructor(private prisma: PrismaService) {}

  @ServiceErrorHandler('create payment method')
  async create(data: Prisma.PaymentMethodCreateInput): Promise<PaymentMethod> {
    return this.prisma.paymentMethod.create({
      data,
    });
  }

  @ServiceErrorHandler('find all payment methods')
  async findAll(
    params: { skip?: number; limit?: number } = {},
  ): Promise<PaymentMethod[]> {
    const { skip, limit } = params;
    return this.prisma.paymentMethod.findMany({
      skip,
      take: limit,
    });
  }

  @ServiceErrorHandler('find payment method by id')
  async findOne(id: string): Promise<PaymentMethod | null> {
    return this.prisma.paymentMethod.findUnique({
      where: { id },
    });
  }

  @ServiceErrorHandler('update payment method')
  async update(
    id: string,
    data: Prisma.PaymentMethodUpdateInput,
  ): Promise<PaymentMethod> {
    return this.prisma.paymentMethod.update({
      where: { id },
      data,
    });
  }

  @ServiceErrorHandler('delete payment method')
  async delete(id: string): Promise<PaymentMethod> {
    return this.prisma.paymentMethod.delete({
      where: { id },
    });
  }
}
