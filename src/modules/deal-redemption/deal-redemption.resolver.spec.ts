import { Test, TestingModule } from '@nestjs/testing';
import { DealsRedemptionResolver } from './deal-redemption.resolver';
import { DealsRedemptionService } from './deal-redemption.service';
import { DealsRedemption } from './deal-redemption.graphql';
import { PaginationArgs } from 'src/graphql/pagination-args-types';
import { CommonUser } from 'src/graphql/user.type';
import { DealsRedemptionStatus } from '@prisma/client';

// Mock data for testing
const mockDealsRedemption: DealsRedemption = {
  id: '1',
  createdAt: new Date(),
  businessDeal: {
    id: '1',
    businessId: 'businessId',
    discountType: 'PERCENT',
    value: 10,
    description: 'Sample description',
    createdAt: new Date(),
    updatedAt: new Date(),
    name: '',
    startDate: new Date(),
    endDate: new Date(),
    status: 'ACTIVE',
  },
  businessDealId: 'dsfdgb',
  user: new CommonUser(),
  userId: 'dsfgh',
  expiresAt: new Date(),
  status: DealsRedemptionStatus.PENDING,
  updatedAt: new Date(),
};

// Mock implementation of the DealsRedemptionService
const mockDealsRedemptionService = {
  findAll: jest.fn().mockResolvedValue([mockDealsRedemption]),
  findOne: jest.fn().mockResolvedValue(mockDealsRedemption),
  update: jest.fn().mockResolvedValue(mockDealsRedemption),
  delete: jest.fn().mockResolvedValue(mockDealsRedemption),
};

describe('DealsRedemptionResolver', () => {
  let resolver: DealsRedemptionResolver;
  let service: DealsRedemptionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DealsRedemptionResolver,
        {
          provide: DealsRedemptionService,
          useValue: mockDealsRedemptionService, // Inject the mocked service
        },
      ],
    }).compile();

    resolver = module.get<DealsRedemptionResolver>(DealsRedemptionResolver);
    service = module.get<DealsRedemptionService>(DealsRedemptionService);
  });

  describe('dealRedemptions (findAll)', () => {
    it('should return an array of deal-redemptions', async () => {
      const paginationArgs: PaginationArgs = {
        skip: 0,
        take: 10,
        limit: 10,
        page: 1,
      };

      // Call the resolver method
      const result = await resolver.dealRedemptions(paginationArgs);

      // Expect the service method to have been called
      expect(service.findAll).toHaveBeenCalledWith(paginationArgs);
      expect(result).toEqual([mockDealsRedemption]);
    });
  });

  describe('dealRedemption (findOne)', () => {
    it('should return a single deal-redemption by ID', async () => {
      const id = '1';

      // Call the resolver method
      const result = await resolver.dealRedemption(id);

      // Expect the service method to have been called
      expect(service.findOne).toHaveBeenCalledWith(id);
      expect(result).toEqual(mockDealsRedemption);
    });
  });

  describe('updateDealsRedemption (update)', () => {
    it('should update and return the modified deal-redemption', async () => {
      const id = '1';
      const updateData = { status: DealsRedemptionStatus.EXPIRED };

      // Call the resolver method
      const result = await resolver.updateDealsRedemption(id, updateData);

      // Expect the service method to have been called with correct arguments
      expect(service.update).toHaveBeenCalledWith(id, updateData);
      expect(result).toEqual(mockDealsRedemption);
    });
  });

  describe('deleteDealsRedemption (delete)', () => {
    it('should delete a deal-redemption and return it', async () => {
      const id = '1';

      // Call the resolver method
      const result = await resolver.deleteDealsRedemption(id);

      // Expect the service method to have been called
      expect(service.delete).toHaveBeenCalledWith(id);
      expect(result).toEqual(mockDealsRedemption);
    });
  });
});
