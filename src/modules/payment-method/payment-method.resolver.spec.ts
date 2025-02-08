import { Test, TestingModule } from '@nestjs/testing';
import { PaymentMethodResolver } from './payment-method.resolver';
import { PaymentMethodService } from './payment-method.service';
import {
  PaymentMethod,
  CreatePaymentMethodInput,
  UpdatePaymentMethodInput,
} from './payment-method.graphql';
import { PaginationArgs } from 'src/graphql/pagination-args-types';
import { PaymentMethodStatus } from '@prisma/client';
import { CommonUser } from 'src/graphql/user.type';

// Mock data for testing
const mockPaymentMethod: PaymentMethod = {
  id: '111',
  user: { id: '2' } as CommonUser,
  userId: '',
  paymentId: '',
  type: 'CREDITCARD',
  status: PaymentMethodStatus.ACTIVE,
  createdAt: new Date(),
};

// Mock implementation of the PaymentMethodService
const mockPaymentMethodService = {
  create: jest.fn().mockResolvedValue(mockPaymentMethod),
  findAll: jest.fn().mockResolvedValue([mockPaymentMethod]),
  findOne: jest.fn().mockResolvedValue(mockPaymentMethod),
  update: jest.fn().mockResolvedValue(mockPaymentMethod),
  delete: jest.fn().mockResolvedValue(mockPaymentMethod),
};

describe('PaymentMethodResolver', () => {
  let resolver: PaymentMethodResolver;
  let service: PaymentMethodService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PaymentMethodResolver,
        {
          provide: PaymentMethodService,
          useValue: mockPaymentMethodService, // Inject the mocked service
        },
      ],
    }).compile();

    resolver = module.get<PaymentMethodResolver>(PaymentMethodResolver);
    service = module.get<PaymentMethodService>(PaymentMethodService);
  });
  describe('createPaymentMethod', () => {
    it('should create and return a payment-methods', async () => {
      const input: CreatePaymentMethodInput = {
        ...mockPaymentMethod,
        userId: mockPaymentMethod.user.id,
      };

      const result = await resolver.createPaymentMethod(input);
      // expect(service.create).toHaveBeenCalledWith(input);
      expect(result).toEqual(mockPaymentMethod);
    });
  });

  describe('paymentMethods (findAll)', () => {
    it('should return an array of payment-methods', async () => {
      const paginationArgs: PaginationArgs = {
        skip: 0,
        take: 10,
        limit: 10,
        page: 1,
      };

      // Call the resolver method
      const result = await resolver.paymentMethods(paginationArgs);

      // Expect the service method to have been called
      expect(service.findAll).toHaveBeenCalledWith(paginationArgs);
      expect(result).toEqual([mockPaymentMethod]);
    });
  });

  describe('paymentMethod (findOne)', () => {
    it('should return a single payment-method by ID', async () => {
      const id = '1';

      // Call the resolver method
      const result = await resolver.paymentMethod(id);

      // Expect the service method to have been called
      expect(service.findOne).toHaveBeenCalledWith(id);
      expect(result).toEqual(mockPaymentMethod);
    });
  });

  describe('updatePaymentMethod (update)', () => {
    it('should update and return the modified payment-method', async () => {
      const id = '1';
      const updateData = { status: PaymentMethodStatus.ACTIVE };
      const input: UpdatePaymentMethodInput = {
        ...updateData,
      };

      // Call the resolver method
      const result = await resolver.updatePaymentMethod(id, input);

      // Expect the service method to have been called with correct arguments
      expect(service.update).toHaveBeenCalledWith(id, updateData);
      expect(result).toEqual(mockPaymentMethod);
    });
  });

  describe('deletePaymentMethod (delete)', () => {
    it('should delete a payment-method and return it', async () => {
      const id = '1';

      // Call the resolver method
      const result = await resolver.deletePaymentMethod(id);

      // Expect the service method to have been called
      expect(service.delete).toHaveBeenCalledWith(id);
      expect(result).toEqual(mockPaymentMethod);
    });
  });
});
