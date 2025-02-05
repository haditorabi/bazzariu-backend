import { Test, TestingModule } from '@nestjs/testing';
import { BusinessTagService } from './business-tag.service';
import { PrismaService } from '../prisma/prisma.service';
import { BusinessTag } from '@prisma/client';
import { PaginationArgs } from 'src/graphql/pagination-args-types';
import { Prisma } from '@prisma/client';

// Mock data for testing
const mockBusinessTag: BusinessTag = {
  id: '1',
  name: 'Sample',
  status: 'ACTIVE', // Prisma enum value
  createdAt: new Date(),
};

// Mock implementation of the PrismaService
const mockPrismaService = {
  businessTag: {
    findMany: jest.fn().mockResolvedValue([mockBusinessTag]),
    findUnique: jest.fn().mockResolvedValue(mockBusinessTag),
    update: jest.fn().mockResolvedValue(mockBusinessTag),
    delete: jest.fn().mockResolvedValue(mockBusinessTag),
  },
};

describe('BusinessTagService', () => {
  let service: BusinessTagService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BusinessTagService,
        {
          provide: PrismaService,
          useValue: mockPrismaService, // Inject the mocked PrismaService
        },
      ],
    }).compile();

    service = module.get<BusinessTagService>(BusinessTagService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  describe('findAll', () => {
    it('should return an array of business-tags', async () => {
      const paginationArgs: PaginationArgs = {
        skip: 0,
        take: 10,
        limit: 10,
        page: 1,
      };

      // Call the service method
      const result = await service.findAll(paginationArgs);

      // Expect the prisma method to have been called
      expect(prisma.businessTag.findMany).toHaveBeenCalledWith({
        skip: paginationArgs.skip,
        take: paginationArgs.take,
      });
      expect(result).toEqual([mockBusinessTag]);
    });
  });

  describe('findOne', () => {
    it('should return a single business-tag by ID', async () => {
      const id = '1';

      // Call the service method
      const result = await service.findOne(id);

      // Expect the prisma method to have been called
      expect(prisma.businessTag.findUnique).toHaveBeenCalledWith({
        where: { id },
      });
      expect(result).toEqual(mockBusinessTag);
    });
  });

  describe('update', () => {
    it('should update and return the modified business-tag', async () => {
      const id = '1';
      const updateData: Prisma.BusinessTagUpdateInput = { name: 'Updated' };

      // Call the service method
      const result = await service.update(id, updateData);

      // Expect the prisma method to have been called with correct arguments
      expect(prisma.businessTag.update).toHaveBeenCalledWith({
        where: { id },
        data: updateData,
      });
      expect(result).toEqual(mockBusinessTag);
    });
  });

  describe('delete', () => {
    it('should delete a business-tag and return it', async () => {
      const id = '1';

      // Call the service method
      const result = await service.delete(id);

      // Expect the prisma method to have been called
      expect(prisma.businessTag.delete).toHaveBeenCalledWith({
        where: { id },
      });
      expect(result).toEqual(mockBusinessTag);
    });
  });
});
