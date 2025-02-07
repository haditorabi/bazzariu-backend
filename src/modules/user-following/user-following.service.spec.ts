import { Test, TestingModule } from '@nestjs/testing';
import { UserFollowingService } from './user-following.service';
import { PrismaService } from '../prisma/prisma.service';
import { UserFollowing } from '@prisma/client';
import { PaginationArgs } from 'src/graphql/pagination-args-types';
import { Prisma } from '@prisma/client';

// Mock data for testing
const mockUserFollowing: UserFollowing = {
  id: '1',
  createdAt: new Date(),
  followerId: 'followerId',
  followeeId: 'followeeId',
};

// Mock implementation of the PrismaService
const mockPrismaService = {
  userFollowing: {
    create: jest.fn().mockResolvedValue(mockUserFollowing),
    findMany: jest.fn().mockResolvedValue([mockUserFollowing]),
    findUnique: jest.fn().mockResolvedValue(mockUserFollowing),
    update: jest.fn().mockResolvedValue(mockUserFollowing),
    delete: jest.fn().mockResolvedValue(mockUserFollowing),
  },
};

describe('UserFollowingService', () => {
  let service: UserFollowingService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserFollowingService,
        {
          provide: PrismaService,
          useValue: mockPrismaService, // Inject the mocked PrismaService
        },
      ],
    }).compile();

    service = module.get<UserFollowingService>(UserFollowingService);
    prisma = module.get<PrismaService>(PrismaService);
  });
  describe('create', () => {
    it('should create and return a user-following', async () => {
      const input: Prisma.UserFollowingCreateInput = {
        ...mockUserFollowing,
        follower: {
          connect: {
            id: '1',
          },
        },
        followee: {
          connect: {
            id: '1',
          },
        },
      };

      const result = await service.create(input);
      expect(prisma.userFollowing.create).toHaveBeenCalledWith({
        data: input,
      });
      expect(result).toEqual(mockUserFollowing);
    });
  });

  describe('findAll', () => {
    it('should return an array of user-followings', async () => {
      const paginationArgs: PaginationArgs = {
        skip: 0,
        take: 10,
        limit: 10,
        page: 1,
      };

      // Call the service method
      const result = await service.findAll(paginationArgs);

      // Expect the prisma method to have been called
      expect(prisma.userFollowing.findMany).toHaveBeenCalledWith({
        skip: paginationArgs.skip,
        take: paginationArgs.take,
      });
      expect(result).toEqual([mockUserFollowing]);
    });
  });

  describe('findOne', () => {
    it('should return a single user-following by ID', async () => {
      const id = '1';

      // Call the service method
      const result = await service.findOne(id);

      // Expect the prisma method to have been called
      expect(prisma.userFollowing.findUnique).toHaveBeenCalledWith({
        where: { id },
      });
      expect(result).toEqual(mockUserFollowing);
    });
  });

  describe('update', () => {
    it('should update and return the modified user-following', async () => {
      const id = '1';
      const updateData: Prisma.UserFollowingUpdateInput = {
        followee: {
          connect: {
            id: '1',
          },
        },
      };

      // Call the service method
      const result = await service.update(id, updateData);

      // Expect the prisma method to have been called with correct arguments
      expect(prisma.userFollowing.update).toHaveBeenCalledWith({
        where: { id },
        data: updateData,
      });
      expect(result).toEqual(mockUserFollowing);
    });
  });

  describe('delete', () => {
    it('should delete a user-following and return it', async () => {
      const id = '1';

      // Call the service method
      const result = await service.delete(id);

      // Expect the prisma method to have been called
      expect(prisma.userFollowing.delete).toHaveBeenCalledWith({
        where: { id },
      });
      expect(result).toEqual(mockUserFollowing);
    });
  });
});
