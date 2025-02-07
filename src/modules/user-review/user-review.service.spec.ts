import { Test, TestingModule } from '@nestjs/testing';
import { UserReviewService } from './user-review.service';
import { PrismaService } from '../prisma/prisma.service';
import { UserReview, UserReviewStatus } from '@prisma/client';
import { PaginationArgs } from 'src/graphql/pagination-args-types';
import { Prisma } from '@prisma/client';

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
  mediaId: ['1'],
  content: '1',
};

// Mock implementation of the PrismaService
const mockPrismaService = {
  userReview: {
    create: jest.fn().mockResolvedValue(mockUserReview),
    findMany: jest.fn().mockResolvedValue([mockUserReview]),
    findUnique: jest.fn().mockResolvedValue(mockUserReview),
    update: jest.fn().mockResolvedValue(mockUserReview),
    delete: jest.fn().mockResolvedValue(mockUserReview),
  },
};

describe('UserReviewService', () => {
  let service: UserReviewService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserReviewService,
        {
          provide: PrismaService,
          useValue: mockPrismaService, // Inject the mocked PrismaService
        },
      ],
    }).compile();

    service = module.get<UserReviewService>(UserReviewService);
    prisma = module.get<PrismaService>(PrismaService);
  });
  describe('create', () => {
    it('should create and return a user-review', async () => {
      const input: Prisma.UserReviewCreateInput = {
        ...mockUserReview,
        user: { connect: { id: '1' } },
      };

      const result = await service.create(input);
      expect(prisma.userReview.create).toHaveBeenCalledWith({
        data: input,
      });
      expect(result).toEqual(mockUserReview);
    });
  });

  describe('findAll', () => {
    it('should return an array of user-reviews', async () => {
      const paginationArgs: PaginationArgs = {
        skip: 0,
        take: 10,
        limit: 10,
        page: 1,
      };

      // Call the service method
      const result = await service.findAll(paginationArgs);

      // Expect the prisma method to have been called
      expect(prisma.userReview.findMany).toHaveBeenCalledWith({
        skip: paginationArgs.skip,
        take: paginationArgs.take,
      });
      expect(result).toEqual([mockUserReview]);
    });
  });

  describe('findOne', () => {
    it('should return a single user-review by ID', async () => {
      const id = '1';

      // Call the service method
      const result = await service.findOne(id);

      // Expect the prisma method to have been called
      expect(prisma.userReview.findUnique).toHaveBeenCalledWith({
        where: { id },
      });
      expect(result).toEqual(mockUserReview);
    });
  });

  describe('update', () => {
    it('should update and return the modified user-review', async () => {
      const id = '1';
      const updateData: Prisma.UserReviewUpdateInput = { content: 'Updated' };

      // Call the service method
      const result = await service.update(id, updateData);

      // Expect the prisma method to have been called with correct arguments
      expect(prisma.userReview.update).toHaveBeenCalledWith({
        where: { id },
        data: updateData,
      });
      expect(result).toEqual(mockUserReview);
    });
  });

  describe('delete', () => {
    it('should delete a user-review and return it', async () => {
      const id = '1';

      // Call the service method
      const result = await service.delete(id);

      // Expect the prisma method to have been called
      expect(prisma.userReview.delete).toHaveBeenCalledWith({
        where: { id },
      });
      expect(result).toEqual(mockUserReview);
    });
  });
});
