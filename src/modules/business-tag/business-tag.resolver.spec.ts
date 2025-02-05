import { Test, TestingModule } from '@nestjs/testing';
import { BusinessTagResolver } from './business-tag.resolver';
import { BusinessTagService } from './business-tag.service';
import {
  BusinessTag,
  CreateBusinessTagInput,
  UpdateBusinessTagInput,
} from './business-tag.graphql';
import { PaginationArgs } from 'src/graphql/pagination-args-types';
import { BusinessTagStatus } from '@prisma/client';

// Mock data for testing
const mockBusinessTag: BusinessTag = {
  id: '1',
  name: 'Sample',
  status: BusinessTagStatus.ACTIVE,
  createdAt: new Date(),
};

// Mock implementation of the BusinessTagService
const mockBusinessTagService = {
  create: jest.fn().mockResolvedValue(mockBusinessTag),
  findAll: jest.fn().mockResolvedValue([mockBusinessTag]),
  findOne: jest.fn().mockResolvedValue(mockBusinessTag),
  update: jest.fn().mockResolvedValue(mockBusinessTag),
  delete: jest.fn().mockResolvedValue(mockBusinessTag),
};

describe('BusinessTagResolver', () => {
  let resolver: BusinessTagResolver;
  let service: BusinessTagService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BusinessTagResolver,
        {
          provide: BusinessTagService,
          useValue: mockBusinessTagService, // Inject the mocked service
        },
      ],
    }).compile();

    resolver = module.get<BusinessTagResolver>(BusinessTagResolver);
    service = module.get<BusinessTagService>(BusinessTagService);
  });
  describe('createBusinessTag', () => {
    it('should create and return a business-tags', async () => {
      const input: CreateBusinessTagInput = {
        ...mockBusinessTag,
      };

      const result = await resolver.createBusinessTag(input);
      expect(service.create).toHaveBeenCalledWith(input);
      expect(result).toEqual(mockBusinessTag);
    });
  });

  describe('businessTags (findAll)', () => {
    it('should return an array of business-tags', async () => {
      const paginationArgs: PaginationArgs = {
        skip: 0,
        take: 10,
        limit: 10,
        page: 1,
      };

      // Call the resolver method
      const result = await resolver.businessTags(paginationArgs);

      // Expect the service method to have been called
      expect(service.findAll).toHaveBeenCalledWith(paginationArgs);
      expect(result).toEqual([mockBusinessTag]);
    });
  });

  describe('businessTag (findOne)', () => {
    it('should return a single business-tag by ID', async () => {
      const id = '1';

      // Call the resolver method
      const result = await resolver.businessTag(id);

      // Expect the service method to have been called
      expect(service.findOne).toHaveBeenCalledWith(id);
      expect(result).toEqual(mockBusinessTag);
    });
  });

  describe('updateBusinessTag (update)', () => {
    it('should update and return the modified business-tag', async () => {
      const id = '1';
      const updateData = { name: 'Updated' };
      const input: UpdateBusinessTagInput = {
        ...updateData,
      };

      // Call the resolver method
      const result = await resolver.updateBusinessTag(id, input);

      // Expect the service method to have been called with correct arguments
      expect(service.update).toHaveBeenCalledWith(id, updateData);
      expect(result).toEqual(mockBusinessTag);
    });
  });

  describe('deleteBusinessTag (delete)', () => {
    it('should delete a business-tag and return it', async () => {
      const id = '1';

      // Call the resolver method
      const result = await resolver.deleteBusinessTag(id);

      // Expect the service method to have been called
      expect(service.delete).toHaveBeenCalledWith(id);
      expect(result).toEqual(mockBusinessTag);
    });
  });
});
