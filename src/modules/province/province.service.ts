import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { City, Country, Prisma, Province } from '@prisma/client';
import { ServiceErrorHandler } from 'src/common/decorators/ServiceErrorHandler';
import { PaginationArgs } from 'src/graphql/pagination-args-types';

@Injectable()
export class ProvinceService {
  constructor(private prisma: PrismaService) {}

  @ServiceErrorHandler('create a province')
  async create(data: Prisma.ProvinceCreateInput): Promise<Province> {
    return this.prisma.province.create({
      data,
    });
  }

  @ServiceErrorHandler('retrieve provinces with pagination')
  async findAll(paginationArgs: PaginationArgs): Promise<Province[]> {
    const { take, skip } = paginationArgs;
    return this.prisma.province.findMany({
      skip,
      take,
    });
  }

  @ServiceErrorHandler('retrieve a province')
  async findOne(id: string): Promise<Province | null> {
    return this.prisma.province.findUnique({
      where: { id },
    });
  }

  @ServiceErrorHandler('update a province')
  async update(
    id: string,
    data: Prisma.ProvinceUpdateInput,
  ): Promise<Province> {
    return this.prisma.province.update({
      where: { id },
      data,
    });
  }

  @ServiceErrorHandler('delete a province')
  async delete(id: string): Promise<Province> {
    return this.prisma.province.delete({
      where: { id },
    });
  }

  @ServiceErrorHandler('retrieve cities for a province')
  async getCitiesForProvince(provinceId: string): Promise<City[]> {
    return this.prisma.city.findMany({
      where: { provinceId },
    });
  }

  @ServiceErrorHandler('retrieve the country of a province')
  async getCountry(countryId: string): Promise<Country> {
    return this.prisma.country.findUnique({
      where: { id: countryId },
    });
  }
}
