import { Test, TestingModule } from '@nestjs/testing';
import { ProvinceService } from './province.service';
import { PrismaService } from '../prisma/prisma.service';
import { Province, ProvinceStatus } from '@prisma/client';
import { PaginationArgs } from 'src/graphql/pagination-args-types';
import { Prisma } from '@prisma/client';

// Mock data for testing
const mockProvince: Province = {
  id: '1',
  name: 'Sample',
  status: ProvinceStatus.ACTIVE,
  countryId: '1',
};

// Mock implementation of the PrismaService
const mockPrismaService = {
  province: {
    create: jest.fn().mockResolvedValue(mockProvince),
    findMany: jest.fn().mockResolvedValue([mockProvince]),
    findUnique: jest.fn().mockResolvedValue(mockProvince),
    update: jest.fn().mockResolvedValue(mockProvince),
    delete: jest.fn().mockResolvedValue(mockProvince),
  },
};

describe('ProvinceService', () => {
  let service: ProvinceService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProvinceService,
        {
          provide: PrismaService,
          useValue: mockPrismaService, // Inject the mocked PrismaService
        },
      ],
    }).compile();

    service = module.get<ProvinceService>(ProvinceService);
    prisma = module.get<PrismaService>(PrismaService);
  });
  describe('create', () => {
    it('should create and return a province', async () => {
      const input: Prisma.ProvinceCreateInput = {
        ...mockProvince,
        country: {
          connect: { id: mockProvince.countryId },
        },
      };

      const result = await service.create(input);
      expect(prisma.province.create).toHaveBeenCalledWith({
        data: input,
      });
      expect(result).toEqual(mockProvince);
    });
  });

  describe('findAll', () => {
    it('should return an array of provinces', async () => {
      const paginationArgs: PaginationArgs = {
        skip: 0,
        take: 10,
        limit: 10,
        page: 1,
      };

      // Call the service method
      const result = await service.findAll(paginationArgs);

      // Expect the prisma method to have been called
      expect(prisma.province.findMany).toHaveBeenCalledWith({
        skip: paginationArgs.skip,
        take: paginationArgs.take,
      });
      expect(result).toEqual([mockProvince]);
    });
  });

  describe('findOne', () => {
    it('should return a single province by ID', async () => {
      const id = '1';

      // Call the service method
      const result = await service.findOne(id);

      // Expect the prisma method to have been called
      expect(prisma.province.findUnique).toHaveBeenCalledWith({
        where: { id },
      });
      expect(result).toEqual(mockProvince);
    });
  });

  describe('update', () => {
    it('should update and return the modified province', async () => {
      const id = '1';
      const updateData: Prisma.ProvinceUpdateInput = { name: 'Updated' };

      // Call the service method
      const result = await service.update(id, updateData);

      // Expect the prisma method to have been called with correct arguments
      expect(prisma.province.update).toHaveBeenCalledWith({
        where: { id },
        data: updateData,
      });
      expect(result).toEqual(mockProvince);
    });
  });

  describe('delete', () => {
    it('should delete a province and return it', async () => {
      const id = '1';

      // Call the service method
      const result = await service.delete(id);

      // Expect the prisma method to have been called
      expect(prisma.province.delete).toHaveBeenCalledWith({
        where: { id },
      });
      expect(result).toEqual(mockProvince);
    });
  });
});
