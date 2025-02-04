import { Test, TestingModule } from '@nestjs/testing';
import { BusinessCategoryService } from './business-category.service';
import { PrismaService } from '../prisma/prisma.service';
import {
  Prisma,
  BusinessCategory,
  BusinessCategoryStatus,
} from '@prisma/client';
import { DeepMockProxy, mockDeep } from 'jest-mock-extended';
import { PaginationArgs } from 'src/graphql/pagination-args-types';
import { ObjectId } from 'mongodb';

describe('BusinessCategoryService', () => {
  let service: BusinessCategoryService;
  let prisma: DeepMockProxy<PrismaService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BusinessCategoryService,
        {
          provide: PrismaService,
          useValue: mockDeep<PrismaService>(),
        },
      ],
    }).compile();

    service = module.get<BusinessCategoryService>(BusinessCategoryService);
    prisma = module.get(PrismaService);
  });

  describe('create', () => {
    it('should create a new business category', async () => {
      const data: Prisma.BusinessCategoryCreateInput = {
        name: 'New Category',
        mediaId: new ObjectId().toHexString(),
        status: BusinessCategoryStatus.ACTIVE,
      };
      const createdCategory: BusinessCategory = {
        mediaId: new ObjectId().toHexString(),
        id: new ObjectId().toHexString(),
        ...data,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      prisma.businessCategory.create.mockResolvedValue(createdCategory);

      const result = await service.create(data);
      expect(result).toEqual(createdCategory);
    });

    it('should handle errors during creation', async () => {
      const data: Prisma.BusinessCategoryCreateInput = {
        name: 'New Category',
        mediaId: new ObjectId().toHexString(),
        status: BusinessCategoryStatus.ACTIVE,
      };

      prisma.businessCategory.create.mockRejectedValue(
        new Error('Creation Error'),
      );

      await expect(service.create(data)).rejects.toThrow('Creation Error');
    });
  });

  describe('findAll', () => {
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

      prisma.businessCategory.findMany.mockResolvedValue(categories);

      const result = await service.findAll(paginationArgs);
      expect(result).toEqual(categories);
    });

    it('should handle errors during retrieval', async () => {
      const paginationArgs: PaginationArgs = {
        skip: 0,
        take: 10,
        limit: 10,
        page: 1,
      };

      prisma.businessCategory.findMany.mockRejectedValue(
        new Error('Retrieval Error'),
      );

      await expect(service.findAll(paginationArgs)).rejects.toThrow(
        'Retrieval Error',
      );
    });
  });

  describe('findOne', () => {
    it('should return a single business category', async () => {
      const id = new ObjectId().toHexString();
      const category: BusinessCategory = {
        id,
        name: 'Category 1',
        mediaId: new ObjectId().toHexString(),
        status: BusinessCategoryStatus.ACTIVE,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      prisma.businessCategory.findUnique.mockResolvedValue(category);

      const result = await service.findOne(id);
      expect(result).toEqual(category);
    });

    it('should return null if business category is not found', async () => {
      const id = new ObjectId().toHexString();

      prisma.businessCategory.findUnique.mockResolvedValue(null);

      const result = await service.findOne(id);
      expect(result).toBeNull();
    });

    it('should handle errors during retrieval', async () => {
      const id = new ObjectId().toHexString();

      prisma.businessCategory.findUnique.mockRejectedValue(
        new Error('Retrieval Error'),
      );

      await expect(service.findOne(id)).rejects.toThrow('Retrieval Error');
    });
  });

  describe('update', () => {
    it('should update and return the business category', async () => {
      const id = new ObjectId().toHexString();
      const data: Prisma.BusinessCategoryUpdateInput = {
        name: 'Updated Category',
      };
      const updatedCategory: BusinessCategory = {
        id,
        name: 'Updated Category',
        mediaId: new ObjectId().toHexString(),
        status: BusinessCategoryStatus.ACTIVE,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      prisma.businessCategory.update.mockResolvedValue(updatedCategory);

      const result = await service.update(id, data);
      expect(result).toEqual(updatedCategory);
    });

    it('should handle errors during update', async () => {
      const id = new ObjectId().toHexString();
      const data: Prisma.BusinessCategoryUpdateInput = {
        name: 'Updated Category',
      };

      prisma.businessCategory.update.mockRejectedValue(
        new Error('Update Error'),
      );

      await expect(service.update(id, data)).rejects.toThrow('Update Error');
    });
  });

  describe('delete', () => {
    it('should delete and return the business category', async () => {
      const id = new ObjectId().toHexString();
      const deletedCategory: BusinessCategory = {
        id,
        name: 'Category to Delete',
        mediaId: new ObjectId().toHexString(),
        status: BusinessCategoryStatus.ACTIVE,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      prisma.businessCategory.delete.mockResolvedValue(deletedCategory);

      const result = await service.delete(id);
      expect(result).toEqual(deletedCategory);
    });

    it('should handle errors during deletion', async () => {
      const id = new ObjectId().toHexString();

      prisma.businessCategory.delete.mockRejectedValue(
        new Error('Deletion Error'),
      );

      await expect(service.delete(id)).rejects.toThrow('Deletion Error');
    });
  });
});
