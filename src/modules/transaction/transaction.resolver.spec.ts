import { Test, TestingModule } from '@nestjs/testing';
import { TransactionResolver } from './transaction.resolver';
import { TransactionService } from './transaction.service';
import {
  Transaction,
  CreateTransactionInput,
  UpdateTransactionInput,
} from './transaction.graphql';
import { PaginationArgs } from 'src/graphql/pagination-args-types';
import { TransactionStatus } from '@prisma/client';

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
};

// Mock implementation of the TransactionService
const mockTransactionService = {
  create: jest.fn().mockResolvedValue(mockTransaction),
  findAll: jest.fn().mockResolvedValue([mockTransaction]),
  findOne: jest.fn().mockResolvedValue(mockTransaction),
  update: jest.fn().mockResolvedValue(mockTransaction),
  delete: jest.fn().mockResolvedValue(mockTransaction),
};

describe('TransactionResolver', () => {
  let resolver: TransactionResolver;
  let service: TransactionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TransactionResolver,
        {
          provide: TransactionService,
          useValue: mockTransactionService, // Inject the mocked service
        },
      ],
    }).compile();

    resolver = module.get<TransactionResolver>(TransactionResolver);
    service = module.get<TransactionService>(TransactionService);
  });
  describe('createTransaction', () => {
    it('should create and return a transactions', async () => {
      const input: CreateTransactionInput = {
        currencyId: mockTransaction.currencyId,
        amount: mockTransaction.amount,
        status: mockTransaction.status,
        payment: '1',
        business: '1',
        user: '1',
      };

      const result = await resolver.createTransaction(input);
      // expect(service.create).toHaveBeenCalledWith(input);
      expect(result).toEqual(mockTransaction);
    });
  });

  describe('transactions (findAll)', () => {
    it('should return an array of transactions', async () => {
      const paginationArgs: PaginationArgs = {
        skip: 0,
        take: 10,
        limit: 10,
        page: 1,
      };

      // Call the resolver method
      const result = await resolver.transactions(paginationArgs);

      // Expect the service method to have been called
      expect(service.findAll).toHaveBeenCalledWith(paginationArgs);
      expect(result).toEqual([mockTransaction]);
    });
  });

  describe('transaction (findOne)', () => {
    it('should return a single transaction by ID', async () => {
      const id = '1';

      // Call the resolver method
      const result = await resolver.transaction(id);

      // Expect the service method to have been called
      expect(service.findOne).toHaveBeenCalledWith(id);
      expect(result).toEqual(mockTransaction);
    });
  });

  describe('updateTransaction (update)', () => {
    it('should update and return the modified transaction', async () => {
      const id = '1';
      const updateData = { status: TransactionStatus.COMPLETED };
      const input: UpdateTransactionInput = {
        ...updateData,
      };

      // Call the resolver method
      const result = await resolver.updateTransaction(id, input);

      // Expect the service method to have been called with correct arguments
      expect(service.update).toHaveBeenCalledWith(id, updateData);
      expect(result).toEqual(mockTransaction);
    });
  });

  describe('deleteTransaction (delete)', () => {
    it('should delete a transaction and return it', async () => {
      const id = '1';

      // Call the resolver method
      const result = await resolver.deleteTransaction(id);

      // Expect the service method to have been called
      expect(service.delete).toHaveBeenCalledWith(id);
      expect(result).toEqual(mockTransaction);
    });
  });
});
