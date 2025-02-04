import { Test, TestingModule } from '@nestjs/testing';
import { BusinessBoostService } from './business-boost.service';
import { PrismaService } from '../prisma/prisma.service';
import {
  Prisma,
  BusinessBoost,
  BusinessBoostType,
  BusinessBoostStatus,
  BusinessStatus,
} from '@prisma/client';
import { mockDeep, DeepMockProxy } from 'jest-mock-extended';
import { ObjectId } from 'mongodb';

describe('BusinessBoostService', () => {
  let service: BusinessBoostService;
  let prisma: DeepMockProxy<PrismaService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BusinessBoostService,
        {
          provide: PrismaService,
          useValue: mockDeep<PrismaService>(),
        },
      ],
    }).compile();

    service = module.get<BusinessBoostService>(BusinessBoostService);
    prisma = module.get(PrismaService);
  });

  describe('create', () => {
    it('should create a new business boost', async () => {
      const data: Prisma.BusinessBoostCreateInput = {
        startAt: new Date(),
        endAt: new Date(),
        type: BusinessBoostType.BOOKING,
        status: BusinessBoostStatus.ACTIVE,
        business: { connect: { id: '1' } },
      };
      const result: BusinessBoost = {
        id: '1',
        businessId: '1',
        startAt: new Date(data.startAt),
        endAt: new Date(data.endAt),
        type: data.type,
        status: data.status,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      prisma.businessBoost.create.mockResolvedValue(result);

      expect(await service.create(data)).toEqual(result);
      expect(prisma.businessBoost.create).toHaveBeenCalledWith({ data });
    });

    it('should handle errors during creation', async () => {
      const data: Prisma.BusinessBoostCreateInput = {
        startAt: new Date(),
        endAt: new Date(),
        type: BusinessBoostType.BOOKING,
        status: BusinessBoostStatus.ACTIVE,
        business: { connect: { id: '1' } },
      };
      prisma.businessBoost.create.mockRejectedValue(
        new Error('Creation error'),
      );

      await expect(service.create(data)).rejects.toThrow('Creation error');
      expect(prisma.businessBoost.create).toHaveBeenCalledWith({ data });
    });
  });

  describe('findAll', () => {
    it('should return an array of business boosts', async () => {
      const result: BusinessBoost[] = [
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
      prisma.businessBoost.findMany.mockResolvedValue(result);

      expect(
        await service.findAll({ skip: 0, take: 10, limit: 10, page: 1 }),
      ).toEqual(result);
      expect(prisma.businessBoost.findMany).toHaveBeenCalledWith({
        skip: 0,
        take: 10,
      });
    });

    it('should handle errors during retrieval', async () => {
      prisma.businessBoost.findMany.mockRejectedValue(
        new Error('Retrieval error'),
      );

      await expect(
        service.findAll({ skip: 0, take: 10, limit: 10, page: 1 }),
      ).rejects.toThrow('Retrieval error');
      expect(prisma.businessBoost.findMany).toHaveBeenCalledWith({
        skip: 0,
        take: 10,
      });
    });
  });

  describe('findOne', () => {
    it('should return a single business boost', async () => {
      const result: BusinessBoost = {
        id: '1',
        businessId: '1',
        startAt: new Date(),
        endAt: new Date(),
        type: BusinessBoostType.BOOKING,
        status: BusinessBoostStatus.ACTIVE,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      prisma.businessBoost.findUnique.mockResolvedValue(result);

      expect(await service.findOne('1')).toEqual(result);
      expect(prisma.businessBoost.findUnique).toHaveBeenCalledWith({
        where: { id: '1' },
        include: { business: true },
      });
    });

    it('should handle errors when business boost is not found', async () => {
      prisma.businessBoost.findUnique.mockResolvedValue(null);

      await expect(service.findOne('1')).rejects.toThrow();
      expect(prisma.businessBoost.findUnique).toHaveBeenCalledWith({
        where: { id: '1' },
        include: { business: true },
      });
    });
  });

  describe('update', () => {
    it('should update and return the business boost', async () => {
      const data: Prisma.BusinessBoostUpdateInput = {
        type: BusinessBoostType.BOOKING,
      };
      const result: BusinessBoost = {
        id: '1',
        businessId: '1',
        startAt: new Date(),
        endAt: new Date(),
        type: BusinessBoostType.BOOKING,
        status: BusinessBoostStatus.ACTIVE,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      prisma.businessBoost.update.mockResolvedValue(result);

      expect(await service.update('1', data)).toEqual(result);
      expect(prisma.businessBoost.update).toHaveBeenCalledWith({
        where: { id: '1' },
        data,
      });
    });

    it('should handle errors during update', async () => {
      const data: Prisma.BusinessBoostUpdateInput = {
        type: BusinessBoostType.BOOKING,
      };
      prisma.businessBoost.update.mockRejectedValue(new Error('Update error'));

      await expect(service.update('1', data)).rejects.toThrow('Update error');
      expect(prisma.businessBoost.update).toHaveBeenCalledWith({
        where: { id: '1' },
        data,
      });
    });
  });

  describe('delete', () => {
    it('should delete and return the business boost', async () => {
      const result: BusinessBoost = {
        id: '1',
        businessId: '1',
        startAt: new Date(),
        endAt: new Date(),
        type: BusinessBoostType.BOOKING,
        status: BusinessBoostStatus.ACTIVE,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      prisma.businessBoost.delete.mockResolvedValue(result);

      expect(await service.delete('1')).toEqual(result);
      expect(prisma.businessBoost.delete).toHaveBeenCalledWith({
        where: { id: '1' },
      });
    });

    it('should handle errors during deletion', async () => {
      prisma.businessBoost.delete.mockRejectedValue(
        new Error('Deletion error'),
      );

      await expect(service.delete('1')).rejects.toThrow('Deletion error');
      expect(prisma.businessBoost.delete).toHaveBeenCalledWith({
        where: { id: '1' },
      });
    });
  });

  describe('getBusiness', () => {
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
      prisma.business.findUnique.mockResolvedValue(mockBusiness);

      expect(await service.getBusiness('1')).toEqual(mockBusiness);
      expect(prisma.business.findUnique).toHaveBeenCalledWith({
        where: { id: '1' },
      });
    });
  });
});
