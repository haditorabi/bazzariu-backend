import { Test, TestingModule } from '@nestjs/testing';
import { BusinessResolver } from './business.resolver';
import { BusinessService } from './business.service';
import {
  Business,
  CreateBusinessInput,
  UpdateBusinessInput,
} from './business.graphql';
import { PaginationArgs } from 'src/graphql/pagination-args-types';
import { BusinessStatus } from '@prisma/client';

// Mock data for testing
const mockBusiness: Business = {
  id: '1',
  createdAt: new Date(),
  name: 'ssss',
  isClaimed: false,
  status: BusinessStatus.ACTIVE,
};

// Mock implementation of the BusinessService
const mockBusinessService = {
  create: jest.fn().mockResolvedValue(mockBusiness),
  findAll: jest.fn().mockResolvedValue([mockBusiness]),
  findOne: jest.fn().mockResolvedValue(mockBusiness),
  update: jest.fn().mockResolvedValue(mockBusiness),
  delete: jest.fn().mockResolvedValue(mockBusiness),
};

describe('BusinessResolver', () => {
  let resolver: BusinessResolver;
  let service: BusinessService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BusinessResolver,
        {
          provide: BusinessService,
          useValue: mockBusinessService, // Inject the mocked service
        },
      ],
    }).compile();

    resolver = module.get<BusinessResolver>(BusinessResolver);
    service = module.get<BusinessService>(BusinessService);
  });
  describe('createBusiness', () => {
    it('should create and return a businesss', async () => {
      const input: CreateBusinessInput = {
        ...mockBusiness,
      };

      const result = await resolver.createBusiness(input);
      // expect(service.create).toHaveBeenCalledWith(input);
      expect(result).toEqual(mockBusiness);
    });
  });

  describe('businesss (findAll)', () => {
    it('should return an array of businesss', async () => {
      const paginationArgs: PaginationArgs = {
        skip: 0,
        take: 10,
        limit: 10,
        page: 1,
      };

      // Call the resolver method
      const result = await resolver.businesses(paginationArgs);

      // Expect the service method to have been called
      expect(service.findAll).toHaveBeenCalledWith(paginationArgs);
      expect(result).toEqual([mockBusiness]);
    });
  });

  describe('business (findOne)', () => {
    it('should return a single business by ID', async () => {
      const id = '1';

      // Call the resolver method
      const result = await resolver.business(id);

      // Expect the service method to have been called
      expect(service.findOne).toHaveBeenCalledWith(id);
      expect(result).toEqual(mockBusiness);
    });
  });

  describe('updateBusiness (update)', () => {
    it('should update and return the modified business', async () => {
      const id = '1';
      const updateData = { name: 'Updated' };
      const input: UpdateBusinessInput = {
        ...updateData,
      };

      // Call the resolver method
      const result = await resolver.updateBusiness(id, input);

      // Expect the service method to have been called with correct arguments
      expect(service.update).toHaveBeenCalledWith(id, updateData);
      expect(result).toEqual(mockBusiness);
    });
  });

  describe('deleteBusiness (delete)', () => {
    it('should delete a business and return it', async () => {
      const id = '1';

      // Call the resolver method
      const result = await resolver.deleteBusiness(id);

      // Expect the service method to have been called
      expect(service.delete).toHaveBeenCalledWith(id);
      expect(result).toEqual(mockBusiness);
    });
  });
});
