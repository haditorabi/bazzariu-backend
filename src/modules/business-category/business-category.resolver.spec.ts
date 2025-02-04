import { Test, TestingModule } from '@nestjs/testing';
import { BusinessCategoryResolver } from './business-category.resolver';
import { BusinessCategoryService } from './business-category.service';
import {
  CreateBusinessCategoryInput,
  UpdateBusinessCategoryInput,
} from './business-category.graphql';
import { PaginationArgs } from 'src/graphql/pagination-args-types';
import { BusinessCategory, BusinessCategoryStatus } from '@prisma/client';
import { mockDeep, DeepMockProxy } from 'jest-mock-extended';
import { PrismaService } from '../prisma/prisma.service';
import { ObjectId } from 'mongodb';

describe('BusinessCategoryResolver', () => {
  let resolver: BusinessCategoryResolver;
  let service: DeepMockProxy<BusinessCategoryService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BusinessCategoryResolver,
        {
          provide: BusinessCategoryService,
          useValue: mockDeep<BusinessCategoryService>(),
        },
      ],
    }).compile();

    resolver = module.get<BusinessCategoryResolver>(BusinessCategoryResolver);
    service = module.get(BusinessCategoryService);
  });

  describe('businessCategories', () => {
    it('should return an array of business categories', async () => {
      const paginationArgs: PaginationArgs = {
        skip: 0,
        take: 10,
        limit: 10,
        page: 1,
      };
      const categories: BusinessCategory[] = [
        {
          id: new ObjectId().toHexString(),
          name: 'Category 1',
          mediaId: new ObjectId().toHexString(),
          status: BusinessCategoryStatus.ACTIVE,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];
      service.findAll.mockResolvedValue(categories);
      const result = await resolver.businessCategories(paginationArgs);
      expect(result).toEqual(categories);
    });
  });

  describe('businessCategory', () => {
    it('should return a single business category', async () => {
      const id = new ObjectId().toHexString();
      const category: BusinessCategory = {
        mediaId: new ObjectId().toHexString(),
        id,
        name: 'Category 1',
        status: BusinessCategoryStatus.ACTIVE,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      service.findOne.mockResolvedValue(category);
      const result = await resolver.businessCategory(id);
      expect(result).toEqual(category);
    });
    it('should throw an error if business category is not found', async () => {
      const id = new ObjectId().toHexString();
      service.findOne.mockResolvedValue(null);
      await expect(resolver.businessCategory(id)).rejects.toThrow();
    });
  });

  describe('createBusinessCategory', () => {
    it('should create and return a new business category', async () => {
      const input: CreateBusinessCategoryInput = {
        name: 'New Category',
        mediaId: new ObjectId().toHexString(),
        status: BusinessCategoryStatus.ACTIVE,
      };
      const category: BusinessCategory = {
        mediaId: new ObjectId().toHexString(),
        id: new ObjectId().toHexString(),
        ...input,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      service.create.mockResolvedValue(category);
      const result = await resolver.createBusinessCategory(input);
      expect(result).toEqual(category);
    });
    // it('should throw an error if input validation fails', async () => {
    //   const input: CreateBusinessCategoryInput = {
    //     name: '',
    //     mediaId: new ObjectId().toHexString(),
    //     status: BusinessCategoryStatus.ACTIVE,
    //   };
    //   await expect(resolver.createBusinessCategory(input)).rejects.toThrow(
    //     'Input validation failed',
    //   );
    // });
  });

  describe('updateBusinessCategory', () => {
    it('should update and return the business category', async () => {
      const id = new ObjectId().toHexString();
      const input: UpdateBusinessCategoryInput = {
        name: 'Updated Category',
      };
      const category: BusinessCategory = {
        id,
        name: 'Updated Category',
        mediaId: new ObjectId().toHexString(),
        status: BusinessCategoryStatus.ACTIVE,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      service.update.mockResolvedValue(category);
      const result = await resolver.updateBusinessCategory(id, input);
      expect(result).toEqual(category);
    });
    it('should throw an error if business category is not found', async () => {
      service.update.mockRejectedValue(new Error('Not found'));

      await expect(resolver.updateBusinessCategory('1', {})).rejects.toThrow(
        'Not found',
      );
      expect(service.update).toHaveBeenCalledWith('1', {});
    });
  });

  describe('deleteBusinessCategory', () => {
    it('should delete and return the business category', async () => {
      const id = new ObjectId().toHexString();
      const category: BusinessCategory = {
        id,
        name: 'Category to Delete',
        mediaId: new ObjectId().toHexString(),
        status: BusinessCategoryStatus.ACTIVE,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      service.delete.mockResolvedValue(category);
      const result = await resolver.deleteBusinessCategory(id);
      expect(result).toEqual(category);
    });
    it('should throw an error if business category is not found', async () => {
      service.delete.mockRejectedValue(new Error('Not found'));

      await expect(resolver.deleteBusinessCategory('1')).rejects.toThrow(
        'Not found',
      );
      expect(service.delete).toHaveBeenCalledWith('1');
    });
  });
});
