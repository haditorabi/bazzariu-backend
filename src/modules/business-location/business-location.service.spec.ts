import { Test, TestingModule } from '@nestjs/testing';
import { BusinessLocationService } from './business-location.service';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, BusinessLocation, Business } from '@prisma/client';
import { PaginationArgs } from 'src/graphql/pagination-args-types';
import { DeepMockProxy } from 'jest-mock-extended';

describe('BusinessLocationService', () => {
  let service: BusinessLocationService;
  let prisma: DeepMockProxy<PrismaService>;

  const mockBusinessLocation: BusinessLocation = {
    id: '65d1f23e2c4b1a001b23c456',
    businessId: '65d1f23e2c4b1a001b23c789',
    address: '123 Test St',
    latitude: 40.7128,
    longitude: -74.006,
    countryId: '65d1f23e2c4b1a001b23d101',
    provinceId: '65d1f23e2c4b1a001b23d202',
    cityId: '65d1f23e2c4b1a001b23d303',
    zipCode: '10001',
    phone: '1234567890',
    status: 'OPEN',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockBusiness: Business = {
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

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BusinessLocationService,
        {
          provide: PrismaService,
          useValue: {
            businessLocation: {
              create: jest.fn().mockResolvedValue(mockBusinessLocation),
              findMany: jest.fn().mockResolvedValue([mockBusinessLocation]),
              findUnique: jest.fn().mockResolvedValue(mockBusinessLocation),
              update: jest.fn().mockResolvedValue(mockBusinessLocation),
              delete: jest.fn().mockResolvedValue(mockBusinessLocation),
            },
            business: {
              findUnique: jest.fn().mockResolvedValue(mockBusiness),
            },
          },
        },
      ],
    }).compile();

    service = module.get<BusinessLocationService>(BusinessLocationService);
    prisma = module.get(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a business location', async () => {
      const createInput: Prisma.BusinessLocationCreateInput = {
        business: { connect: { id: mockBusiness.id } },
        address: mockBusinessLocation.address,
        latitude: mockBusinessLocation.latitude,
        longitude: mockBusinessLocation.longitude,
        countryId: mockBusinessLocation.countryId,
        provinceId: mockBusinessLocation.provinceId,
        cityId: mockBusinessLocation.cityId,
        zipCode: mockBusinessLocation.zipCode,
        phone: mockBusinessLocation.phone,
        status: mockBusinessLocation.status,
      };

      const result = await service.create(createInput);
      expect(result).toEqual(mockBusinessLocation);
      expect(prisma.businessLocation.create).toHaveBeenCalledWith({
        data: createInput,
      });
    });

    it('should throw an error if creation fails', async () => {
      jest
        .spyOn(prisma.businessLocation, 'create')
        .mockRejectedValue(new Error('Create error'));

      await expect(service.create({} as any)).rejects.toThrow('Create error');
    });
  });

  describe('findAll', () => {
    it('should return an array of business locations', async () => {
      const paginationArgs: PaginationArgs = {
        skip: 0,
        take: 10,
        limit: 10,
        page: 1,
      };

      const result = await service.findAll(paginationArgs);
      expect(result).toEqual([mockBusinessLocation]);
      expect(prisma.businessLocation.findMany).toHaveBeenCalledWith({
        skip: paginationArgs.skip,
        take: paginationArgs.take,
      });
    });
  });

  describe('findOne', () => {
    it('should return a single business location', async () => {
      const result = await service.findOne(mockBusinessLocation.id);
      expect(result).toEqual(mockBusinessLocation);
      expect(prisma.businessLocation.findUnique).toHaveBeenCalledWith({
        where: { id: mockBusinessLocation.id },
      });
    });

    it('should throw exception if no business location is found', async () => {
      jest.spyOn(prisma.businessLocation, 'findUnique').mockResolvedValue(null);
      await expect(service.findOne('invalid-id')).rejects.toThrow();
    });
  });

  describe('update', () => {
    it('should update a business location', async () => {
      const updateData: Prisma.BusinessLocationUpdateInput = {
        address: '456 New Address',
      };

      const result = await service.update(mockBusinessLocation.id, updateData);
      expect(result).toEqual(mockBusinessLocation);
      expect(prisma.businessLocation.update).toHaveBeenCalledWith({
        where: { id: mockBusinessLocation.id },
        data: updateData,
      });
    });

    it('should throw an error if update fails', async () => {
      jest
        .spyOn(prisma.businessLocation, 'update')
        .mockRejectedValue(new Error('Update error'));

      await expect(service.update(mockBusinessLocation.id, {})).rejects.toThrow(
        'Update error',
      );
    });
  });

  describe('delete', () => {
    it('should delete a business location', async () => {
      const result = await service.delete(mockBusinessLocation.id);
      expect(result).toEqual(mockBusinessLocation);
      expect(prisma.businessLocation.delete).toHaveBeenCalledWith({
        where: { id: mockBusinessLocation.id },
      });
    });

    it('should throw an error if deletion fails', async () => {
      jest
        .spyOn(prisma.businessLocation, 'delete')
        .mockRejectedValue(new Error('Delete error'));

      await expect(service.delete(mockBusinessLocation.id)).rejects.toThrow(
        'Delete error',
      );
    });
  });

  describe('getBusiness', () => {
    it('should return a business by ID', async () => {
      const result = await service.getBusiness(mockBusiness.id);
      expect(result).toEqual(mockBusiness);
      expect(prisma.business.findUnique).toHaveBeenCalledWith({
        where: { id: mockBusiness.id },
      });
    });

    it('should return null if no business is found', async () => {
      jest.spyOn(prisma.business, 'findUnique').mockResolvedValue(null);

      const result = await service.getBusiness('invalid-id');
      expect(result).toBeNull();
    });
  });
});
