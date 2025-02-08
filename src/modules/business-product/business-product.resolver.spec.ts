import { Test, TestingModule } from '@nestjs/testing';
import { BusinessProductResolver } from './business-product.resolver';
import { BusinessProductService } from './business-product.service';
import { PaginationArgs } from 'src/graphql/pagination-args-types';
import { BusinessProductStatus, BusinessStatus } from '@prisma/client';

const mockBusinessProductService = {
  create: jest.fn(),
  findAll: jest.fn(),
  findOne: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
  getBusiness: jest.fn(),
  getProductCategory: jest.fn(),
  getBusinessDeal: jest.fn(),
  getBusinessProductPrice: jest.fn(),
};

describe('BusinessProductResolver', () => {
  let resolver: BusinessProductResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BusinessProductResolver,
        {
          provide: BusinessProductService,
          useValue: mockBusinessProductService,
        },
      ],
    }).compile();

    resolver = module.get<BusinessProductResolver>(BusinessProductResolver);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Queries', () => {
    it('should return an array of business products', async () => {
      const paginationArgs: PaginationArgs = {
        skip: 0,
        take: 10,
        limit: 10,
        page: 1,
      };
      const result = [
        {
          id: '1',
          businessId: '1',
          name: 'Product 1',
          status: BusinessProductStatus.ACTIVE,
          business: {
            id: '1',
            name: 'Business 1',
            isClaimed: true,
            status: BusinessStatus.ACTIVE,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      mockBusinessProductService.findAll.mockResolvedValue(result);

      expect(await resolver.businessProducts(paginationArgs)).toEqual(result);
      expect(mockBusinessProductService.findAll).toHaveBeenCalledWith(
        paginationArgs,
      );
    });

    it('should return a single business product', async () => {
      const id = '1';
      const result = {
        id,
        businessId: '1',
        name: 'Product 1',
        status: BusinessProductStatus.ACTIVE,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockBusinessProductService.findOne.mockResolvedValue(result);

      expect(await resolver.businessProduct(id)).toEqual(result);
      expect(mockBusinessProductService.findOne).toHaveBeenCalledWith(id);
    });
  });

  describe('Mutations', () => {
    // it('should create a business product', async () => {
    //   const createInput = {
    //     id: '1',
    //     business: '1',
    //     name: 'Product 1',
    //     status: BusinessProductStatus.ACTIVE,
    //     createdAt: new Date(),
    //     updatedAt: new Date(),
    //   };

    //   const result = {
    //     id: '1',
    //     businessId: '1',
    //     name: 'Product 1',
    //     status: BusinessProductStatus.ACTIVE,
    //     createdAt: new Date(),
    //     updatedAt: new Date(),
    //   };

    //   mockBusinessProductService.create.mockResolvedValue(result);

    //   expect(mockBusinessProductService.create).toHaveBeenCalledWith(
    //     expect.objectContaining(createInput),
    //   );
    // });

    it('should update a business product', async () => {
      const id = '1';
      const updateInput = {
        name: 'Updated Product',
        status: BusinessProductStatus.SUSPENDED,
      };

      const result = {
        id,
        businessId: '1',
        name: 'Updated Product',
        status: BusinessProductStatus.SUSPENDED,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockBusinessProductService.update.mockResolvedValue(result);

      expect(await resolver.updateBusinessProduct(id, updateInput)).toEqual(
        result,
      );
      expect(mockBusinessProductService.update).toHaveBeenCalledWith(
        id,
        expect.objectContaining(updateInput),
      );
    });

    it('should delete a business product', async () => {
      const id = '1';
      const result = {
        id: '1',
        businessId: '1',
        name: 'Product 1',
        status: BusinessProductStatus.ACTIVE,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockBusinessProductService.delete.mockResolvedValue(result);

      expect(await resolver.deleteBusinessProduct(id)).toEqual(result);
      expect(mockBusinessProductService.delete).toHaveBeenCalledWith(id);
    });
  });

  describe('Resolve Fields', () => {
    it('should resolve business field', async () => {
      const businessProduct = {
        id: '1',
        businessId: '1',
        name: 'Product 1',
        status: BusinessProductStatus.ACTIVE,
        createdAt: new Date(),
        updatedAt: new Date(),
        business: {
          id: '1',
          name: 'Business 1',
          isClaimed: true,
          status: BusinessStatus.ACTIVE,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      };
      const result = { id: '1', name: 'Business 1' };

      mockBusinessProductService.getBusiness.mockResolvedValue(result);

      expect(await resolver.business(businessProduct)).toEqual(result);
      expect(mockBusinessProductService.getBusiness).toHaveBeenCalledWith(
        businessProduct.businessId,
      );
    });

    it('should resolve productCategory field', async () => {
      const businessProduct = {
        id: '1',
        businessId: '1',
        name: 'Product 1',
        status: BusinessProductStatus.ACTIVE,
        createdAt: new Date(),
        updatedAt: new Date(),
        productCategroyId: '1',
        businessDealId: '1',
        business: {
          id: '1',
          name: 'Business 1',
          isClaimed: true,
          status: BusinessStatus.ACTIVE,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      };
      const result = { id: '1', name: 'Category 1' };

      mockBusinessProductService.getProductCategory.mockResolvedValue(result);

      expect(await resolver.productCategroy(businessProduct)).toEqual(result);
      expect(
        mockBusinessProductService.getProductCategory,
      ).toHaveBeenCalledWith(businessProduct.productCategroyId);
    });

    it('should resolve businessDeal field', async () => {
      const businessProduct = {
        id: '1',
        businessId: '1',
        name: 'Product 1',
        status: BusinessProductStatus.ACTIVE,
        createdAt: new Date(),
        productCategroyId: '1',
        businessDealId: '1',
        updatedAt: new Date(),
        business: {
          id: '1',
          name: 'Business 1',
          isClaimed: true,
          status: BusinessStatus.ACTIVE,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      };
      const result = { id: '1', name: 'Deal 1' };

      mockBusinessProductService.getBusinessDeal.mockResolvedValue([result]);

      expect(await resolver.businessDeal(businessProduct)).toEqual([result]);
      expect(mockBusinessProductService.getBusinessDeal).toHaveBeenCalledWith([
        businessProduct.businessDealId,
      ]);
    });

    it('should resolve businessProductPrice field', async () => {
      const businessProduct = {
        id: '1',
        businessId: '1',
        name: 'Product 1',
        status: BusinessProductStatus.ACTIVE,
        createdAt: new Date(),
        updatedAt: new Date(),
        business: {
          id: '1',
          name: 'Business 1',
          isClaimed: true,
          status: BusinessStatus.ACTIVE,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      };

      const result = { id: '1', price: 100 };

      mockBusinessProductService.getBusinessProductPrice.mockResolvedValue(
        result,
      );

      expect(await resolver.businessProductPrice(businessProduct)).toEqual(
        result,
      );
      expect(
        mockBusinessProductService.getBusinessProductPrice,
      ).toHaveBeenCalledWith(businessProduct.id);
    });
  });

  describe('Error Handling', () => {
    it('should throw error if create fails', async () => {
      const createInput = {
        businessId: '1',
        name: 'Product 1',
        status: BusinessProductStatus.ACTIVE,
      };

      mockBusinessProductService.create.mockRejectedValue(
        new Error('Create failed'),
      );

      await expect(resolver.createBusinessProduct(createInput)).rejects.toThrow(
        'Create failed',
      );
    });

    it('should throw error if update fails', async () => {
      const id = '1';
      const updateInput = { name: 'Updated Product' };

      mockBusinessProductService.update.mockRejectedValue(
        new Error('Update failed'),
      );

      await expect(
        resolver.updateBusinessProduct(id, updateInput),
      ).rejects.toThrow('Update failed');
    });
  });

  describe('Input Validation', () => {
    // it('should validate required fields on create', async () => {
    //   const createInput = {
    //     business: '1',
    //     name: 'Product 1',
    //     status: BusinessProductStatus.ACTIVE,
    //   };
    //   await expect(
    //     resolver.createBusinessProduct(createInput),
    //   ).resolves.not.toThrow();
    // });
    // it('should validate required fields on update', async () => {
    //   const id = '1';
    //   const updateInput = { name: 'Updated Product' };
    //   await expect(
    //     resolver.updateBusinessProduct(id, updateInput),
    //   ).resolves.not.toThrow();
    // });
  });
});
