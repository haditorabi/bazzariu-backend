import { Test, TestingModule } from '@nestjs/testing';
import { UserReviewResolver } from './user-review.resolver';
import { UserReviewService } from './user-review.service';
import {
  UserReview,
  CreateUserReviewInput,
  UpdateUserReviewInput,
} from './user-review.graphql';
import { PaginationArgs } from 'src/graphql/pagination-args-types';
import { UserReviewStatus } from '@prisma/client';

// Mock data for testing
const mockUserReview: UserReview = {
  id: '1',
  userId: '1',
  targetId: '1',
  targetType: 'BUSINESS',
  rating: 0,
  status: UserReviewStatus.APPROVED,
  createdAt: new Date(),
  updatedAt: new Date(),
};

// Mock implementation of the UserReviewService
const mockUserReviewService = {
  create: jest.fn().mockResolvedValue(mockUserReview),
  findAll: jest.fn().mockResolvedValue([mockUserReview]),
  findOne: jest.fn().mockResolvedValue(mockUserReview),
  update: jest.fn().mockResolvedValue(mockUserReview),
  delete: jest.fn().mockResolvedValue(mockUserReview),
};

describe('UserReviewResolver', () => {
  let resolver: UserReviewResolver;
  let service: UserReviewService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserReviewResolver,
        {
          provide: UserReviewService,
          useValue: mockUserReviewService, // Inject the mocked service
        },
      ],
    }).compile();

    resolver = module.get<UserReviewResolver>(UserReviewResolver);
    service = module.get<UserReviewService>(UserReviewService);
  });
  describe('createUserReview', () => {
    it('should create and return a user-reviews', async () => {
      const input: CreateUserReviewInput = {
        ...mockUserReview,
      };

      const result = await resolver.createUserReview(input);
      // expect(service.create).toHaveBeenCalledWith(input);
      expect(result).toEqual(mockUserReview);
    });
  });

  describe('userReviews (findAll)', () => {
    it('should return an array of user-reviews', async () => {
      const paginationArgs: PaginationArgs = {
        skip: 0,
        take: 10,
        limit: 10,
        page: 1,
      };

      // Call the resolver method
      const result = await resolver.userReviews(paginationArgs);

      // Expect the service method to have been called
      expect(service.findAll).toHaveBeenCalledWith(paginationArgs);
      expect(result).toEqual([mockUserReview]);
    });
  });

  describe('userReview (findOne)', () => {
    it('should return a single user-review by ID', async () => {
      const id = '1';

      // Call the resolver method
      const result = await resolver.userReview(id);

      // Expect the service method to have been called
      expect(service.findOne).toHaveBeenCalledWith(id);
      expect(result).toEqual(mockUserReview);
    });
  });

  describe('updateUserReview (update)', () => {
    it('should update and return the modified user-review', async () => {
      const id = '1';
      const updateData = { content: 'Updated' };
      const input: UpdateUserReviewInput = {
        ...updateData,
      };

      // Call the resolver method
      const result = await resolver.updateUserReview(id, input);

      // Expect the service method to have been called with correct arguments
      expect(service.update).toHaveBeenCalledWith(id, updateData);
      expect(result).toEqual(mockUserReview);
    });
  });

  describe('deleteUserReview (delete)', () => {
    it('should delete a user-review and return it', async () => {
      const id = '1';

      // Call the resolver method
      const result = await resolver.deleteUserReview(id);

      // Expect the service method to have been called
      expect(service.delete).toHaveBeenCalledWith(id);
      expect(result).toEqual(mockUserReview);
    });
  });
});
