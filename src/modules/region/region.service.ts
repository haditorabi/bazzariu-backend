import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { City, Country, Prisma, Region } from '@prisma/client';
import { ServiceErrorHandler } from 'src/common/decorators/ServiceErrorHandler';

@Injectable()
export class RegionService {
  constructor(private prisma: PrismaService) {}

  @ServiceErrorHandler('create region')
  async create(data: Prisma.RegionCreateInput): Promise<Region> {
    return this.prisma.region.create({
      data,
    });
  }

  @ServiceErrorHandler('find all regions')
  async findAll(params: { page?: number; limit?: number }): Promise<Region[]> {
    const { page = 1, limit = 10 } = params;
    return this.prisma.region.findMany({
      skip: (page - 1) * limit,
      take: limit,
    });
  }

  @ServiceErrorHandler('find region by ID')
  async findOne(id: string): Promise<Region | null> {
    return this.prisma.region.findUnique({
      where: { id },
    });
  }

  @ServiceErrorHandler('update region')
  async update(id: string, data: Prisma.RegionUpdateInput): Promise<Region> {
    return this.prisma.region.update({
      where: { id },
      data,
    });
  }

  @ServiceErrorHandler('delete region')
  async delete(id: string): Promise<Region> {
    return this.prisma.region.delete({
      where: { id },
    });
  }

  @ServiceErrorHandler('get country by ID')
  async getCountry(countryId: string): Promise<Country> {
    return this.prisma.country.findUnique({
      where: { id: countryId },
    });
  }

  @ServiceErrorHandler('get city by ID')
  async getCity(cityId: string): Promise<City> {
    return this.prisma.city.findUnique({
      where: { id: cityId },
    });
  }
}
