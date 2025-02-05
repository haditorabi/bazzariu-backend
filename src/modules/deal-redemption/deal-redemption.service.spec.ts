import { Test, TestingModule } from '@nestjs/testing';
import { DealsRedemptionService } from './deal-redemption.service';
import { PrismaService } from '../prisma/prisma.service';
import { DealsRedemption, DealsRedemptionStatus } from '@prisma/client';
import { PaginationArgs } from 'src/graphql/pagination-args-types';
import { Prisma } from '@prisma/client';

// Mock data for testing
const mockDealsRedemption: DealsRedemption = {
  id: '1',
  createdAt: new Date(),
  businessDealId: '1',
  userId: 'dsfgh',
  expiresAt: new Date(),
  status: DealsRedemptionStatus.PENDING,
  updatedAt: new Date(),
  redeemedAt: new Date(),
};

// Mock implementation of the PrismaService
const mockPrismaService = {
  dealsRedemption: {
    findMany: jest.fn().mockResolvedValue([mockDealsRedemption]),
    findUnique: jest.fn().mockResolvedValue(mockDealsRedemption),
    update: jest.fn().mockResolvedValue(mockDealsRedemption),
    delete: jest.fn().mockResolvedValue(mockDealsRedemption),
  },
};

describe('DealsRedemptionService', () => {
  let service: DealsRedemptionService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DealsRedemptionService,
        {
          provide: PrismaService,
          useValue: mockPrismaService, // Inject the mocked PrismaService
        },
      ],
    }).compile();

    service = module.get<DealsRedemptionService>(DealsRedemptionService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  describe('findAll', () => {
    it('should return an array of deal-redemptions', async () => {
      const paginationArgs: PaginationArgs = {
        skip: 0,
        take: 10,
        limit: 10,
        page: 1,
      };

      // Call the service method
      const result = await service.findAll(paginationArgs);

      // Expect the prisma method to have been called
      expect(prisma.dealsRedemption.findMany).toHaveBeenCalledWith({
        skip: paginationArgs.skip,
        take: paginationArgs.take,
      });
      expect(result).toEqual([mockDealsRedemption]);
    });
  });

  describe('findOne', () => {
    it('should return a single deal-redemption by ID', async () => {
      const id = '1';

      // Call the service method
      const result = await service.findOne(id);

      // Expect the prisma method to have been called
      expect(prisma.dealsRedemption.findUnique).toHaveBeenCalledWith({
        where: { id },
      });
      expect(result).toEqual(mockDealsRedemption);
    });
  });

  describe('update', () => {
    it('should update and return the modified deal-redemption', async () => {
      const id = '1';
      const updateData: Prisma.DealsRedemptionUpdateInput = {
        status: 'PENDING',
      };

      // Call the service method
      const result = await service.update(id, updateData);

      // Expect the prisma method to have been called with correct arguments
      expect(prisma.dealsRedemption.update).toHaveBeenCalledWith({
        where: { id },
        data: updateData,
      });
      expect(result).toEqual(mockDealsRedemption);
    });
  });

  describe('delete', () => {
    it('should delete a deal-redemption and return it', async () => {
      const id = '1';

      // Call the service method
      const result = await service.delete(id);

      // Expect the prisma method to have been called
      expect(prisma.dealsRedemption.delete).toHaveBeenCalledWith({
        where: { id },
      });
      expect(result).toEqual(mockDealsRedemption);
    });
  });
});
