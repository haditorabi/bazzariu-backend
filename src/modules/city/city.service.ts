import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, City } from '@prisma/client';
import { PaginationArgs } from 'src/graphql/pagination-args-types';

@Injectable()
export class CityService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.CityCreateInput): Promise<City> {
    return this.prisma.city.create({
      data,
    });
  }

  async findAll(paginationArgs: PaginationArgs): Promise<City[]> {
    const { take, skip } = paginationArgs;

    return this.prisma.city.findMany({
      skip,
      take,
    });
  }

  async findOne(id: string): Promise<City | null> {
    return this.prisma.city.findUnique({
      where: { id },
    });
  }

  async update(id: string, data: Prisma.CityUpdateInput): Promise<City> {
    return this.prisma.city.update({
      where: { id },
      data,
    });
  }

  async delete(id: string): Promise<City> {
    return this.prisma.city.delete({
      where: { id },
    });
  }
}
