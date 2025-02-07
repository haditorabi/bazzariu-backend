import { Test, TestingModule } from '@nestjs/testing';
import { UserBookmarkResolver } from './user-bookmark.resolver';
import { UserBookmarkService } from './user-bookmark.service';
import {
  UserBookmark,
  CreateUserBookmarkInput,
  UpdateUserBookmarkInput,
} from './user-bookmark.graphql';
import { PaginationArgs } from 'src/graphql/pagination-args-types';
import { UserBookmarkType } from '@prisma/client';

// Mock data for testing
const mockUserBookmark: UserBookmark = {
  id: '1',
  createdAt: new Date(),
  userId: '1',
  targetId: '1',
  targetType: UserBookmarkType.BOOKING,
};

// Mock implementation of the UserBookmarkService
const mockUserBookmarkService = {
  create: jest.fn().mockResolvedValue(mockUserBookmark),
  findAll: jest.fn().mockResolvedValue([mockUserBookmark]),
  findOne: jest.fn().mockResolvedValue(mockUserBookmark),
  update: jest.fn().mockResolvedValue(mockUserBookmark),
  delete: jest.fn().mockResolvedValue(mockUserBookmark),
};

describe('UserBookmarkResolver', () => {
  let resolver: UserBookmarkResolver;
  let service: UserBookmarkService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserBookmarkResolver,
        {
          provide: UserBookmarkService,
          useValue: mockUserBookmarkService, // Inject the mocked service
        },
      ],
    }).compile();

    resolver = module.get<UserBookmarkResolver>(UserBookmarkResolver);
    service = module.get<UserBookmarkService>(UserBookmarkService);
  });
  describe('createUserBookmark', () => {
    it('should create and return a user-bookmarks', async () => {
      const input: CreateUserBookmarkInput = {
        ...mockUserBookmark,
      };

      const result = await resolver.createUserBookmark(input);
      // expect(service.create).toHaveBeenCalledWith(input);
      expect(result).toEqual(mockUserBookmark);
    });
  });

  describe('userBookmarks (findAll)', () => {
    it('should return an array of user-bookmarks', async () => {
      const paginationArgs: PaginationArgs = {
        skip: 0,
        take: 10,
        limit: 10,
        page: 1,
      };

      // Call the resolver method
      const result = await resolver.userBookmarks(paginationArgs);

      // Expect the service method to have been called
      expect(service.findAll).toHaveBeenCalledWith(paginationArgs);
      expect(result).toEqual([mockUserBookmark]);
    });
  });

  describe('userBookmark (findOne)', () => {
    it('should return a single user-bookmark by ID', async () => {
      const id = '1';

      // Call the resolver method
      const result = await resolver.userBookmark(id);

      // Expect the service method to have been called
      expect(service.findOne).toHaveBeenCalledWith(id);
      expect(result).toEqual(mockUserBookmark);
    });
  });

  describe('updateUserBookmark (update)', () => {
    it('should update and return the modified user-bookmark', async () => {
      const id = '1';
      const updateData = { targetType: UserBookmarkType.BOOKING };
      const input: UpdateUserBookmarkInput = {
        ...updateData,
      };

      // Call the resolver method
      const result = await resolver.updateUserBookmark(id, input);

      // Expect the service method to have been called with correct arguments
      expect(service.update).toHaveBeenCalledWith(id, updateData);
      expect(result).toEqual(mockUserBookmark);
    });
  });

  describe('deleteUserBookmark (delete)', () => {
    it('should delete a user-bookmark and return it', async () => {
      const id = '1';

      // Call the resolver method
      const result = await resolver.deleteUserBookmark(id);

      // Expect the service method to have been called
      expect(service.delete).toHaveBeenCalledWith(id);
      expect(result).toEqual(mockUserBookmark);
    });
  });
});
