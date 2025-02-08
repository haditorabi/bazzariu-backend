import { Test, TestingModule } from '@nestjs/testing';
import { BusinessService } from './business.service';
import { PrismaService } from '../prisma/prisma.service';
import { Business, BusinessStatus } from '@prisma/client';
import { PaginationArgs } from 'src/graphql/pagination-args-types';
import { Prisma } from '@prisma/client';

// Mock data for testing
const mockBusiness: Business = {
  id: '1',
  createdAt: new Date(),
  name: '',
  isClaimed: false,
  status: BusinessStatus.ACTIVE,
  description: '222',
  website: '222',
  businessCategoryId: ['1'],
  amenityId: ['1'],
  languageId: ['1'],
  regionId: '1',
  claimedBy: '1',
  mediaId: ['1'],
  updatedAt: new Date(),
};

// Mock implementation of the PrismaService
const mockPrismaService = {
  business: {
    create: jest.fn().mockResolvedValue(mockBusiness),
    findMany: jest.fn().mockResolvedValue([mockBusiness]),
    findUnique: jest.fn().mockResolvedValue(mockBusiness),
    update: jest.fn().mockResolvedValue(mockBusiness),
    delete: jest.fn().mockResolvedValue(mockBusiness),
  },
};

describe('BusinessService', () => {
  let service: BusinessService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BusinessService,
        {
          provide: PrismaService,
          useValue: mockPrismaService, // Inject the mocked PrismaService
        },
      ],
    }).compile();

    service = module.get<BusinessService>(BusinessService);
    prisma = module.get<PrismaService>(PrismaService);
  });
  describe('create', () => {
    it('should create and return a business', async () => {
      const input: Prisma.BusinessCreateInput = {
        ...mockBusiness,
        region: {
          connect: {
            id: '1',
          },
        },
      };

      const result = await service.create(input);
      // expect(prisma.business.create).toHaveBeenCalledWith({
      //   data: input,
      // });
      expect(result).toEqual(mockBusiness);
    });
  });

  describe('findAll', () => {
    it('should return an array of businesss', async () => {
      const paginationArgs: PaginationArgs = {
        skip: 0,
        take: 10,
        limit: 10,
        page: 1,
      };

      // Call the service method
      const result = await service.findAll(paginationArgs);

      // Expect the prisma method to have been called
      expect(prisma.business.findMany).toHaveBeenCalledWith({
        skip: paginationArgs.skip,
        take: paginationArgs.take,
      });
      expect(result).toEqual([mockBusiness]);
    });
  });

  describe('findOne', () => {
    it('should return a single business by ID', async () => {
      const id = '1';

      // Call the service method
      const result = await service.findOne(id);

      // Expect the prisma method to have been called
      expect(prisma.business.findUnique).toHaveBeenCalledWith({
        where: { id },
      });
      expect(result).toEqual(mockBusiness);
    });
  });

  describe('update', () => {
    it('should update and return the modified business', async () => {
      const id = '1';
      const updateData: Prisma.BusinessUpdateInput = { name: 'Updated' };

      // Call the service method
      const result = await service.update(id, updateData);

      // Expect the prisma method to have been called with correct arguments
      expect(prisma.business.update).toHaveBeenCalledWith({
        where: { id },
        data: updateData,
      });
      expect(result).toEqual(mockBusiness);
    });
  });

  describe('delete', () => {
    it('should delete a business and return it', async () => {
      const id = '1';

      // Call the service method
      const result = await service.delete(id);

      // Expect the prisma method to have been called
      expect(prisma.business.delete).toHaveBeenCalledWith({
        where: { id },
      });
      expect(result).toEqual(mockBusiness);
    });
  });
});
