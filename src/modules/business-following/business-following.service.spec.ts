import { Test, TestingModule } from '@nestjs/testing';
import { BusinessFollowingService } from './business-following.service';
import { PrismaService } from '../prisma/prisma.service';
import { mockDeep, DeepMockProxy } from 'jest-mock-extended';
import { Prisma, BusinessFollowing, Business, User } from '@prisma/client';
import { PaginationArgs } from 'src/graphql/pagination-args-types';

describe('BusinessFollowingService', () => {
  let service: BusinessFollowingService;
  let prismaMock: DeepMockProxy<PrismaService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BusinessFollowingService,
        {
          provide: PrismaService,
          useValue: mockDeep<PrismaService>(),
        },
      ],
    }).compile();

    service = module.get<BusinessFollowingService>(BusinessFollowingService);
    prismaMock = module.get(PrismaService);
  });

  describe('create', () => {
    it('should create a new business following', async () => {
      const data: Prisma.BusinessFollowingCreateInput = {
        business: { connect: { id: 'businessId' } },
        user: { connect: { id: 'userId' } },
      };

      const createdBusinessFollowing: BusinessFollowing = {
        id: 'someId',
        businessId: 'businessId',
        userId: 'userId',
        createdAt: new Date(),
      };

      prismaMock.businessFollowing.create.mockResolvedValue(
        createdBusinessFollowing,
      );

      const result = await service.create(data);
      expect(result).toEqual(createdBusinessFollowing);
    });
  });

  describe('findAll', () => {
    it('should return an array of business followings', async () => {
      const paginationArgs: PaginationArgs = {
        skip: 0,
        take: 10,
        page: 0,
        limit: 10,
      };

      const businessFollowings: BusinessFollowing[] = [
        {
          id: 'someId1',
          businessId: 'businessId1',
          userId: 'userId1',
          createdAt: new Date(),
        },
        {
          id: 'someId2',
          businessId: 'businessId2',
          userId: 'userId2',
          createdAt: new Date(),
        },
      ];

      prismaMock.businessFollowing.findMany.mockResolvedValue(
        businessFollowings,
      );

      const result = await service.findAll(paginationArgs);
      expect(result).toEqual(businessFollowings);
    });
  });

  describe('findOne', () => {
    it('should return a single business following', async () => {
      const id = 'someId';

      const businessFollowing: BusinessFollowing = {
        id: 'someId',
        businessId: 'businessId',
        userId: 'userId',
        createdAt: new Date(),
      };

      prismaMock.businessFollowing.findUnique.mockResolvedValue(
        businessFollowing,
      );

      const result = await service.findOne(id);
      expect(result).toEqual(businessFollowing);
    });

    it('should return null if business following is not found', async () => {
      const id = 'nonExistentId';

      prismaMock.businessFollowing.findUnique.mockResolvedValue(null);

      const result = await service.findOne(id);
      expect(result).toBeNull();
    });
  });

  describe('update', () => {
    it('should update a business following', async () => {
      const id = 'someId';
      const data: Prisma.BusinessFollowingUpdateInput = {
        business: { connect: { id: 'newBusinessId' } },
      };

      const updatedBusinessFollowing: BusinessFollowing = {
        id: 'someId',
        businessId: 'newBusinessId',
        userId: 'userId',
        createdAt: new Date(),
      };

      prismaMock.businessFollowing.update.mockResolvedValue(
        updatedBusinessFollowing,
      );

      const result = await service.update(id, data);
      expect(result).toEqual(updatedBusinessFollowing);
    });
  });

  describe('delete', () => {
    it('should delete a business following', async () => {
      const id = 'someId';

      const deletedBusinessFollowing: BusinessFollowing = {
        id: 'someId',
        businessId: 'businessId',
        userId: 'userId',
        createdAt: new Date(),
      };

      prismaMock.businessFollowing.delete.mockResolvedValue(
        deletedBusinessFollowing,
      );

      const result = await service.delete(id);
      expect(result).toEqual(deletedBusinessFollowing);
    });
  });

  describe('getBusiness', () => {
    it('should return the associated business', async () => {
      const businessId = 'businessId';

      const business: Business = {
        id: 'businessId',
        name: 'Business Name',
        createdAt: undefined,
        description: '',
        website: '',
        isClaimed: false,
        businessCategoryId: [],
        amenityId: [],
        languageId: [],
        regionId: '',
        claimedBy: '',
        mediaId: [],
        status: 'ACTIVE',
        updatedAt: undefined,
      };

      prismaMock.business.findUnique.mockResolvedValue(business);

      const result = await service.getBusiness(businessId);
      expect(result).toEqual(business);
    });
  });

  describe('getUser', () => {
    it('should return the associated user', async () => {
      const userId = 'userId';

      const user: User = {
        id: 'userId',
        email: 'user@example.com',
        name: '',
        createdAt: undefined,
        status: 'ACTIVE',
        updatedAt: undefined,
        password: '',
        firstName: '',
        lastName: '',
        role: 'USER',
      };

      prismaMock.user.findUnique.mockResolvedValue(user);

      const result = await service.getUser(userId);
      expect(result).toEqual(user);
    });
  });
});
