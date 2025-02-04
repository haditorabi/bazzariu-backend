import { Test, TestingModule } from '@nestjs/testing';
import { BusinessDealResolver } from './business-deal.resolver';
import { BusinessDealService } from './business-deal.service';
import { PaginationArgs } from 'src/graphql/pagination-args-types';
import {
  CreateBusinessDealInput,
  UpdateBusinessDealInput,
} from './business-deal.graphql';
import { mockDeep, DeepMockProxy } from 'jest-mock-extended';
import { BusinessDeal } from '@prisma/client';

describe('BusinessDealResolver', () => {
  let resolver: BusinessDealResolver;
  let service: DeepMockProxy<BusinessDealService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BusinessDealResolver,
        {
          provide: BusinessDealService,
          useValue: mockDeep<BusinessDealService>(),
        },
      ],
    }).compile();

    resolver = module.get<BusinessDealResolver>(BusinessDealResolver);
    service = module.get(BusinessDealService);
  });

  describe('businessDeals', () => {
    it('should return an array of business deals', async () => {
      const paginationArgs: PaginationArgs = {
        skip: 0,
        take: 10,
        limit: 10,
        page: 1,
      };
      const deals: BusinessDeal[] = [
        {
          id: '1',
          name: 'Deal 1',
          description: 'Description 1',
          businessId: '1',
          businessProductId: ['1'],
          discountType: 'FLAT',
          value: 10,
          startDate: new Date(),
          endDate: new Date(),
          mediaId: ['1'],
          status: 'ACTIVE',
          createdAt: new Date(),
          updatedAt: new Date(),
          maxRedemption: 0,
          maxPerUser: 0,
        },
      ];
      service.findAll.mockResolvedValue(deals);

      const result = await resolver.businessDeals(paginationArgs);
      expect(result).toEqual(deals);
      expect(service.findAll).toHaveBeenCalledWith(paginationArgs);
    });
  });

  describe('businessDeal', () => {
    it('should return a single business deal', async () => {
      const deal: BusinessDeal = {
        id: '1',
        name: 'Deal 1',
        description: 'Description 1',
        businessId: '1',
        businessProductId: ['1'],
        discountType: 'FLAT',
        value: 10,
        startDate: new Date(),
        endDate: new Date(),
        mediaId: ['1'],
        status: 'ACTIVE',
        createdAt: new Date(),
        updatedAt: new Date(),
        maxRedemption: 0,
        maxPerUser: 0,
      };
      service.findOne.mockResolvedValue(deal);

      const result = await resolver.businessDeal('1');
      expect(result).toEqual(deal);
      expect(service.findOne).toHaveBeenCalledWith('1');
    });

    it('should throw an error if business deal is not found', async () => {
      service.findOne.mockResolvedValue(null);

      await expect(resolver.businessDeal('1')).rejects.toThrow();
      expect(service.findOne).toHaveBeenCalledWith('1');
    });
  });

  describe('createBusinessDeal', () => {
    it('should create and return a new business deal', async () => {
      const input: CreateBusinessDealInput = {
        name: 'New Deal',
        business: '1',
        businessProduct: ['1'],
        discountType: 'FLAT',
        value: 10,
        startDate: new Date(),
        endDate: new Date(),
        mediaId: ['1'],
        status: 'ACTIVE',
      };
      const createdDeal: BusinessDeal = {
        id: '1',
        ...input,
        description: '',
        businessId: '1',
        businessProductId: ['1'],
        createdAt: new Date(),
        updatedAt: new Date(),
        maxRedemption: 0,
        maxPerUser: 0,
        mediaId: ['1'],
      };
      service.create.mockResolvedValue(createdDeal);

      const result = await resolver.createBusinessDeal(input);
      expect(result).toEqual(createdDeal);
      expect(service.create).toHaveBeenCalled();
    });

    // it('should throw an error if input validation fails', async () => {
    //   const input: CreateBusinessDealInput = {
    //     name: '',
    //     business: '1',
    //     businessProduct: ['1'],
    //     discountType: 'FLAT',
    //     value: 10,
    //     startDate: new Date(),
    //     endDate: new Date(),
    //     mediaId: ['1'],
    //     status: 'ACTIVE',
    //   };

    //   await expect(resolver.createBusinessDeal(input)).rejects.toThrow();
    // });
  });

  describe('updateBusinessDeal', () => {
    it('should update and return the business deal', async () => {
      const input: UpdateBusinessDealInput = { name: 'Updated Deal' };
      const updatedDeal: BusinessDeal = {
        id: '1',
        name: 'Updated Deal',
        description: 'Description 1',
        businessId: '1',
        businessProductId: ['1'],
        discountType: 'FLAT',
        value: 10,
        startDate: new Date(),
        endDate: new Date(),
        mediaId: ['1'],
        status: 'ACTIVE',
        createdAt: new Date(),
        updatedAt: new Date(),
        maxRedemption: 0,
        maxPerUser: 0,
      };
      service.update.mockResolvedValue(updatedDeal);

      const result = await resolver.updateBusinessDeal('1', input);
      expect(result).toEqual(updatedDeal);
      expect(service.update).toHaveBeenCalledWith('1', expect.any(Object));
    });

    it('should throw an error if business deal is not found', async () => {
      const input: UpdateBusinessDealInput = { name: 'Updated Deal' };
      service.update.mockRejectedValue(new Error('Not found'));

      await expect(resolver.updateBusinessDeal('1', input)).rejects.toThrow(
        'Not found',
      );
    });
  });

  describe('deleteBusinessDeal', () => {
    it('should delete and return the business deal', async () => {
      const deal: BusinessDeal = {
        id: '1',
        name: 'Deal 1',
        description: 'Description 1',
        businessId: '1',
        businessProductId: ['1'],
        discountType: 'FLAT',
        value: 10,
        startDate: new Date(),
        endDate: new Date(),
        mediaId: ['1'],
        status: 'ACTIVE',
        createdAt: new Date(),
        updatedAt: new Date(),
        maxRedemption: 0,
        maxPerUser: 0,
      };
      service.delete.mockResolvedValue(deal);

      const result = await resolver.deleteBusinessDeal('1');
      expect(result).toEqual(deal);
      expect(service.delete).toHaveBeenCalledWith('1');
    });

    it('should throw an error if business deal is not found', async () => {
      service.delete.mockRejectedValue(new Error('Not found'));

      await expect(resolver.deleteBusinessDeal('1')).rejects.toThrow(
        'Not found',
      );
    });
  });
});
