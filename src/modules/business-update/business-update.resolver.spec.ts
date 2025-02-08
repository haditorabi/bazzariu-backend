import { Test, TestingModule } from '@nestjs/testing';
import { BusinessUpdateResolver } from './business-update.resolver';
import { BusinessUpdateService } from './business-update.service';
import { BusinessUpdate } from './business-update.graphql';
import { PaginationArgs } from 'src/graphql/pagination-args-types';
import { BusinessUpdateStatus } from '@prisma/client';

// Mock data for testing
const mockBusinessUpdate: BusinessUpdate = {
  id: '1',
  status: BusinessUpdateStatus.ACTIVE,
  createdAt: new Date(),
  business: {
    id: '1',
    name: 'Test Business',
    isClaimed: true,
    status: 'ACTIVE',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  businessId: '1',
  context: '1',
  type: 'NEWPRODUCTS',
  startAt: undefined,
  endAt: undefined,
  updatedAt: undefined,
};

// Mock implementation of the BusinessUpdateService
const mockBusinessUpdateService = {
  findAll: jest.fn().mockResolvedValue([mockBusinessUpdate]),
  findOne: jest.fn().mockResolvedValue(mockBusinessUpdate),
  update: jest.fn().mockResolvedValue(mockBusinessUpdate),
  delete: jest.fn().mockResolvedValue(mockBusinessUpdate),
};

describe('BusinessUpdateResolver', () => {
  let resolver: BusinessUpdateResolver;
  let service: BusinessUpdateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BusinessUpdateResolver,
        {
          provide: BusinessUpdateService,
          useValue: mockBusinessUpdateService, // Inject the mocked service
        },
      ],
    }).compile();

    resolver = module.get<BusinessUpdateResolver>(BusinessUpdateResolver);
    service = module.get<BusinessUpdateService>(BusinessUpdateService);
  });

  describe('businessTags (findAll)', () => {
    it('should return an array of business tags', async () => {
      const paginationArgs: PaginationArgs = {
        skip: 0,
        take: 10,
        limit: 10,
        page: 1,
      };

      // Call the resolver method
      const result = await resolver.businessUpdates(paginationArgs);

      // Expect the service method to have been called
      expect(service.findAll).toHaveBeenCalledWith(paginationArgs);
      expect(result).toEqual([mockBusinessUpdate]);
    });
  });

  describe('businessTag (findOne)', () => {
    it('should return a single business tag by ID', async () => {
      const id = '1';

      // Call the resolver method
      const result = await resolver.businessUpdate(id);

      // Expect the service method to have been called
      expect(service.findOne).toHaveBeenCalledWith(id);
      expect(result).toEqual(mockBusinessUpdate);
    });
  });

  describe('updateBusinessUpdate (update)', () => {
    it('should update and return the modified business tag', async () => {
      const id = '1';
      const updateData = { context: 'Updated Tag' };

      // Call the resolver method
      const result = await resolver.updateBusinessUpdate(id, updateData);

      // Expect the service method to have been called with correct arguments
      expect(service.update).toHaveBeenCalledWith(id, updateData);
      expect(result).toEqual(mockBusinessUpdate);
    });
  });

  describe('deleteBusinessUpdate (delete)', () => {
    it('should delete a business tag and return it', async () => {
      const id = '1';

      // Call the resolver method
      const result = await resolver.deleteBusinessUpdate(id);

      // Expect the service method to have been called
      expect(service.delete).toHaveBeenCalledWith(id);
      expect(result).toEqual(mockBusinessUpdate);
    });
  });
});
