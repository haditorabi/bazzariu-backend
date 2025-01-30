import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, Amenity } from '@prisma/client';
import { ServiceErrorHandler } from 'src/common/decorators/ServiceErrorHandler';

@Injectable()
export class AmenityService {
  constructor(private prisma: PrismaService) {}

  @ServiceErrorHandler('create amenity')
  async create(data: Prisma.AmenityCreateInput): Promise<Amenity> {
    return this.prisma.amenity.create({ data });
  }

  @ServiceErrorHandler('find all amenities')
  async findAll(): Promise<Amenity[]> {
    return this.prisma.amenity.findMany();
  }

  @ServiceErrorHandler('find amenity by ID')
  async findOne(id: string): Promise<Amenity | null> {
    const amenity = await this.prisma.amenity.findUnique({
      where: { id },
    });
    if (!amenity) {
      throw new NotFoundException('Amenity not found');
    }
    return amenity;
  }

  @ServiceErrorHandler('update amenity')
  async update(id: string, data: Prisma.AmenityUpdateInput): Promise<Amenity> {
    return this.prisma.amenity.update({
      where: { id },
      data,
    });
  }

  @ServiceErrorHandler('delete amenity')
  async delete(id: string): Promise<Amenity> {
    return this.prisma.amenity.delete({
      where: { id },
    });
  }
}
