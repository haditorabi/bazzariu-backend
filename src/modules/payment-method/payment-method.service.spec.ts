import { Test, TestingModule } from '@nestjs/testing';
import { PaymentMethodService } from './payment-method.service';
import { PrismaService } from '../prisma/prisma.service';
import { PaymentMethod, PaymentMethodStatus } from '@prisma/client';
import { PaginationArgs } from 'src/graphql/pagination-args-types';
import { Prisma } from '@prisma/client';

// Mock data for testing
const mockPaymentMethod: PaymentMethod = {
  id: '111',
  // user: { id: '2' } as CommonUser,
  userId: '',
  type: 'CREDITCARD',
  status: PaymentMethodStatus.ACTIVE,
  createdAt: new Date(),
  details: 'eee',
};

// Mock implementation of the PrismaService
const mockPrismaService = {
  paymentMethod: {
    create: jest.fn().mockResolvedValue(mockPaymentMethod),
    findMany: jest.fn().mockResolvedValue([mockPaymentMethod]),
    findUnique: jest.fn().mockResolvedValue(mockPaymentMethod),
    update: jest.fn().mockResolvedValue(mockPaymentMethod),
    delete: jest.fn().mockResolvedValue(mockPaymentMethod),
  },
};

describe('PaymentMethodService', () => {
  let service: PaymentMethodService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PaymentMethodService,
        {
          provide: PrismaService,
          useValue: mockPrismaService, // Inject the mocked PrismaService
        },
      ],
    }).compile();

    service = module.get<PaymentMethodService>(PaymentMethodService);
    prisma = module.get<PrismaService>(PrismaService);
  });
  describe('create', () => {
    it('should create and return a payment-method', async () => {
      const input: Prisma.PaymentMethodCreateInput = {
        ...mockPaymentMethod,
        user: { connect: { id: 'dde' } },
      };

      const result = await service.create(input);
      expect(prisma.paymentMethod.create).toHaveBeenCalledWith({
        data: input,
      });
      expect(result).toEqual(mockPaymentMethod);
    });
  });

  describe('findAll', () => {
    it('should return an array of payment-methods', async () => {
      const paginationArgs: PaginationArgs = {
        skip: 0,
        take: 10,
        limit: 10,
        page: 1,
      };

      // Call the service method
      const result = await service.findAll(paginationArgs);

      // Expect the prisma method to have been called
      expect(prisma.paymentMethod.findMany).toHaveBeenCalledWith({
        skip: paginationArgs.skip,
        take: paginationArgs.take,
      });
      expect(result).toEqual([mockPaymentMethod]);
    });
  });

  describe('findOne', () => {
    it('should return a single payment-method by ID', async () => {
      const id = '1';

      // Call the service method
      const result = await service.findOne(id);

      // Expect the prisma method to have been called
      expect(prisma.paymentMethod.findUnique).toHaveBeenCalledWith({
        where: { id },
      });
      expect(result).toEqual(mockPaymentMethod);
    });
  });

  describe('update', () => {
    it('should update and return the modified payment-method', async () => {
      const id = '1';
      const updateData: Prisma.PaymentMethodUpdateInput = {
        status: PaymentMethodStatus.ACTIVE,
      };

      // Call the service method
      const result = await service.update(id, updateData);

      // Expect the prisma method to have been called with correct arguments
      expect(prisma.paymentMethod.update).toHaveBeenCalledWith({
        where: { id },
        data: updateData,
      });
      expect(result).toEqual(mockPaymentMethod);
    });
  });

  describe('delete', () => {
    it('should delete a payment-method and return it', async () => {
      const id = '1';

      // Call the service method
      const result = await service.delete(id);

      // Expect the prisma method to have been called
      expect(prisma.paymentMethod.delete).toHaveBeenCalledWith({
        where: { id },
      });
      expect(result).toEqual(mockPaymentMethod);
    });
  });
});
