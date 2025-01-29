import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, DealsRedemption, User, BusinessDeal } from '@prisma/client';
import { ServiceErrorHandler } from 'src/common/decorators/ServiceErrorHandler';

@Injectable()
export class DealsRedemptionService {
  constructor(private prisma: PrismaService) {}

  @ServiceErrorHandler('create deal redemption')
  async create(
    data: Prisma.DealsRedemptionCreateInput,
  ): Promise<DealsRedemption> {
    return this.prisma.dealsRedemption.create({
      data,
    });
  }

  @ServiceErrorHandler('fetch all deal redemptions')
  async findAll(page: number, pageSize: number): Promise<DealsRedemption[]> {
    return this.prisma.dealsRedemption.findMany({
      skip: (page - 1) * pageSize,
      take: pageSize,
    });
  }

  @ServiceErrorHandler('fetch deal redemption by ID')
  async findOne(id: string): Promise<DealsRedemption | null> {
    return this.prisma.dealsRedemption.findUnique({
      where: { id },
    });
  }

  @ServiceErrorHandler('update deal redemption')
  async update(
    id: string,
    data: Prisma.DealsRedemptionUpdateInput,
  ): Promise<DealsRedemption> {
    return this.prisma.dealsRedemption.update({
      where: { id },
      data,
    });
  }

  @ServiceErrorHandler('delete deal redemption')
  async delete(id: string): Promise<DealsRedemption> {
    return this.prisma.dealsRedemption.delete({
      where: { id },
    });
  }

  // Fetch business deal related to the redemption
  @ServiceErrorHandler('fetch business deal')
  async getBusinessDeal(businessDealId: string): Promise<BusinessDeal | null> {
    return this.prisma.businessDeal.findUnique({
      where: { id: businessDealId },
    });
  }

  // Fetch user related to the redemption
  @ServiceErrorHandler('fetch user')
  async getUser(userId: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { id: userId },
    });
  }
}
