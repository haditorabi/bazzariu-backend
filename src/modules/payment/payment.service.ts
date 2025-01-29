import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, Payment, User, Business, PaymentMethod } from '@prisma/client';
import { ServiceErrorHandler } from 'src/common/decorators/ServiceErrorHandler';

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
  async findAll(skip: number = 0, take: number = 10): Promise<Payment[]> {
    return this.prisma.payment.findMany({
      skip, // Pagination: skip the first `skip` records
      take, // Pagination: take `take` records
    });
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
