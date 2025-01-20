import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, PaymentMethod } from '@prisma/client';

@Injectable()
export class PaymentMethodService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.PaymentMethodCreateInput): Promise<PaymentMethod> {
    return this.prisma.paymentMethod.create({
      data,
    });
  }

  async findAll(): Promise<PaymentMethod[]> {
    return this.prisma.paymentMethod.findMany();
  }

  async findOne(id: string): Promise<PaymentMethod | null> {
    return this.prisma.paymentMethod.findUnique({
      where: { id },
    });
  }

  async update(
    id: string,
    data: Prisma.PaymentMethodUpdateInput,
  ): Promise<PaymentMethod> {
    return this.prisma.paymentMethod.update({
      where: { id },
      data,
    });
  }

  async delete(id: string): Promise<PaymentMethod> {
    return this.prisma.paymentMethod.delete({
      where: { id },
    });
  }
}
