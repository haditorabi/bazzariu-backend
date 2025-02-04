import { Test, TestingModule } from '@nestjs/testing';
import { BusinessProductService } from './business-product.service';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, BusinessProduct } from '@prisma/client';

const mockPrismaService = {
  businessProduct: {
    create: jest.fn(),
    findMany: jest.fn(),
    findUnique: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
  business: {
    findUnique: jest.fn(),
  },
  productCategory: {
    findUnique: jest.fn(),
  },
  businessDeal: {
    findMany: jest.fn(),
  },
  businessProductPrice: {
    findFirst: jest.fn(),
  },
};

describe('BusinessProductService', () => {
  let service: BusinessProductService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BusinessProductService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    service = module.get<BusinessProductService>(BusinessProductService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Create', () => {
    // it('should create a business product', async () => {
    //   const createInput: Prisma.BusinessProductCreateInput = {
    //     name: 'Product 1',
    //     status: 'ACTIVE',
    //     business: { connect: { id: '1' } },
    //   };

    //   const result: BusinessProduct = {
    //     id: '1',
    //     businessId: '1',
    //     name: 'Product 1',
    //     status: 'ACTIVE',
    //     createdAt: new Date(),
    //     updatedAt: new Date(),
    //     description: '',
    //     mediaId: [],
    //     productCategoryId: '',
    //     businessBookingId: [],
    //     businessDealId: [],
    //   };

    //   mockPrismaService.businessProduct.create.mockResolvedValue(result);

    //   // expect(await service.create(createInput)).toEqual(result);
    //   expect(mockPrismaService.businessProduct.create).toHaveBeenCalledWith({
    //     data: createInput,
    //   });
    // });

    it('should throw error if create fails', async () => {
      const createInput: Prisma.BusinessProductCreateInput = {
        name: 'Product 1',
        status: 'ACTIVE',
        business: { connect: { id: '1' } },
      };

      mockPrismaService.businessProduct.create.mockRejectedValue(
        new Error('Create failed'),
      );

      await expect(service.create(createInput)).rejects.toThrow(
        'Create failed',
      );
    });
  });

  describe('Find All', () => {
    it('should return an array of business products', async () => {
      const paginationArgs = { skip: 0, take: 10, page: 1, limit: 10 };
      const result: BusinessProduct[] = [
        {
          id: '1',
          businessId: '1',
          name: 'Product 1',
          status: 'ACTIVE',
          createdAt: new Date(),
          updatedAt: new Date(),
          description: '',
          mediaId: [],
          productCategoryId: '',
          businessBookingId: [],
          businessDealId: [],
        },
      ];

      mockPrismaService.businessProduct.findMany.mockResolvedValue(result);

      expect(await service.findAll(paginationArgs)).toEqual(result);
    });

    it('should throw error if find all fails', async () => {
      const paginationArgs = { skip: 0, take: 10, page: 1, limit: 10 };

      mockPrismaService.businessProduct.findMany.mockRejectedValue(
        new Error('Find All failed'),
      );

      await expect(service.findAll(paginationArgs)).rejects.toThrow(
        'Find All failed',
      );
    });
  });

  describe('Find One', () => {
    it('should return a single business product', async () => {
      const id = '1';
      const result: BusinessProduct = {
        id,
        businessId: '1',
        name: 'Product 1',
        status: 'ACTIVE',
        createdAt: new Date(),
        updatedAt: new Date(),
        description: '',
        mediaId: [],
        productCategoryId: '',
        businessBookingId: [],
        businessDealId: [],
      };

      mockPrismaService.businessProduct.findUnique.mockResolvedValue(result);

      expect(await service.findOne(id)).toEqual(result);
      expect(mockPrismaService.businessProduct.findUnique).toHaveBeenCalledWith(
        { where: { id } },
      );
    });

    it('should return null if no product found', async () => {
      const id = '1';
      mockPrismaService.businessProduct.findUnique.mockResolvedValue(null);

      expect(await service.findOne(id)).toBeNull();
      expect(mockPrismaService.businessProduct.findUnique).toHaveBeenCalledWith(
        { where: { id } },
      );
    });

    it('should throw error if find one fails', async () => {
      const id = '1';
      mockPrismaService.businessProduct.findUnique.mockRejectedValue(
        new Error('Find One failed'),
      );

      await expect(service.findOne(id)).rejects.toThrow('Find One failed');
    });
  });

  describe('Update', () => {
    it('should update a business product', async () => {
      const id = '1';
      const updateInput: Prisma.BusinessProductUpdateInput = {
        name: 'Updated Product',
      };
      const result: BusinessProduct = {
        id,
        businessId: '1',
        name: 'Updated Product',
        status: 'ACTIVE',
        createdAt: new Date(),
        updatedAt: new Date(),
        productCategoryId: '',
        description: '',
        mediaId: [],
        businessBookingId: [],
        businessDealId: [],
      };

      mockPrismaService.businessProduct.update.mockResolvedValue(result);

      expect(await service.update(id, updateInput)).toEqual(result);
      expect(mockPrismaService.businessProduct.update).toHaveBeenCalledWith({
        where: { id },
        data: updateInput,
      });
    });

    it('should throw error if update fails', async () => {
      const id = '1';
      const updateInput: Prisma.BusinessProductUpdateInput = {
        name: 'Updated Product',
      };

      mockPrismaService.businessProduct.update.mockRejectedValue(
        new Error('Update failed'),
      );

      await expect(service.update(id, updateInput)).rejects.toThrow(
        'Update failed',
      );
    });
  });

  describe('Delete', () => {
    it('should delete a business product', async () => {
      const id = '1';
      const result: BusinessProduct = {
        id,
        businessId: '1',
        name: 'Product 1',
        status: 'ACTIVE',
        createdAt: new Date(),
        updatedAt: new Date(),
        productCategoryId: '',
        description: '',
        mediaId: [],
        businessBookingId: [],
        businessDealId: [],
      };

      mockPrismaService.businessProduct.delete.mockResolvedValue(result);

      expect(await service.delete(id)).toEqual(result);
      expect(mockPrismaService.businessProduct.delete).toHaveBeenCalledWith({
        where: { id },
      });
    });

    it('should throw error if delete fails', async () => {
      const id = '1';

      mockPrismaService.businessProduct.delete.mockRejectedValue(
        new Error('Delete failed'),
      );

      await expect(service.delete(id)).rejects.toThrow('Delete failed');
    });
  });

  describe('Get Business', () => {
    it('should return a business by id', async () => {
      const businessId = '1';
      const result = { id: '1', name: 'Business 1' };

      mockPrismaService.business.findUnique.mockResolvedValue(result);

      expect(await service.getBusiness(businessId)).toEqual(result);
      expect(mockPrismaService.business.findUnique).toHaveBeenCalledWith({
        where: { id: businessId },
      });
    });

    it('should return null if business not found', async () => {
      const businessId = '1';

      mockPrismaService.business.findUnique.mockResolvedValue(null);

      expect(await service.getBusiness(businessId)).toBeNull();
      expect(mockPrismaService.business.findUnique).toHaveBeenCalledWith({
        where: { id: businessId },
      });
    });
  });

  describe('Get Product Category', () => {
    it('should return a product category by id', async () => {
      const categoryId = '1';
      const result = { id: '1', name: 'Category 1' };

      mockPrismaService.productCategory.findUnique.mockResolvedValue(result);

      expect(await service.getProductCategory(categoryId)).toEqual(result);
      expect(mockPrismaService.productCategory.findUnique).toHaveBeenCalledWith(
        { where: { id: categoryId } },
      );
    });

    it('should return null if product category not found', async () => {
      const categoryId = '1';

      mockPrismaService.productCategory.findUnique.mockResolvedValue(null);

      expect(await service.getProductCategory(categoryId)).toBeNull();
      expect(mockPrismaService.productCategory.findUnique).toHaveBeenCalledWith(
        { where: { id: categoryId } },
      );
    });
  });

  describe('Get Business Deal', () => {
    it('should return a business deal by ids', async () => {
      const dealIds = ['1'];
      const result = [{ id: '1', name: 'Deal 1' }];

      mockPrismaService.businessDeal.findMany.mockResolvedValue(result);

      expect(await service.getBusinessDeal(dealIds)).toEqual(result);
      expect(mockPrismaService.businessDeal.findMany).toHaveBeenCalledWith({
        where: { id: { in: dealIds } },
      });
    });

    it('should return null if no deals found', async () => {
      const dealIds = ['1'];

      mockPrismaService.businessDeal.findMany.mockResolvedValue([]);

      expect(await service.getBusinessDeal(dealIds)).toEqual([]);
      expect(mockPrismaService.businessDeal.findMany).toHaveBeenCalledWith({
        where: { id: { in: dealIds } },
      });
    });
  });

  describe('Get Business Product Price', () => {
    it('should return a business product price by product id', async () => {
      const productId = '1';
      const result = { id: '1', price: 100 };

      mockPrismaService.businessProductPrice.findFirst.mockResolvedValue(
        result,
      );

      expect(await service.getBusinessProductPrice(productId)).toEqual(result);
      expect(
        mockPrismaService.businessProductPrice.findFirst,
      ).toHaveBeenCalledWith({
        where: { businessProductId: productId },
      });
    });

    it('should return null if product price not found', async () => {
      const productId = '1';

      mockPrismaService.businessProductPrice.findFirst.mockResolvedValue(null);

      expect(await service.getBusinessProductPrice(productId)).toBeNull();
      expect(
        mockPrismaService.businessProductPrice.findFirst,
      ).toHaveBeenCalledWith({
        where: { businessProductId: productId },
      });
    });
  });
});
