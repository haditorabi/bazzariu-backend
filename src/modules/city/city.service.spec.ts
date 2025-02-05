import { Test, TestingModule } from '@nestjs/testing';
import { CityService } from './city.service';
import { PrismaService } from '../prisma/prisma.service';
import { City, CityStatus } from '@prisma/client';
import { PaginationArgs } from 'src/graphql/pagination-args-types';
import { Prisma } from '@prisma/client';

// Mock data for testing
const mockCity: City = {
  id: '1',
  name: 'test',
  provinceId: '1',
  status: CityStatus.ACTIVE,
};

// Mock implementation of the PrismaService
const mockPrismaService = {
  city: {
    findMany: jest.fn().mockResolvedValue([mockCity]),
    findUnique: jest.fn().mockResolvedValue(mockCity),
    update: jest.fn().mockResolvedValue(mockCity),
    delete: jest.fn().mockResolvedValue(mockCity),
  },
};

describe('CityService', () => {
  let service: CityService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CityService,
        {
          provide: PrismaService,
          useValue: mockPrismaService, // Inject the mocked PrismaService
        },
      ],
    }).compile();

    service = module.get<CityService>(CityService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  describe('findAll', () => {
    it('should return an array of business tags', async () => {
      const paginationArgs: PaginationArgs = {
        skip: 0,
        take: 10,
        limit: 10,
        page: 1,
      };

      // Call the service method
      const result = await service.findAll(paginationArgs);

      // Expect the prisma method to have been called
      expect(prisma.city.findMany).toHaveBeenCalledWith({
        skip: paginationArgs.skip,
        take: paginationArgs.take,
      });
      expect(result).toEqual([mockCity]);
    });
  });

  describe('findOne', () => {
    it('should return a single business tag by ID', async () => {
      const id = '1';

      // Call the service method
      const result = await service.findOne(id);

      // Expect the prisma method to have been called
      expect(prisma.city.findUnique).toHaveBeenCalledWith({
        where: { id },
      });
      expect(result).toEqual(mockCity);
    });
  });

  describe('update', () => {
    it('should update and return the modified business tag', async () => {
      const id = '1';
      const updateData: Prisma.CityUpdateInput = { name: 'Updated Tag' };

      // Call the service method
      const result = await service.update(id, updateData);

      // Expect the prisma method to have been called with correct arguments
      expect(prisma.city.update).toHaveBeenCalledWith({
        where: { id },
        data: updateData,
      });
      expect(result).toEqual(mockCity);
    });
  });

  describe('delete', () => {
    it('should delete a business tag and return it', async () => {
      const id = '1';

      // Call the service method
      const result = await service.delete(id);

      // Expect the prisma method to have been called
      expect(prisma.city.delete).toHaveBeenCalledWith({
        where: { id },
      });
      expect(result).toEqual(mockCity);
    });
  });
});
