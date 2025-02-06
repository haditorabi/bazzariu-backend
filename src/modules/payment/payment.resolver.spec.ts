import { Test, TestingModule } from '@nestjs/testing';
import { PaymentResolver } from './payment.resolver';
import { PaymentService } from './payment.service';
import {
  Payment,
  CreatePaymentInput,
  UpdatePaymentInput,
} from './payment.graphql';
import { PaginationArgs } from 'src/graphql/pagination-args-types';
import { PaymentStatus } from '@prisma/client';

// Mock data for testing
const mockPayment: Payment = {
  id: '1',
  transactionId: '77777',
  targetId: '',
  targetType: 'DEAL',
  userId: '1',
  businessId: '1',
  paymentMethodId: '1',
  amount: 0,
  currencyId: '',
  status: PaymentStatus.PENDING,
  createdAt: new Date(),
  updatedAt: new Date(),
};

// Mock implementation of the PaymentService
const mockPaymentService = {
  create: jest.fn().mockResolvedValue(mockPayment),
  findAll: jest.fn().mockResolvedValue([mockPayment]),
  findOne: jest.fn().mockResolvedValue(mockPayment),
  update: jest.fn().mockResolvedValue(mockPayment),
  delete: jest.fn().mockResolvedValue(mockPayment),
};

describe('PaymentResolver', () => {
  let resolver: PaymentResolver;
  let service: PaymentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PaymentResolver,
        {
          provide: PaymentService,
          useValue: mockPaymentService, // Inject the mocked service
        },
      ],
    }).compile();

    resolver = module.get<PaymentResolver>(PaymentResolver);
    service = module.get<PaymentService>(PaymentService);
  });
  describe('createPayment', () => {
    it('should create and return a payments', async () => {
      const input: CreatePaymentInput = {
        ...mockPayment,
      };

      const result = await resolver.createPayment(input);
      // expect(service.create).toHaveBeenCalledWith(input);
      expect(result).toEqual(mockPayment);
    });
  });

  describe('payments (findAll)', () => {
    it('should return an array of payments', async () => {
      const paginationArgs: PaginationArgs = {
        skip: 0,
        take: 10,
        limit: 10,
        page: 1,
      };

      // Call the resolver method
      const result = await resolver.payments(paginationArgs);

      // Expect the service method to have been called
      expect(service.findAll).toHaveBeenCalledWith(paginationArgs);
      expect(result).toEqual([mockPayment]);
    });
  });

  describe('payment (findOne)', () => {
    it('should return a single payment by ID', async () => {
      const id = '1';

      // Call the resolver method
      const result = await resolver.payment(id);

      // Expect the service method to have been called
      expect(service.findOne).toHaveBeenCalledWith(id);
      expect(result).toEqual(mockPayment);
    });
  });

  describe('updatePayment (update)', () => {
    it('should update and return the modified payment', async () => {
      const id = '1';
      const updateData = { status: PaymentStatus.COMPLETED };
      const input: UpdatePaymentInput = {
        ...updateData,
      };

      // Call the resolver method
      const result = await resolver.updatePayment(id, input);

      // Expect the service method to have been called with correct arguments
      expect(service.update).toHaveBeenCalledWith(id, updateData);
      expect(result).toEqual(mockPayment);
    });
  });

  describe('deletePayment (delete)', () => {
    it('should delete a payment and return it', async () => {
      const id = '1';

      // Call the resolver method
      const result = await resolver.deletePayment(id);

      // Expect the service method to have been called
      expect(service.delete).toHaveBeenCalledWith(id);
      expect(result).toEqual(mockPayment);
    });
  });
});
