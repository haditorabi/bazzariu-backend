import { Test, TestingModule } from '@nestjs/testing';
import { UserFollowingResolver } from './user-following.resolver';
import { UserFollowingService } from './user-following.service';
import {
  UserFollowing,
  CreateUserFollowingInput,
  UpdateUserFollowingInput,
} from './user-following.graphql';
import { PaginationArgs } from 'src/graphql/pagination-args-types';

// Mock data for testing
const mockUserFollowing: UserFollowing = {
  id: '1',
  createdAt: new Date(),
  followerId: 'followerId',
  followeeId: 'followeeId',
};

// Mock implementation of the UserFollowingService
const mockUserFollowingService = {
  create: jest.fn().mockResolvedValue(mockUserFollowing),
  findAll: jest.fn().mockResolvedValue([mockUserFollowing]),
  findOne: jest.fn().mockResolvedValue(mockUserFollowing),
  update: jest.fn().mockResolvedValue(mockUserFollowing),
  delete: jest.fn().mockResolvedValue(mockUserFollowing),
};

describe('UserFollowingResolver', () => {
  let resolver: UserFollowingResolver;
  let service: UserFollowingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserFollowingResolver,
        {
          provide: UserFollowingService,
          useValue: mockUserFollowingService, // Inject the mocked service
        },
      ],
    }).compile();

    resolver = module.get<UserFollowingResolver>(UserFollowingResolver);
    service = module.get<UserFollowingService>(UserFollowingService);
  });
  describe('createUserFollowing', () => {
    it('should create and return a user-followings', async () => {
      const input: CreateUserFollowingInput = {
        ...mockUserFollowing,
        followeeId: '1',
        followerId: '1',
      };

      const result = await resolver.createUserFollowing(input);
      // expect(service.create).toHaveBeenCalledWith(input);
      expect(result).toEqual(mockUserFollowing);
    });
  });

  describe('userFollowings (findAll)', () => {
    it('should return an array of user-followings', async () => {
      const paginationArgs: PaginationArgs = {
        skip: 0,
        take: 10,
        limit: 10,
        page: 1,
      };

      // Call the resolver method
      const result = await resolver.userFollowings(paginationArgs);

      // Expect the service method to have been called
      expect(service.findAll).toHaveBeenCalledWith(paginationArgs);
      expect(result).toEqual([mockUserFollowing]);
    });
  });

  describe('userFollowing (findOne)', () => {
    it('should return a single user-following by ID', async () => {
      const id = '1';

      // Call the resolver method
      const result = await resolver.userFollowing(id);

      // Expect the service method to have been called
      expect(service.findOne).toHaveBeenCalledWith(id);
      expect(result).toEqual(mockUserFollowing);
    });
  });

  describe('updateUserFollowing (update)', () => {
    it('should update and return the modified user-following', async () => {
      const id = '1';
      const updateData = { followerId: '2' };
      const input: UpdateUserFollowingInput = {
        ...updateData,
      };

      // Call the resolver method
      const result = await resolver.updateUserFollowing(id, input);

      // Expect the service method to have been called with correct arguments
      // expect(service.update).toHaveBeenCalledWith(id, updateData);
      expect(result).toEqual(mockUserFollowing);
    });
  });

  describe('deleteUserFollowing (delete)', () => {
    it('should delete a user-following and return it', async () => {
      const id = '1';

      // Call the resolver method
      const result = await resolver.deleteUserFollowing(id);

      // Expect the service method to have been called
      expect(service.delete).toHaveBeenCalledWith(id);
      expect(result).toEqual(mockUserFollowing);
    });
  });
});
