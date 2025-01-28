import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, Country } from '@prisma/client';
import { CommonProvince } from 'src/graphql/province.type';

@Injectable()
export class CountryService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.CountryCreateInput): Promise<Country> {
    return this.prisma.country.create({
      data,
    });
  }

  async findAll(): Promise<Country[]> {
    return this.prisma.country.findMany();
  }

  async findOne(id: string): Promise<Country | null> {
    return this.prisma.country.findUnique({
      where: { id },
    });
  }
  async findProvincesByCountryId(countryId: string): Promise<CommonProvince[]> {
    return this.prisma.province.findMany({ where: { countryId } });
  }

  async update(id: string, data: Prisma.CountryUpdateInput): Promise<Country> {
    return this.prisma.country.update({
      where: { id },
      data,
    });
  }

  async delete(id: string): Promise<Country> {
    return this.prisma.country.delete({
      where: { id },
    });
  }
}
