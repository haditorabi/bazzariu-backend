import { Test, TestingModule } from '@nestjs/testing';
import { BusinessHourResolver } from './business-hour.resolver';
import { BusinessHourService } from './business-hour.service';
import {
  CreateBusinessHourInput,
  UpdateBusinessHourInput,
} from './business-hour.graphql';
import { PaginationArgs } from 'src/graphql/pagination-args-types';
import { mockDeep, DeepMockProxy } from 'jest-mock-extended';
import { Business, BusinessHour, BusinessHourStatus } from '@prisma/client';
import { CommonBusiness } from 'src/graphql/business.type';

describe('BusinessHourResolver', () => {
  let resolver: BusinessHourResolver;
  let service: DeepMockProxy<BusinessHourService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BusinessHourResolver,
        {
          provide: BusinessHourService,
          useValue: mockDeep<BusinessHourService>(),
        },
      ],
    }).compile();

    resolver = module.get<BusinessHourResolver>(BusinessHourResolver);
    service = module.get(BusinessHourService);
  });

  describe('businessHours', () => {
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

      service.findAll.mockResolvedValue(businessHours);

      const result = await resolver.businessHours(paginationArgs);
      expect(result).toEqual(businessHours);
    });
  });

  describe('businessHour', () => {
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

      service.findOne.mockResolvedValue(businessHour);

      const result = await resolver.businessHour('someObjectId');
      expect(result).toEqual(businessHour);
    });

    it('should throw an error if business hour not found', async () => {
      service.findOne.mockResolvedValue(null);

      await expect(resolver.businessHour('nonExistentId')).rejects.toThrow();
    });
  });

  describe('createBusinessHour', () => {
    it('should create and return a business hour', async () => {
      const input: CreateBusinessHourInput = {
        business: 'someBusinessId',
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

      service.create.mockResolvedValue(createdBusinessHour);

      const result = await resolver.createBusinessHour(input);
      expect(result).toEqual(createdBusinessHour);
    });

    it('should throw an error if creation fails', async () => {
      const input: CreateBusinessHourInput = {
        business: 'someBusinessId',
        dayOfWeek: 'Monday',
        openTime: '09:00',
        closeTime: '17:00',
        status: BusinessHourStatus.ACTIVE,
      };

      service.create.mockRejectedValue(new Error('Creation failed'));

      await expect(resolver.createBusinessHour(input)).rejects.toThrow(
        'Creation failed',
      );
    });
  });

  describe('updateBusinessHour', () => {
    it('should update and return the business hour', async () => {
      const input: UpdateBusinessHourInput = {
        dayOfWeek: 'Tuesday',
      };

      const updatedBusinessHour: BusinessHour = {
        id: 'existingObjectId',
        businessId: 'someBusinessId',
        dayOfWeek: 'Tuesday',
        openTime: '09:00',
        closeTime: '17:00',
        status: BusinessHourStatus.ACTIVE,
        createdAt: new Date(),
      };

      service.update.mockResolvedValue(updatedBusinessHour);

      const result = await resolver.updateBusinessHour(
        'existingObjectId',
        input,
      );
      expect(result).toEqual(updatedBusinessHour);
    });

    it('should throw an error if update fails', async () => {
      const input: UpdateBusinessHourInput = {
        dayOfWeek: 'Tuesday',
      };

      service.update.mockRejectedValue(new Error('Update failed'));

      await expect(
        resolver.updateBusinessHour('existingObjectId', input),
      ).rejects.toThrow('Update failed');
    });
  });

  describe('business', () => {
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
      service.getBusiness.mockResolvedValue(business);

      const result = await resolver.business({
        id: 'someObjectId',
        businessId: 'someBusinessId',
        dayOfWeek: 'Monday',
        openTime: '09:00',
        closeTime: '17:00',
        status: BusinessHourStatus.ACTIVE,
        createdAt: new Date(),
        business: new CommonBusiness(),
      });
      expect(result).toEqual(business);
    });

    // it('should throw an error if business not found', async () => {
    //   service.getBusiness.mockResolvedValue(null);

    //   await expect(
    //     resolver.business({
    //       id: 'someObjectId',
    //       businessId: 'someBusinessId',
    //       dayOfWeek: 'Monday',
    //       openTime: '09:00',
    //       closeTime: '17:00',
    //       status: BusinessHourStatus.ACTIVE,
    //       createdAt: new Date(),
    //       business: new CommonBusiness(),
    //     }),
    //   ).rejects.toThrow('Business not found');
    // });
  });
});
