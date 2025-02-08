import { Test, TestingModule } from '@nestjs/testing';
import { BusinessProductPriceService } from './business-product-price.service';
import { PrismaService } from '../prisma/prisma.service';
import { BusinessProductPrice } from '@prisma/client';
import { PaginationArgs } from 'src/graphql/pagination-args-types';
import { Prisma } from '@prisma/client';

// Mock data for testing
const mockBusinessProductPrice: BusinessProductPrice = {
  id: '1',
  createdAt: new Date(),
  businessProductId: '1',
  currencyId: '1',
  price: 10.0,
  updatedAt: new Date(),
};

// Mock implementation of the PrismaService
const mockPrismaService = {
  businessProductPrice: {
    create: jest.fn().mockResolvedValue(mockBusinessProductPrice),
    findMany: jest.fn().mockResolvedValue([mockBusinessProductPrice]),
    findUnique: jest.fn().mockResolvedValue(mockBusinessProductPrice),
    update: jest.fn().mockResolvedValue(mockBusinessProductPrice),
    delete: jest.fn().mockResolvedValue(mockBusinessProductPrice),
  },
};

describe('BusinessProductPriceService', () => {
  let service: BusinessProductPriceService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BusinessProductPriceService,
        {
          provide: PrismaService,
          useValue: mockPrismaService, // Inject the mocked PrismaService
        },
      ],
    }).compile();

    service = module.get<BusinessProductPriceService>(
      BusinessProductPriceService,
    );
    prisma = module.get<PrismaService>(PrismaService);
  });
  describe('create', () => {
    it('should create and return a business-product-price', async () => {
      const input: Prisma.BusinessProductPriceCreateInput = {
        ...mockBusinessProductPrice,
        businessProduct: {
          connect: {
            id: '1',
          },
        },
      };

      const result = await service.create(input);
      expect(prisma.businessProductPrice.create).toHaveBeenCalledWith({
        data: input,
      });
      expect(result).toEqual(mockBusinessProductPrice);
    });
  });

  describe('findAll', () => {
    it('should return an array of business-product-prices', async () => {
      const paginationArgs: PaginationArgs = {
        skip: 0,
        take: 10,
        limit: 10,
        page: 1,
      };

      // Call the service method
      const result = await service.findAll(paginationArgs);

      // Expect the prisma method to have been called
      expect(prisma.businessProductPrice.findMany).toHaveBeenCalledWith({
        skip: paginationArgs.skip,
        take: paginationArgs.take,
      });
      expect(result).toEqual([mockBusinessProductPrice]);
    });
  });

  describe('findOne', () => {
    it('should return a single business-product-price by ID', async () => {
      const id = '1';

      // Call the service method
      const result = await service.findOne(id);

      // Expect the prisma method to have been called
      // expect(prisma.businessProductPrice.findUnique).toHaveBeenCalledWith({
      //   where: { id },
      // });
      expect(result).toEqual(mockBusinessProductPrice);
    });
  });

  describe('update', () => {
    it('should update and return the modified business-product-price', async () => {
      const id = '1';
      const updateData: Prisma.BusinessProductPriceUpdateInput = {
        price: 1.0,
      };

      // Call the service method
      const result = await service.update(id, updateData);

      // Expect the prisma method to have been called with correct arguments
      expect(prisma.businessProductPrice.update).toHaveBeenCalledWith({
        where: { id },
        data: updateData,
      });
      expect(result).toEqual(mockBusinessProductPrice);
    });
  });

  describe('delete', () => {
    it('should delete a business-product-price and return it', async () => {
      const id = '1';

      // Call the service method
      const result = await service.delete(id);

      // Expect the prisma method to have been called
      expect(prisma.businessProductPrice.delete).toHaveBeenCalledWith({
        where: { id },
      });
      expect(result).toEqual(mockBusinessProductPrice);
    });
  });
});
