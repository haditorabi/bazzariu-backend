import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, Amenity } from '@prisma/client';

@Injectable()
export class AmenityService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.AmenityCreateInput): Promise<Amenity> {
    return this.prisma.amenity.create({
      data,
    });
  }

  async findAll(): Promise<Amenity[]> {
    return this.prisma.amenity.findMany();
  }

  async findOne(id: string): Promise<Amenity | null> {
    return this.prisma.amenity.findUnique({
      where: { id },
    });
  }

  async update(id: string, data: Prisma.AmenityUpdateInput): Promise<Amenity> {
    return this.prisma.amenity.update({
      where: { id },
      data,
    });
  }

  async delete(id: string): Promise<Amenity> {
    return this.prisma.amenity.delete({
      where: { id },
    });
  }
}
