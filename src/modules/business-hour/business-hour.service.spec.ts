import { Test, TestingModule } from '@nestjs/testing';
import { BusinessHourService } from './business-hour.service';
import { PrismaService } from '../prisma/prisma.service';
import { Business, BusinessHour, BusinessHourStatus } from '@prisma/client';
import { PaginationArgs } from 'src/graphql/pagination-args-types';
import { mockDeep, DeepMockProxy } from 'jest-mock-extended';

describe('BusinessHourService', () => {
  let service: BusinessHourService;
  let prisma: DeepMockProxy<PrismaService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BusinessHourService,
        {
          provide: PrismaService,
          useValue: mockDeep<PrismaService>(),
        },
      ],
    }).compile();

    service = module.get<BusinessHourService>(BusinessHourService);
    prisma = module.get(PrismaService);
  });

  describe('create', () => {
    it('should create and return a business hour', async () => {
      const data = {
        business: { connect: { id: 'someBusinessId' } },
        dayOfWeek: 'Monday',
        openTime: '09:00',
        closeTime: '17:00',
        status: BusinessHourStatus.ACTIVE,
      };

      const createdBusinessHour: BusinessHour = {
        id: 'newObjectId',
        businessId: 'someBusinessId',
        dayOfWeek: 'Monday',
        openTime: '09:00',
        closeTime: '17:00',
        status: BusinessHourStatus.ACTIVE,
        createdAt: new Date(),
      };

      prisma.businessHour.create.mockResolvedValue(createdBusinessHour);

      const result = await service.create(data);
      expect(result).toEqual(createdBusinessHour);
    });

    it('should throw an error if creation fails', async () => {
      prisma.businessHour.create.mockRejectedValue(
        new Error('Creation failed'),
      );

      await expect(service.create({} as any)).rejects.toThrow(
        'Creation failed',
      );
    });
  });

  describe('findAll', () => {
    it('should return an array of business hours', async () => {
      const paginationArgs: PaginationArgs = {
        skip: 0,
        take: 10,
        limit: 10,
        page: 1,
      };
      const businessHours: BusinessHour[] = [
        {
          id: 'someObjectId',
          businessId: 'someBusinessId',
          dayOfWeek: 'Monday',
          openTime: '09:00',
          closeTime: '17:00',
          status: BusinessHourStatus.ACTIVE,
          createdAt: new Date(),
        },
      ];

      prisma.businessHour.findMany.mockResolvedValue(businessHours);

      const result = await service.findAll(paginationArgs);
      expect(result).toEqual(businessHours);
    });
  });

  describe('findOne', () => {
    it('should return a single business hour', async () => {
      const businessHour: BusinessHour = {
        id: 'someObjectId',
        businessId: 'someBusinessId',
        dayOfWeek: 'Monday',
        openTime: '09:00',
        closeTime: '17:00',
        status: BusinessHourStatus.ACTIVE,
        createdAt: new Date(),
      };

      prisma.businessHour.findUnique.mockResolvedValue(businessHour);

      const result = await service.findOne('someObjectId');
      expect(result).toEqual(businessHour);
    });

    it('should return null if business hour not found', async () => {
      prisma.businessHour.findUnique.mockResolvedValue(null);

      const result = await service.findOne('nonExistentId');
      expect(result).toBeNull();
    });
  });

  describe('update', () => {
    it('should update and return the business hour', async () => {
      const data = { dayOfWeek: 'Tuesday' };

      const updatedBusinessHour: BusinessHour = {
        id: 'existingObjectId',
        businessId: 'someBusinessId',
        dayOfWeek: 'Tuesday',
        openTime: '09:00',
        closeTime: '17:00',
        status: BusinessHourStatus.ACTIVE,
        createdAt: new Date(),
      };

      prisma.businessHour.update.mockResolvedValue(updatedBusinessHour);

      const result = await service.update('existingObjectId', data);
      expect(result).toEqual(updatedBusinessHour);
    });

    it('should throw an error if update fails', async () => {
      prisma.businessHour.update.mockRejectedValue(new Error('Update failed'));

      await expect(service.update('existingObjectId', {})).rejects.toThrow(
        'Update failed',
      );
    });
  });

  describe('delete', () => {
    it('should delete and return the business hour', async () => {
      const deletedBusinessHour: BusinessHour = {
        id: 'deletedObjectId',
        businessId: 'someBusinessId',
        dayOfWeek: 'Monday',
        openTime: '09:00',
        closeTime: '17:00',
        status: BusinessHourStatus.ACTIVE,
        createdAt: new Date(),
      };

      prisma.businessHour.delete.mockResolvedValue(deletedBusinessHour);

      const result = await service.delete('deletedObjectId');
      expect(result).toEqual(deletedBusinessHour);
    });

    it('should throw an error if deletion fails', async () => {
      prisma.businessHour.delete.mockRejectedValue(
        new Error('Deletion failed'),
      );

      await expect(service.delete('deletedObjectId')).rejects.toThrow(
        'Deletion failed',
      );
    });
  });

  describe('getBusiness', () => {
    it('should return the associated business', async () => {
      const business: Business = {
        id: 'businessId',
        name: 'Business Name',
        createdAt: undefined,
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
        updatedAt: undefined,
      };
      prisma.business.findUnique.mockResolvedValue(business);

      const result = await service.getBusiness('someBusinessId');
      expect(result).toEqual(business);
    });

    it('should return null if business not found', async () => {
      prisma.business.findUnique.mockResolvedValue(null);

      const result = await service.getBusiness('nonExistentBusinessId');
      expect(result).toBeNull();
    });
  });
});
