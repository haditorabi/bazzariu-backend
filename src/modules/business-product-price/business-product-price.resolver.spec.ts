import { Test, TestingModule } from '@nestjs/testing';
import { BusinessProductPriceResolver } from './business-product-price.resolver';
import { BusinessProductPriceService } from './business-product-price.service';
import {
  BusinessProductPrice,
  CreateBusinessProductPriceInput,
  UpdateBusinessProductPriceInput,
} from './business-product-price.graphql';
import { PaginationArgs } from 'src/graphql/pagination-args-types';

// Mock data for testing
const mockBusinessProductPrice: BusinessProductPrice = {
  id: '1',
  createdAt: new Date(),
  businessProductId: '1',
  currencyId: '1',
  price: 0,
  updatedAt: undefined,
};

// Mock implementation of the BusinessProductPriceService
const mockBusinessProductPriceService = {
  create: jest.fn().mockResolvedValue(mockBusinessProductPrice),
  findAll: jest.fn().mockResolvedValue([mockBusinessProductPrice]),
  findOne: jest.fn().mockResolvedValue(mockBusinessProductPrice),
  update: jest.fn().mockResolvedValue(mockBusinessProductPrice),
  delete: jest.fn().mockResolvedValue(mockBusinessProductPrice),
};

describe('BusinessProductPriceResolver', () => {
  let resolver: BusinessProductPriceResolver;
  let service: BusinessProductPriceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BusinessProductPriceResolver,
        {
          provide: BusinessProductPriceService,
          useValue: mockBusinessProductPriceService, // Inject the mocked service
        },
      ],
    }).compile();

    resolver = module.get<BusinessProductPriceResolver>(
      BusinessProductPriceResolver,
    );
    service = module.get<BusinessProductPriceService>(
      BusinessProductPriceService,
    );
  });
  describe('createBusinessProductPrice', () => {
    it('should create and return a business-product-prices', async () => {
      const input: CreateBusinessProductPriceInput = {
        ...mockBusinessProductPrice,
        currencyId: '1',
      };

      const result = await resolver.createBusinessProductPrice(input);
      // expect(service.create).toHaveBeenCalledWith(input);
      expect(result).toEqual(mockBusinessProductPrice);
    });
  });

  describe('businessProductPrices (findAll)', () => {
    it('should return an array of business-product-prices', async () => {
      const paginationArgs: PaginationArgs = {
        skip: 0,
        take: 10,
        limit: 10,
        page: 1,
      };

      // Call the resolver method
      const result = await resolver.businessProductPrices(paginationArgs);

      // Expect the service method to have been called
      expect(service.findAll).toHaveBeenCalledWith(paginationArgs);
      expect(result).toEqual([mockBusinessProductPrice]);
    });
  });

  describe('businessProductPrice (findOne)', () => {
    it('should return a single business-product-price by ID', async () => {
      const id = '1';

      // Call the resolver method
      const result = await resolver.businessProductPrice(id);

      // Expect the service method to have been called
      expect(service.findOne).toHaveBeenCalledWith(id);
      expect(result).toEqual(mockBusinessProductPrice);
    });
  });

  describe('updateBusinessProductPrice (update)', () => {
    it('should update and return the modified business-product-price', async () => {
      const id = '1';
      const updateData = { price: 1011 };
      const input: UpdateBusinessProductPriceInput = {
        ...updateData,
      };

      // Call the resolver method
      const result = await resolver.updateBusinessProductPrice(id, input);

      // Expect the service method to have been called with correct arguments
      expect(service.update).toHaveBeenCalledWith(id, updateData);
      expect(result).toEqual(mockBusinessProductPrice);
    });
  });

  describe('deleteBusinessProductPrice (delete)', () => {
    it('should delete a business-product-price and return it', async () => {
      const id = '1';

      // Call the resolver method
      const result = await resolver.deleteBusinessProductPrice(id);

      // Expect the service method to have been called
      expect(service.delete).toHaveBeenCalledWith(id);
      expect(result).toEqual(mockBusinessProductPrice);
    });
  });
});
