import { Test, TestingModule } from '@nestjs/testing';
import { ProductCategoryService } from './product-category.service';
import { PrismaService } from '../prisma/prisma.service';
import { ProductCategory } from '@prisma/client';
import { PaginationArgs } from 'src/graphql/pagination-args-types';
import { Prisma } from '@prisma/client';

// Mock data for testing
const mockProductCategory: ProductCategory = {
  id: '1',
  name: 'Sample',
  status: 'ACTIVE', // Prisma enum value
  createdAt: new Date(),
};

// Mock implementation of the PrismaService
const mockPrismaService = {
  productCategory: {
    create: jest.fn().mockResolvedValue(mockProductCategory),
    findMany: jest.fn().mockResolvedValue([mockProductCategory]),
    findUnique: jest.fn().mockResolvedValue(mockProductCategory),
    update: jest.fn().mockResolvedValue(mockProductCategory),
    delete: jest.fn().mockResolvedValue(mockProductCategory),
  },
};

describe('ProductCategoryService', () => {
  let service: ProductCategoryService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductCategoryService,
        {
          provide: PrismaService,
          useValue: mockPrismaService, // Inject the mocked PrismaService
        },
      ],
    }).compile();

    service = module.get<ProductCategoryService>(ProductCategoryService);
    prisma = module.get<PrismaService>(PrismaService);
  });
  describe('create', () => {
    it('should create and return a product-category', async () => {
      const input: Prisma.ProductCategoryCreateInput = {
        ...mockProductCategory,
      };

      const result = await service.create(input);
      expect(prisma.productCategory.create).toHaveBeenCalledWith({
        data: input,
      });
      expect(result).toEqual(mockProductCategory);
    });
  });

  describe('findAll', () => {
    it('should return an array of product-categorys', async () => {
      const paginationArgs: PaginationArgs = {
        skip: 0,
        take: 10,
        limit: 10,
        page: 1,
      };

      // Call the service method
      const result = await service.findAll(paginationArgs);

      // Expect the prisma method to have been called
      expect(prisma.productCategory.findMany).toHaveBeenCalledWith({
        skip: paginationArgs.skip,
        take: paginationArgs.take,
      });
      expect(result).toEqual([mockProductCategory]);
    });
  });

  describe('findOne', () => {
    it('should return a single product-category by ID', async () => {
      const id = '1';

      // Call the service method
      const result = await service.findOne(id);

      // Expect the prisma method to have been called
      expect(prisma.productCategory.findUnique).toHaveBeenCalledWith({
        where: { id },
      });
      expect(result).toEqual(mockProductCategory);
    });
  });

  describe('update', () => {
    it('should update and return the modified product-category', async () => {
      const id = '1';
      const updateData: Prisma.ProductCategoryUpdateInput = { name: 'Updated' };

      // Call the service method
      const result = await service.update(id, updateData);

      // Expect the prisma method to have been called with correct arguments
      expect(prisma.productCategory.update).toHaveBeenCalledWith({
        where: { id },
        data: updateData,
      });
      expect(result).toEqual(mockProductCategory);
    });
  });

  describe('delete', () => {
    it('should delete a product-category and return it', async () => {
      const id = '1';

      // Call the service method
      const result = await service.delete(id);

      // Expect the prisma method to have been called
      expect(prisma.productCategory.delete).toHaveBeenCalledWith({
        where: { id },
      });
      expect(result).toEqual(mockProductCategory);
    });
  });
});
