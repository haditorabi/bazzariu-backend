import { Test, TestingModule } from '@nestjs/testing';
import { CurrencyService } from './currency.service';
import { PrismaService } from '../prisma/prisma.service';
import { Currency, CurrencyStatus } from '@prisma/client';
import { PaginationArgs } from 'src/graphql/pagination-args-types';
import { Prisma } from '@prisma/client';

// Mock data for testing
const mockCurrency: Currency = {
  id: '1',
  name: 'Sample Tag',
  code: 'GPI',
  status: CurrencyStatus.ACTIVE,
};

// Mock implementation of the PrismaService
const mockPrismaService = {
  currency: {
    findMany: jest.fn().mockResolvedValue([mockCurrency]),
    findUnique: jest.fn().mockResolvedValue(mockCurrency),
    update: jest.fn().mockResolvedValue(mockCurrency),
    delete: jest.fn().mockResolvedValue(mockCurrency),
  },
};

describe('CurrencyService', () => {
  let service: CurrencyService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CurrencyService,
        {
          provide: PrismaService,
          useValue: mockPrismaService, // Inject the mocked PrismaService
        },
      ],
    }).compile();

    service = module.get<CurrencyService>(CurrencyService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  describe('findAll', () => {
    it('should return an array of currencys', async () => {
      const paginationArgs: PaginationArgs = {
        skip: 0,
        take: 10,
        limit: 10,
        page: 1,
      };

      // Call the service method
      const result = await service.findAll(paginationArgs);

      // Expect the prisma method to have been called
      expect(prisma.currency.findMany).toHaveBeenCalledWith({
        skip: paginationArgs.skip,
        take: paginationArgs.take,
      });
      expect(result).toEqual([mockCurrency]);
    });
  });

  describe('findOne', () => {
    it('should return a single currency by ID', async () => {
      const id = '1';

      // Call the service method
      const result = await service.findOne(id);

      // Expect the prisma method to have been called
      expect(prisma.currency.findUnique).toHaveBeenCalledWith({
        where: { id },
      });
      expect(result).toEqual(mockCurrency);
    });
  });

  describe('update', () => {
    it('should update and return the modified currency', async () => {
      const id = '1';
      const updateData: Prisma.CurrencyUpdateInput = { name: 'Updated Tag' };

      // Call the service method
      const result = await service.update(id, updateData);

      // Expect the prisma method to have been called with correct arguments
      expect(prisma.currency.update).toHaveBeenCalledWith({
        where: { id },
        data: updateData,
      });
      expect(result).toEqual(mockCurrency);
    });
  });

  describe('delete', () => {
    it('should delete a currency and return it', async () => {
      const id = '1';

      // Call the service method
      const result = await service.delete(id);

      // Expect the prisma method to have been called
      expect(prisma.currency.delete).toHaveBeenCalledWith({
        where: { id },
      });
      expect(result).toEqual(mockCurrency);
    });
  });
});
