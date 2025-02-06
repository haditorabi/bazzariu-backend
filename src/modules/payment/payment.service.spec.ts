import { Test, TestingModule } from '@nestjs/testing';
import { PaymentService } from './payment.service';
import { PrismaService } from '../prisma/prisma.service';
import { Payment, PaymentStatus } from '@prisma/client';
import { PaginationArgs } from 'src/graphql/pagination-args-types';
import { Prisma } from '@prisma/client';

// Mock data for testing
const mockPayment: Payment = {
  id: '1',
  transactionId: '77777',
  targetId: '',
  targetType: 'DEAL',
  userId: 'dde',
  businessId: '123',
  paymentMethodId: '12334',
  description: 'test',
  amount: 0,
  currencyId: '',
  status: PaymentStatus.PENDING,
  createdAt: undefined,
  updatedAt: undefined,
};

// Mock implementation of the PrismaService
const mockPrismaService = {
  payment: {
    create: jest.fn().mockResolvedValue(mockPayment),
    findMany: jest.fn().mockResolvedValue([mockPayment]),
    findUnique: jest.fn().mockResolvedValue(mockPayment),
    update: jest.fn().mockResolvedValue(mockPayment),
    delete: jest.fn().mockResolvedValue(mockPayment),
  },
};

describe('PaymentService', () => {
  let service: PaymentService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PaymentService,
        {
          provide: PrismaService,
          useValue: mockPrismaService, // Inject the mocked PrismaService
        },
      ],
    }).compile();

    service = module.get<PaymentService>(PaymentService);
    prisma = module.get<PrismaService>(PrismaService);
  });
  describe('create', () => {
    it('should create and return a payment', async () => {
      const input: Prisma.PaymentCreateInput = {
        ...mockPayment,
        user: { connect: { id: 'dde' } },
        paymentMethod: { connect: { id: 'dde' } },
      };

      const result = await service.create(input);
      expect(prisma.payment.create).toHaveBeenCalledWith({
        data: input,
      });
      expect(result).toEqual(mockPayment);
    });
  });

  describe('findAll', () => {
    it('should return an array of payments', async () => {
      const paginationArgs: PaginationArgs = {
        skip: 0,
        take: 10,
        limit: 10,
        page: 1,
      };

      // Call the service method
      const result = await service.findAll(paginationArgs);

      // Expect the prisma method to have been called
      expect(prisma.payment.findMany).toHaveBeenCalledWith({
        skip: paginationArgs.skip,
        take: paginationArgs.take,
      });
      expect(result).toEqual([mockPayment]);
    });
  });

  describe('findOne', () => {
    it('should return a single payment by ID', async () => {
      const id = '1';

      // Call the service method
      const result = await service.findOne(id);

      // Expect the prisma method to have been called
      expect(prisma.payment.findUnique).toHaveBeenCalledWith({
        where: { id },
      });
      expect(result).toEqual(mockPayment);
    });
  });

  describe('update', () => {
    it('should update and return the modified payment', async () => {
      const id = '1';
      const updateData: Prisma.PaymentUpdateInput = { status: 'PENDING' };

      // Call the service method
      const result = await service.update(id, updateData);

      // Expect the prisma method to have been called with correct arguments
      expect(prisma.payment.update).toHaveBeenCalledWith({
        where: { id },
        data: updateData,
      });
      expect(result).toEqual(mockPayment);
    });
  });

  describe('delete', () => {
    it('should delete a payment and return it', async () => {
      const id = '1';

      // Call the service method
      const result = await service.delete(id);

      // Expect the prisma method to have been called
      expect(prisma.payment.delete).toHaveBeenCalledWith({
        where: { id },
      });
      expect(result).toEqual(mockPayment);
    });
  });
});
