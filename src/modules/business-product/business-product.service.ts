import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, BusinessProduct } from '@prisma/client';
import { ServiceErrorHandler } from 'src/common/decorators/ServiceErrorHandler';
import { PaginationArgs } from 'src/graphql/pagination-args-types';
@Injectable()
export class BusinessProductService {
  constructor(private prisma: PrismaService) {}

  @ServiceErrorHandler('Create BusinessProduct')
  async create(
    data: Prisma.BusinessProductCreateInput,
  ): Promise<BusinessProduct> {
    return this.prisma.businessProduct.create({
      data,
    });
  }

  @ServiceErrorHandler('Get All BusinessProducts')
  async findAll(paginationArgs: PaginationArgs): Promise<BusinessProduct[]> {
    const { take, skip } = paginationArgs;
    return this.prisma.businessProduct.findMany({
      skip,
      take,
    });
  }

  @ServiceErrorHandler('Find BusinessProduct')
  async findOne(id: string): Promise<BusinessProduct | null> {
    return this.prisma.businessProduct.findUnique({
      where: { id },
    });
  }

  @ServiceErrorHandler('Update BusinessProduct')
  async update(
    id: string,
    data: Prisma.BusinessProductUpdateInput,
  ): Promise<BusinessProduct> {
    return this.prisma.businessProduct.update({
      where: { id },
      data,
    });
  }

  @ServiceErrorHandler('Delete BusinessProduct')
  async delete(id: string): Promise<BusinessProduct> {
    return this.prisma.businessProduct.delete({
      where: { id },
    });
  }

  @ServiceErrorHandler('Get Product Category')
  async getProductCategory(categoryId: string | undefined) {
    if (!categoryId) return null;
    return this.prisma.productCategory.findUnique({
      where: { id: categoryId },
    });
  }

  @ServiceErrorHandler('Get Business Deal')
  async getBusinessDeal(dealIds: string[] | undefined) {
    if (!dealIds || dealIds.length === 0) return null;
    return this.prisma.businessDeal.findMany({
      where: {
        id: {
          in: dealIds,
        },
      },
    });
  }

  @ServiceErrorHandler('Get Business Product Price')
  async getBusinessProductPrice(productId: string) {
    return this.prisma.businessProductPrice.findFirst({
      where: { businessProductId: productId },
    });
  }
}
