import { Test, TestingModule } from '@nestjs/testing';
import { TransactionService } from './transaction.service';
import { PrismaService } from '../prisma/prisma.service';
import { Transaction, TransactionStatus } from '@prisma/client';
import { PaginationArgs } from 'src/graphql/pagination-args-types';
import { Prisma } from '@prisma/client';

// Mock data for testing
const mockTransaction: Transaction = {
  id: '1',
  createdAt: new Date(),
  paymentId: '1',
  businessId: '1',
  currencyId: '1',
  userId: '1',
  amount: 1000.0,
  status: TransactionStatus.CANCELED,
  updatedAt: new Date(),
  description: 'wwww',
};

// Mock implementation of the PrismaService
const mockPrismaService = {
  transaction: {
    create: jest.fn().mockResolvedValue(mockTransaction),
    findMany: jest.fn().mockResolvedValue([mockTransaction]),
    findUnique: jest.fn().mockResolvedValue(mockTransaction),
    update: jest.fn().mockResolvedValue(mockTransaction),
    delete: jest.fn().mockResolvedValue(mockTransaction),
  },
};

describe('TransactionService', () => {
  let service: TransactionService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TransactionService,
        {
          provide: PrismaService,
          useValue: mockPrismaService, // Inject the mocked PrismaService
        },
      ],
    }).compile();

    service = module.get<TransactionService>(TransactionService);
    prisma = module.get<PrismaService>(PrismaService);
  });
  describe('create', () => {
    it('should create and return a transaction', async () => {
      const input: Prisma.TransactionCreateInput = {
        ...mockTransaction,
        payment: {
          connect: {
            id: '1',
          },
        },
        user: {
          connect: {
            id: '1',
          },
        },
      };

      const result = await service.create(input);
      expect(prisma.transaction.create).toHaveBeenCalledWith({
        data: input,
      });
      expect(result).toEqual(mockTransaction);
    });
  });

  describe('findAll', () => {
    it('should return an array of transactions', async () => {
      const paginationArgs: PaginationArgs = {
        skip: 0,
        take: 10,
        limit: 10,
        page: 1,
      };

      // Call the service method
      const result = await service.findAll(paginationArgs);

      // Expect the prisma method to have been called
      expect(prisma.transaction.findMany).toHaveBeenCalledWith({
        skip: paginationArgs.skip,
        take: paginationArgs.take,
      });
      expect(result).toEqual([mockTransaction]);
    });
  });

  describe('findOne', () => {
    it('should return a single transaction by ID', async () => {
      const id = '1';

      // Call the service method
      const result = await service.findOne(id);

      // Expect the prisma method to have been called
      expect(prisma.transaction.findUnique).toHaveBeenCalledWith({
        where: { id },
      });
      expect(result).toEqual(mockTransaction);
    });
  });

  describe('update', () => {
    it('should update and return the modified transaction', async () => {
      const id = '1';
      const updateData: Prisma.TransactionUpdateInput = {
        status: TransactionStatus.FAILED,
      };

      // Call the service method
      const result = await service.update(id, updateData);

      // Expect the prisma method to have been called with correct arguments
      expect(prisma.transaction.update).toHaveBeenCalledWith({
        where: { id },
        data: updateData,
      });
      expect(result).toEqual(mockTransaction);
    });
  });

  describe('delete', () => {
    it('should delete a transaction and return it', async () => {
      const id = '1';

      // Call the service method
      const result = await service.delete(id);

      // Expect the prisma method to have been called
      expect(prisma.transaction.delete).toHaveBeenCalledWith({
        where: { id },
      });
      expect(result).toEqual(mockTransaction);
    });
  });
});
