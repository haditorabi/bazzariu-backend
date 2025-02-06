import { Test, TestingModule } from '@nestjs/testing';
import { ProductCategoryResolver } from './product-category.resolver';
import { ProductCategoryService } from './product-category.service';
import {
  ProductCategory,
  CreateProductCategoryInput,
  UpdateProductCategoryInput,
} from './product-category.graphql';
import { PaginationArgs } from 'src/graphql/pagination-args-types';
import { ProductCategoryStatus } from '@prisma/client';

// Mock data for testing
const mockProductCategory: ProductCategory = {
  id: '1',
  name: 'Sample',
  status: ProductCategoryStatus.ACTIVE,
  createdAt: new Date(),
};

// Mock implementation of the ProductCategoryService
const mockProductCategoryService = {
  create: jest.fn().mockResolvedValue(mockProductCategory),
  findAll: jest.fn().mockResolvedValue([mockProductCategory]),
  findOne: jest.fn().mockResolvedValue(mockProductCategory),
  update: jest.fn().mockResolvedValue(mockProductCategory),
  delete: jest.fn().mockResolvedValue(mockProductCategory),
};

describe('ProductCategoryResolver', () => {
  let resolver: ProductCategoryResolver;
  let service: ProductCategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductCategoryResolver,
        {
          provide: ProductCategoryService,
          useValue: mockProductCategoryService, // Inject the mocked service
        },
      ],
    }).compile();

    resolver = module.get<ProductCategoryResolver>(ProductCategoryResolver);
    service = module.get<ProductCategoryService>(ProductCategoryService);
  });
  describe('createProductCategory', () => {
    it('should create and return a product-categorys', async () => {
      const input: CreateProductCategoryInput = {
        ...mockProductCategory,
      };

      const result = await resolver.createProductCategory(input);
      expect(service.create).toHaveBeenCalledWith(input);
      expect(result).toEqual(mockProductCategory);
    });
  });

  describe('productCategorys (findAll)', () => {
    it('should return an array of product-categorys', async () => {
      const paginationArgs: PaginationArgs = {
        skip: 0,
        take: 10,
        limit: 10,
        page: 1,
      };

      // Call the resolver method
      const result = await resolver.productCategories(paginationArgs);

      // Expect the service method to have been called
      expect(service.findAll).toHaveBeenCalledWith(paginationArgs);
      expect(result).toEqual([mockProductCategory]);
    });
  });

  describe('productCategory (findOne)', () => {
    it('should return a single product-category by ID', async () => {
      const id = '1';

      // Call the resolver method
      const result = await resolver.productCategory(id);

      // Expect the service method to have been called
      expect(service.findOne).toHaveBeenCalledWith(id);
      expect(result).toEqual(mockProductCategory);
    });
  });

  describe('updateProductCategory (update)', () => {
    it('should update and return the modified product-category', async () => {
      const id = '1';
      const updateData = { name: 'Updated' };
      const input: UpdateProductCategoryInput = {
        ...updateData,
      };

      // Call the resolver method
      const result = await resolver.updateProductCategory(id, input);

      // Expect the service method to have been called with correct arguments
      expect(service.update).toHaveBeenCalledWith(id, updateData);
      expect(result).toEqual(mockProductCategory);
    });
  });

  describe('deleteProductCategory (delete)', () => {
    it('should delete a product-category and return it', async () => {
      const id = '1';

      // Call the resolver method
      const result = await resolver.deleteProductCategory(id);

      // Expect the service method to have been called
      expect(service.delete).toHaveBeenCalledWith(id);
      expect(result).toEqual(mockProductCategory);
    });
  });
});
