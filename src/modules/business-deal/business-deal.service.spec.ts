import { Test, TestingModule } from '@nestjs/testing';
import { BusinessDealService } from './business-deal.service';
import { PrismaService } from '../prisma/prisma.service';
import { mockDeep, DeepMockProxy } from 'jest-mock-extended';
import { Prisma, BusinessDeal, Business } from '@prisma/client';
import { PaginationArgs } from 'src/graphql/pagination-args-types';

describe('BusinessDealService', () => {
  let service: BusinessDealService;
  let prisma: DeepMockProxy<PrismaService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BusinessDealService,
        {
          provide: PrismaService,
          useValue: mockDeep<PrismaService>(),
        },
      ],
    }).compile();

    service = module.get<BusinessDealService>(BusinessDealService);
    prisma = module.get(PrismaService);
  });

  describe('create', () => {
    it('should create a new business deal', async () => {
      const data: Prisma.BusinessDealCreateInput = {
        name: 'New Deal',
        business: { connect: { id: '1' } },
        businessProduct: { connect: [{ id: '1' }] },
        discountType: 'FLAT',
        value: 10,
        startDate: new Date(),
        endDate: new Date(),
        mediaId: ['1'],
        status: 'ACTIVE',
      };
      const createdDeal: BusinessDeal = {
        id: '1',
        name: data.name,
        description: 'Test description',
        businessId: '1',
        businessProductId: ['1'],
        discountType: data.discountType,
        value: data.value,
        startDate: data.startDate as Date,
        endDate: data.endDate as Date,
        mediaId: data.mediaId as string[],
        status: data.status,
        createdAt: new Date(),
        updatedAt: new Date(),
        maxRedemption: 0,
        maxPerUser: 0,
      };
      prisma.businessDeal.create.mockResolvedValue(createdDeal);

      const result = await service.create(data);
      expect(result).toEqual(createdDeal);
      expect(prisma.businessDeal.create).toHaveBeenCalledWith({ data });
    });
  });

  describe('findAll', () => {
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
      prisma.businessDeal.findMany.mockResolvedValue(deals);

      const result = await service.findAll(paginationArgs);
      expect(result).toEqual(deals);
      expect(prisma.businessDeal.findMany).toHaveBeenCalledWith({
        skip: paginationArgs.skip,
        take: paginationArgs.take,
      });
    });
  });

  describe('findOne', () => {
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
      prisma.businessDeal.findUnique.mockResolvedValue(deal);

      const result = await service.findOne('1');
      expect(result).toEqual(deal);
      expect(prisma.businessDeal.findUnique).toHaveBeenCalledWith({
        where: { id: '1' },
      });
    });

    it('should return null if business deal is not found', async () => {
      prisma.businessDeal.findUnique.mockResolvedValue(null);

      const result = await service.findOne('1');
      expect(result).toBeNull();
      expect(prisma.businessDeal.findUnique).toHaveBeenCalledWith({
        where: { id: '1' },
      });
    });
  });

  describe('update', () => {
    it('should update and return the business deal', async () => {
      const data: Prisma.BusinessDealUpdateInput = {
        name: 'Updated Deal',
      };
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
      prisma.businessDeal.update.mockResolvedValue(updatedDeal);

      const result = await service.update('1', data);
      expect(result).toEqual(updatedDeal);
      expect(prisma.businessDeal.update).toHaveBeenCalledWith({
        where: { id: '1' },
        data,
      });
    });
  });

  describe('delete', () => {
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
      prisma.businessDeal.delete.mockResolvedValue(deal);

      const result = await service.delete('1');
      expect(result).toEqual(deal);
      expect(prisma.businessDeal.delete).toHaveBeenCalledWith({
        where: { id: '1' },
      });
    });
  });

  describe('getBusinessById', () => {
    it('should return the associated business', async () => {
      const business: Business = {
        id: '1',
        name: 'Business 1',
        description: '',
        website: '',
        isClaimed: false,
        businessCategoryId: [],
        amenityId: [],
        languageId: [],
        regionId: '',
        claimedBy: '',
        mediaId: [],
        status: 'ACTIVE',
        createdAt: undefined,
        updatedAt: undefined,
      };
      prisma.business.findUnique.mockResolvedValue(business);

      const result = await service.getBusinessById('1');
      expect(result).toEqual(business);
      expect(prisma.business.findUnique).toHaveBeenCalledWith({
        where: { id: '1' },
      });
    });

    it('should return null if business is not found', async () => {
      prisma.business.findUnique.mockResolvedValue(null);

      const result = await service.getBusinessById('1');
      expect(result).toBeNull();
      expect(prisma.business.findUnique).toHaveBeenCalledWith({
        where: { id: '1' },
      });
    });
  });
});
