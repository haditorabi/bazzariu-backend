import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, Country } from '@prisma/client';
import { CommonProvince } from 'src/graphql/province.type';
import { ServiceErrorHandler } from 'src/common/decorators/ServiceErrorHandler';
import { PaginationArgs } from 'src/graphql/pagination-args-types';

@Injectable()
export class CountryService {
  constructor(private prisma: PrismaService) {}

  @ServiceErrorHandler('create country') // Error handling
  async create(data: Prisma.CountryCreateInput): Promise<Country> {
    return this.prisma.country.create({
      data,
    });
  }

  @ServiceErrorHandler('findAll countries') // Error handling
  async findAll(paginationArgs: PaginationArgs): Promise<Country[]> {
    const { take, skip } = paginationArgs;

    return this.prisma.country.findMany({
      skip,
      take,
    });
  }

  @ServiceErrorHandler('find one country') // Error handling
  async findOne(id: string): Promise<Country | null> {
    return this.prisma.country.findUnique({
      where: { id },
    });
  }

  @ServiceErrorHandler('findProvincesByCountryId') // Error handling
  async findProvincesByCountryId(
    countryId: string,
    { page, limit }: { page: number; limit: number },
  ): Promise<CommonProvince[]> {
    return this.prisma.province.findMany({
      where: { countryId },
      skip: (page - 1) * limit,
      take: limit,
    });
  }

  @ServiceErrorHandler('update country') // Error handling
  async update(id: string, data: Prisma.CountryUpdateInput): Promise<Country> {
    return this.prisma.country.update({
      where: { id },
      data,
    });
  }

  @ServiceErrorHandler('delete country') // Error handling
  async delete(id: string): Promise<Country> {
    return this.prisma.country.delete({
      where: { id },
    });
  }
}
