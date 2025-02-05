import { Test, TestingModule } from '@nestjs/testing';
import { BusinessUpdateService } from './business-update.service';
import { PrismaService } from '../prisma/prisma.service';
import { BusinessUpdate, BusinessUpdateStatus } from '@prisma/client';
import { PaginationArgs } from 'src/graphql/pagination-args-types';
import { Prisma } from '@prisma/client';

// Mock data for testing
const mockBusinessUpdate: BusinessUpdate = {
  id: '1',
  status: BusinessUpdateStatus.ACTIVE,
  createdAt: new Date(),
  // business: {
  //   id: '1',
  //   name: 'Test Business',
  //   isClaimed: true,
  //   status: 'ACTIVE',
  //   createdAt: new Date(),
  //   updatedAt: new Date(),
  // },
  businessId: '',
  context: '',
  type: 'NEWPRODUCTS',
  startAt: undefined,
  endAt: undefined,
  updatedAt: undefined,
};

// Mock implementation of the PrismaService
const mockPrismaService = {
  businessUpdate: {
    findMany: jest.fn().mockResolvedValue([mockBusinessUpdate]),
    findUnique: jest.fn().mockResolvedValue(mockBusinessUpdate),
    update: jest.fn().mockResolvedValue(mockBusinessUpdate),
    delete: jest.fn().mockResolvedValue(mockBusinessUpdate),
  },
};

describe('BusinessUpdateService', () => {
  let service: BusinessUpdateService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BusinessUpdateService,
        {
          provide: PrismaService,
          useValue: mockPrismaService, // Inject the mocked PrismaService
        },
      ],
    }).compile();

    service = module.get<BusinessUpdateService>(BusinessUpdateService);
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
      expect(prisma.businessUpdate.findMany).toHaveBeenCalledWith({
        skip: paginationArgs.skip,
        take: paginationArgs.take,
      });
      expect(result).toEqual([mockBusinessUpdate]);
    });
  });

  describe('findOne', () => {
    it('should return a single business tag by ID', async () => {
      const id = '1';

      // Call the service method
      const result = await service.findOne(id);

      // Expect the prisma method to have been called
      expect(prisma.businessUpdate.findUnique).toHaveBeenCalledWith({
        where: { id },
      });
      expect(result).toEqual(mockBusinessUpdate);
    });
  });

  describe('update', () => {
    it('should update and return the modified business tag', async () => {
      const id = '1';
      const updateData: Prisma.BusinessUpdateUpdateInput = {
        context: 'Updated Tag',
      };

      // Call the service method
      const result = await service.update(id, updateData);

      // Expect the prisma method to have been called with correct arguments
      expect(prisma.businessUpdate.update).toHaveBeenCalledWith({
        where: { id },
        data: updateData,
      });
      expect(result).toEqual(mockBusinessUpdate);
    });
  });

  describe('delete', () => {
    it('should delete a business tag and return it', async () => {
      const id = '1';

      // Call the service method
      const result = await service.delete(id);

      // Expect the prisma method to have been called
      expect(prisma.businessUpdate.delete).toHaveBeenCalledWith({
        where: { id },
      });
      expect(result).toEqual(mockBusinessUpdate);
    });
  });
});
