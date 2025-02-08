import { Test, TestingModule } from '@nestjs/testing';
import { BusinessLocationResolver } from './business-location.resolver';
import { BusinessLocationService } from './business-location.service';
import { PaginationArgs } from 'src/graphql/pagination-args-types';
import {
  CreateBusinessLocationInput,
  UpdateBusinessLocationInput,
} from './business-location.graphql';
import { Business, BusinessLocationStatus } from '@prisma/client';

const paginationArgs: PaginationArgs = {
  skip: 0,
  take: 10,
  limit: 10,
  page: 1,
};
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

const mockBusinessLocation = {
  id: '507f1f77bcf86cd799439011',
  business: business,
  address: '123 Test St',
  latitude: '40.7128',
  longitude: '-74.006',
  countryId: '507f1f77bcf86cd799439013',
  provinceId: '507f1f77bcf86cd799439014',
  cityId: '507f1f77bcf86cd799439015',
  zipCode: '10001',
  phone: '1234567890',
  status: BusinessLocationStatus.OPEN,
  createdAt: new Date(),
  updatedAt: new Date(),
};

const mockService = {
  findAll: jest.fn().mockResolvedValue([mockBusinessLocation]),
  findOne: jest.fn().mockResolvedValue(mockBusinessLocation),
  create: jest.fn().mockResolvedValue(mockBusinessLocation),
  update: jest.fn().mockResolvedValue(mockBusinessLocation),
  getBusiness: jest.fn().mockResolvedValue(mockBusinessLocation.business),
};

describe('BusinessLocationResolver', () => {
  let resolver: BusinessLocationResolver;
  let service: BusinessLocationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BusinessLocationResolver,
        { provide: BusinessLocationService, useValue: mockService },
      ],
    }).compile();

    resolver = module.get<BusinessLocationResolver>(BusinessLocationResolver);
    service = module.get<BusinessLocationService>(BusinessLocationService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('should return a list of business locations', async () => {
    await expect(resolver.businessLocations(paginationArgs)).resolves.toEqual([
      mockBusinessLocation,
    ]);
  });

  it('should return a single business location', async () => {
    await expect(
      resolver.businessLocation('507f1f77bcf86cd799439011'),
    ).resolves.toEqual(mockBusinessLocation);
  });

  it('should create a business location', async () => {
    const input: CreateBusinessLocationInput = {
      businessId: '507f1f77bcf86cd799439012',
      address: '123 Test St',
      latitude: 40.7128,
      longitude: -74.006,
      countryId: '507f1f77bcf86cd799439013',
      provinceId: '507f1f77bcf86cd799439014',
      cityId: '507f1f77bcf86cd799439015',
      zipCode: '10001',
      phone: '1234567890',
      status: BusinessLocationStatus.OPEN,
    };
    await expect(resolver.createBusinessLocation(input)).resolves.toEqual(
      mockBusinessLocation,
    );
  });

  it('should update a business location', async () => {
    const input: UpdateBusinessLocationInput = {
      address: '456 New St',
      businessId: '',
    };
    await expect(
      resolver.updateBusinessLocation('507f1f77bcf86cd799439011', input),
    ).resolves.toEqual(mockBusinessLocation);
  });

  it('should resolve business field', async () => {
    return await expect(
      resolver.business(mockBusinessLocation),
    ).resolves.toEqual(mockBusinessLocation.business);
  });

  it('should handle errors in findOne', async () => {
    jest.spyOn(service, 'findOne').mockRejectedValue(new Error('Not found'));
    await expect(resolver.businessLocation('invalid-id')).rejects.toThrow(
      'Not found',
    );
  });
});
