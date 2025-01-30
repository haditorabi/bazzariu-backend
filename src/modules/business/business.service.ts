import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  Prisma,
  Business,
  BusinessHour,
  BusinessLocation,
} from '@prisma/client';
import { ServiceErrorHandler } from 'src/common/decorators/ServiceErrorHandler';
import { CommonRegion } from 'src/graphql/region.type';
import { CommonBusinessBooking } from 'src/graphql/business-booking.type';
import { CommonBusinessDeal } from 'src/graphql/business-deal.type';
import { CommonBusinessProduct } from 'src/graphql/business-product.type';
import { PaginationArgs } from 'src/graphql/pagination-args-types';

@Injectable()
export class BusinessService {
  constructor(private prisma: PrismaService) {}

  @ServiceErrorHandler('create a business')
  async create(data: Prisma.BusinessCreateInput): Promise<Business> {
    return this.prisma.business.create({
      data,
    });
  }

  @ServiceErrorHandler('retrieve all businesses with pagination')
  async findAll(paginationArgs: PaginationArgs): Promise<Business[]> {
    const { take, skip } = paginationArgs;
    return this.prisma.business.findMany({
      skip,
      take,
    });
  }

  @ServiceErrorHandler('count all businesses')
  async count(): Promise<number> {
    return this.prisma.business.count();
  }

  @ServiceErrorHandler('retrieve a single business')
  async findOne(id: string): Promise<Business | null> {
    return this.prisma.business.findUnique({
      where: { id },
    });
  }

  @ServiceErrorHandler('update a business')
  async update(
    id: string,
    data: Prisma.BusinessUpdateInput,
  ): Promise<Business> {
    return this.prisma.business.update({
      where: { id },
      data,
    });
  }

  @ServiceErrorHandler('delete a business')
  async delete(id: string): Promise<Business> {
    return this.prisma.business.delete({
      where: { id },
    });
  }
  @ServiceErrorHandler('retrieve region of a business')
  async getRegion(businessId: string): Promise<CommonRegion | null> {
    const business = await this.prisma.business.findUnique({
      where: { id: businessId },
      include: { region: true },
    });
    return business?.region || null;
  }

  @ServiceErrorHandler('retrieve bookings of a business')
  async getBusinessBookings(
    businessId: string,
  ): Promise<CommonBusinessBooking[] | null> {
    const business = await this.prisma.business.findUnique({
      where: { id: businessId },
      include: { BusinessBooking: true },
    });
    return business?.BusinessBooking || null;
  }

  @ServiceErrorHandler('retrieve deals of a business')
  async getBusinessDeals(
    businessId: string,
  ): Promise<CommonBusinessDeal[] | null> {
    const business = await this.prisma.business.findUnique({
      where: { id: businessId },
      include: { BusinessDeal: true },
    });
    return business?.BusinessDeal || null;
  }

  @ServiceErrorHandler('retrieve hours of a business')
  async getBusinessHours(businessId: string): Promise<BusinessHour[] | null> {
    const business = await this.prisma.business.findUnique({
      where: { id: businessId },
      include: { BusinessHour: true },
    });
    return business?.BusinessHour || null;
  }

  @ServiceErrorHandler('retrieve locations of a business')
  async getBusinessLocations(
    businessId: string,
  ): Promise<BusinessLocation[] | null> {
    const business = await this.prisma.business.findUnique({
      where: { id: businessId },
      include: { BusinessLocation: true },
    });
    return business?.BusinessLocation || null;
  }

  @ServiceErrorHandler('retrieve products of a business')
  async getBusinessProducts(
    businessId: string,
  ): Promise<CommonBusinessProduct[] | null> {
    const business = await this.prisma.business.findUnique({
      where: { id: businessId },
      include: { BusinessProduct: true },
    });
    return (
      business?.BusinessProduct.map((product) => ({
        ...product,
        business: businessId,
      })) || null
    );
  }
}
