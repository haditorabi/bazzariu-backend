import { Test, TestingModule } from '@nestjs/testing';
import { BusinessFollowingResolver } from './business-following.resolver';
import { BusinessFollowingService } from './business-following.service';
import {
  CreateBusinessFollowingInput,
  UpdateBusinessFollowingInput,
} from './business-following.graphql';
import { PaginationArgs } from 'src/graphql/pagination-args-types';
import { BusinessFollowing } from '@prisma/client';

describe('BusinessFollowingResolver', () => {
  let resolver: BusinessFollowingResolver;
  let service: BusinessFollowingService;

  const mockBusinessFollowing: BusinessFollowing = {
    id: '507f1f77bcf86cd799439011',
    businessId: '507f1f77bcf86cd799439012',
    userId: '507f1f77bcf86cd799439013',
    createdAt: new Date(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BusinessFollowingResolver,
        {
          provide: BusinessFollowingService,
          useValue: {
            findAll: jest.fn().mockResolvedValue([mockBusinessFollowing]),
            findOne: jest.fn().mockResolvedValue(mockBusinessFollowing),
            create: jest.fn().mockResolvedValue(mockBusinessFollowing),
            update: jest.fn().mockResolvedValue(mockBusinessFollowing),
            delete: jest.fn().mockResolvedValue(mockBusinessFollowing),
            getBusiness: jest
              .fn()
              .mockResolvedValue({ id: mockBusinessFollowing.businessId }),
            getUser: jest
              .fn()
              .mockResolvedValue({ id: mockBusinessFollowing.userId }),
          },
        },
      ],
    }).compile();

    resolver = module.get<BusinessFollowingResolver>(BusinessFollowingResolver);
    service = module.get<BusinessFollowingService>(BusinessFollowingService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('businessFollowings', () => {
    it('should return an array of business followings', async () => {
      const paginationArgs: PaginationArgs = {
        skip: 0,
        take: 10,
        limit: 10,
        page: 1,
      };
      const result = await resolver.businessFollowings(paginationArgs);
      expect(result).toEqual([mockBusinessFollowing]);
      expect(service.findAll).toHaveBeenCalledWith(paginationArgs);
    });
  });

  describe('businessFollowing', () => {
    it('should return a single business following', async () => {
      const result = await resolver.businessFollowing(mockBusinessFollowing.id);
      expect(result).toEqual(mockBusinessFollowing);
      expect(service.findOne).toHaveBeenCalledWith(mockBusinessFollowing.id);
    });
  });

  describe('createBusinessFollowing', () => {
    it('should create a new business following', async () => {
      const input: CreateBusinessFollowingInput = {
        business: mockBusinessFollowing.businessId,
        user: mockBusinessFollowing.userId,
      };
      const result = await resolver.createBusinessFollowing(input);
      expect(result).toEqual(mockBusinessFollowing);
      expect(service.create).toHaveBeenCalledWith({
        business: { connect: { id: input.business } },
        user: { connect: { id: input.user } },
      });
    });
  });

  describe('updateBusinessFollowing', () => {
    it('should update an existing business following', async () => {
      const input: UpdateBusinessFollowingInput = {
        business: mockBusinessFollowing.businessId,
        user: mockBusinessFollowing.userId,
      };
      const result = await resolver.updateBusinessFollowing(
        mockBusinessFollowing.id,
        input,
      );
      expect(result).toEqual(mockBusinessFollowing);
      expect(service.update).toHaveBeenCalledWith(mockBusinessFollowing.id, {
        business: { connect: { id: input.business } },
        user: { connect: { id: input.user } },
      });
    });
  });

  describe('deleteBusinessFollowing', () => {
    it('should delete a business following', async () => {
      const result = await resolver.deleteBusinessFollowing(
        mockBusinessFollowing.id,
      );
      expect(result).toEqual(mockBusinessFollowing);
      expect(service.delete).toHaveBeenCalledWith(mockBusinessFollowing.id);
    });
  });

  // describe('business', () => {
  //   it('should return the associated business', async () => {
  //     const result = await resolver.business(mockBusinessFollowing);
  //     expect(result).toEqual({ id: mockBusinessFollowing.businessId });
  //     expect(service.getBusiness).toHaveBeenCalledWith(
  //       mockBusinessFollowing.businessId,
  //     );
  //   });
  // });

  // describe('user', () => {
  //   it('should return the associated user', async () => {
  //     const result = await resolver.user(mockBusinessFollowing);
  //     expect(result).toEqual({ id: mockBusinessFollowing.userId });
  //     expect(service.getUser).toHaveBeenCalledWith(
  //       mockBusinessFollowing.userId,
  //     );
  //   });
  // });
});
