import { Test, TestingModule } from '@nestjs/testing';
import { RegionService } from './region.service';
import { PrismaService } from '../prisma/prisma.service';
import { Region, RegionStatus } from '@prisma/client';
import { PaginationArgs } from 'src/graphql/pagination-args-types';
import { Prisma } from '@prisma/client';

// Mock data for testing
const mockRegion: Region = {
  id: '1',
  name: 'Sample',
  status: RegionStatus.ACTIVE,
  countryId: '333',
  cityId: '3333',
  boundry: '1111',
};

// Mock implementation of the PrismaService
const mockPrismaService = {
  region: {
    create: jest.fn().mockResolvedValue(mockRegion),
    findMany: jest.fn().mockResolvedValue([mockRegion]),
    findUnique: jest.fn().mockResolvedValue(mockRegion),
    update: jest.fn().mockResolvedValue(mockRegion),
    delete: jest.fn().mockResolvedValue(mockRegion),
  },
};

describe('RegionService', () => {
  let service: RegionService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RegionService,
        {
          provide: PrismaService,
          useValue: mockPrismaService, // Inject the mocked PrismaService
        },
      ],
    }).compile();

    service = module.get<RegionService>(RegionService);
    prisma = module.get<PrismaService>(PrismaService);
  });
  describe('create', () => {
    it('should create and return a region', async () => {
      const input: Prisma.RegionCreateInput = {
        ...mockRegion,
        country: { connect: { id: mockRegion.countryId } },
        city: { connect: { id: mockRegion.cityId } },
      };

      const result = await service.create(input);
      expect(prisma.region.create).toHaveBeenCalledWith({
        data: input,
      });
      expect(result).toEqual(mockRegion);
    });
  });

  describe('findAll', () => {
    it('should return an array of regions', async () => {
      const paginationArgs: PaginationArgs = {
        skip: 0,
        take: 10,
        limit: 10,
        page: 1,
      };

      // Call the service method
      const result = await service.findAll(paginationArgs);

      // Expect the prisma method to have been called
      expect(prisma.region.findMany).toHaveBeenCalledWith({
        skip: paginationArgs.skip,
        take: paginationArgs.take,
      });
      expect(result).toEqual([mockRegion]);
    });
  });

  describe('findOne', () => {
    it('should return a single region by ID', async () => {
      const id = '1';

      // Call the service method
      const result = await service.findOne(id);

      // Expect the prisma method to have been called
      expect(prisma.region.findUnique).toHaveBeenCalledWith({
        where: { id },
      });
      expect(result).toEqual(mockRegion);
    });
  });

  describe('update', () => {
    it('should update and return the modified region', async () => {
      const id = '1';
      const updateData: Prisma.RegionUpdateInput = { name: 'Updated' };

      // Call the service method
      const result = await service.update(id, updateData);

      // Expect the prisma method to have been called with correct arguments
      expect(prisma.region.update).toHaveBeenCalledWith({
        where: { id },
        data: updateData,
      });
      expect(result).toEqual(mockRegion);
    });
  });

  describe('delete', () => {
    it('should delete a region and return it', async () => {
      const id = '1';

      // Call the service method
      const result = await service.delete(id);

      // Expect the prisma method to have been called
      expect(prisma.region.delete).toHaveBeenCalledWith({
        where: { id },
      });
      expect(result).toEqual(mockRegion);
    });
  });
});
