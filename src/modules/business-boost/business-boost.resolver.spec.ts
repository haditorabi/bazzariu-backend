import { Test, TestingModule } from '@nestjs/testing';
import { BusinessBoostResolver } from './business-boost.resolver';
import { BusinessBoostService } from './business-boost.service';
import {
  CreateBusinessBoostInput,
  UpdateBusinessBoostInput,
} from './business-boost.graphql';
import { PaginationArgs } from 'src/graphql/pagination-args-types';
import {
  BusinessBoost,
  BusinessBoostStatus,
  BusinessBoostType,
  BusinessStatus,
} from '@prisma/client';
import { ObjectId } from 'mongodb';
import { mockDeep, DeepMockProxy } from 'jest-mock-extended';

describe('BusinessBoostResolver', () => {
  let resolver: BusinessBoostResolver;
  let service: DeepMockProxy<BusinessBoostService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BusinessBoostResolver,
        {
          provide: BusinessBoostService,
          useValue: mockDeep<BusinessBoostService>(),
        },
      ],
    }).compile();

    resolver = module.get<BusinessBoostResolver>(BusinessBoostResolver);
    service = module.get(BusinessBoostService);
  });

  describe('businessBoosts', () => {
    it('should return an array of business boosts', async () => {
      const paginationArgs: PaginationArgs = {
        skip: 0,
        take: 10,
        limit: 10,
        page: 1,
      };
      const result = [
        {
          id: '1',
          businessId: '1',
          startAt: new Date(),
          endAt: new Date(),
          type: BusinessBoostType.BOOKING,
          status: BusinessBoostStatus.ACTIVE,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];
      service.findAll.mockResolvedValue(result);

      expect(await resolver.businessBoosts(paginationArgs)).toEqual(result);
      expect(service.findAll).toHaveBeenCalledWith(paginationArgs);
    });
  });

  describe('businessBoost', () => {
    it('should return a single business boost', async () => {
      const result = {
        id: '1',
        businessId: '1',
        type: BusinessBoostType.BOOKING,
        status: BusinessBoostStatus.ACTIVE,
        startAt: new Date(),
        endAt: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      service.findOne.mockResolvedValue(result);

      expect(await resolver.businessBoost('1')).toEqual(result);
      expect(service.findOne).toHaveBeenCalledWith('1');
    });

    it('should throw an error if business boost not found', async () => {
      service.findOne.mockResolvedValue(null);

      await expect(resolver.businessBoost('1')).rejects.toThrow();
      expect(service.findOne).toHaveBeenCalledWith('1');
    });
  });

  describe('createBusinessBoost', () => {
    it('should create and return a business boost', async () => {
      const input: CreateBusinessBoostInput = {
        businessId: '1',
        startAt: new Date(),
        endAt: new Date(),
        type: BusinessBoostType.BOOKING,
        status: BusinessBoostStatus.ACTIVE,
      };
      const result = {
        id: '1',
        businessId: '1',
        ...input,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      service.create.mockResolvedValue(result);

      // expect(service.create).toHaveBeenCalledWith({
      //   ...input,
      //   business: { connect: { id: '1' } },
      // });
      expect(await resolver.createBusinessBoost(input)).toEqual(result);
    });

    // it('should throw an error if input validation fails', async () => {
    //   const input: CreateBusinessBoostInput = {
    //     business: '1',
    //     startAt: new Date(),
    //     endAt: new Date('invalid'),
    //     type: BusinessBoostType.BOOKING,
    //     status: BusinessBoostStatus.ACTIVE,
    //   };

    //   await expect(resolver.createBusinessBoost(input)).rejects.toThrow();
    // });
  });

  describe('updateBusinessBoost', () => {
    it('should update and return a business boost', async () => {
      const input: UpdateBusinessBoostInput = {
        type: BusinessBoostType.BOOKING,
      };
      const result = {
        id: '1',
        businessId: '1',
        startAt: new Date(),
        endAt: new Date(),
        type: BusinessBoostType.BOOKING,
        status: BusinessBoostStatus.ACTIVE,
        createdAt: new Date(),
        updatedAt: new Date(),
        ...input,
      };
      service.update.mockResolvedValue(result);

      expect(await resolver.updateBusinessBoost('1', input)).toEqual(result);
      expect(service.update).toHaveBeenCalledWith('1', input);
    });

    it('should throw an error if business boost not found', async () => {
      service.update.mockRejectedValue(new Error('Not found'));

      await expect(resolver.updateBusinessBoost('1', {})).rejects.toThrow(
        'Not found',
      );
      expect(service.update).toHaveBeenCalledWith('1', {});
    });
  });

  describe('deleteBusinessBoost', () => {
    it('should delete and return a business boost', async () => {
      const result = {
        id: '1',
        businessId: '1',
        type: BusinessBoostType.BOOKING,
        status: BusinessBoostStatus.ACTIVE,
        startAt: new Date(),
        endAt: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      service.delete.mockResolvedValue(result);

      expect(await resolver.deleteBusinessBoost('1')).toEqual(result);
      expect(service.delete).toHaveBeenCalledWith('1');
    });

    it('should throw an error if business boost not found', async () => {
      service.delete.mockRejectedValue(new Error('Not found'));

      await expect(resolver.deleteBusinessBoost('1')).rejects.toThrow(
        'Not found',
      );
      expect(service.delete).toHaveBeenCalledWith('1');
    });
  });

  describe('business', () => {
    it('should return the associated business', async () => {
      const mockBusiness = {
        id: new ObjectId().toString(),
        name: 'Test Business',
        mediaId: [new ObjectId().toString()],
        status: 'ACTIVE' as BusinessStatus,
        createdAt: new Date(),
        updatedAt: new Date(),
        description: 'Test Description',
        website: 'https://test.com',
        isClaimed: true,
        businessCategoryId: [new ObjectId().toString()],
        amenityId: [new ObjectId().toString()],
        languageId: [new ObjectId().toString()],
        regionId: new ObjectId().toString(),
        claimedBy: new ObjectId().toString(),
        businessProductId: [new ObjectId().toString()],
        maxAvailable: 10,
        maxGuest: 5,
      };
      const boost: BusinessBoost = {
        id: '1',
        businessId: '1',
        startAt: new Date(),
        endAt: new Date(),
        type: BusinessBoostType.BOOKING,
        status: BusinessBoostStatus.ACTIVE,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      service.getBusiness.mockResolvedValue(mockBusiness);

      expect(await resolver.business(boost)).toEqual(mockBusiness);
      expect(service.getBusiness).toHaveBeenCalledWith('1');
    });

    // it('should throw an error if business not found', async () => {
    //   const boost: BusinessBoost = {
    //     id: '1',
    //     businessId: '1',
    //     startAt: new Date(),
    //     endAt: new Date(),
    //     type: BusinessBoostType.BOOKING,
    //     status: BusinessBoostStatus.ACTIVE,
    //     createdAt: new Date(),
    //     updatedAt: new Date(),
    //   };
    //   service.getBusiness.mockResolvedValue(null);

    //   await expect(resolver.business(boost)).rejects.toThrow();
    //   expect(service.getBusiness).toHaveBeenCalledWith('1');
    // });
  });
});
