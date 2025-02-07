import { Test, TestingModule } from '@nestjs/testing';
import { UserBookmarkService } from './user-bookmark.service';
import { PrismaService } from '../prisma/prisma.service';
import { UserBookmark, UserBookmarkType } from '@prisma/client';
import { PaginationArgs } from 'src/graphql/pagination-args-types';
import { Prisma } from '@prisma/client';

// Mock data for testing
const mockUserBookmark: UserBookmark = {
  id: '1',
  createdAt: new Date(),
  userId: '1',
  targetId: '1',
  targetType: UserBookmarkType.BOOKING,
};

// Mock implementation of the PrismaService
const mockPrismaService = {
  userBookmark: {
    create: jest.fn().mockResolvedValue(mockUserBookmark),
    findMany: jest.fn().mockResolvedValue([mockUserBookmark]),
    findUnique: jest.fn().mockResolvedValue(mockUserBookmark),
    update: jest.fn().mockResolvedValue(mockUserBookmark),
    delete: jest.fn().mockResolvedValue(mockUserBookmark),
  },
};

describe('UserBookmarkService', () => {
  let service: UserBookmarkService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserBookmarkService,
        {
          provide: PrismaService,
          useValue: mockPrismaService, // Inject the mocked PrismaService
        },
      ],
    }).compile();

    service = module.get<UserBookmarkService>(UserBookmarkService);
    prisma = module.get<PrismaService>(PrismaService);
  });
  describe('create', () => {
    it('should create and return a user-bookmark', async () => {
      const input: Prisma.UserBookmarkCreateInput = {
        ...mockUserBookmark,
        user: { connect: { id: '1' } },
      };

      const result = await service.create(input);
      expect(prisma.userBookmark.create).toHaveBeenCalledWith({
        data: input,
      });
      expect(result).toEqual(mockUserBookmark);
    });
  });

  describe('findAll', () => {
    it('should return an array of user-bookmarks', async () => {
      const paginationArgs: PaginationArgs = {
        skip: 0,
        take: 10,
        limit: 10,
        page: 1,
      };

      // Call the service method
      const result = await service.findAll(paginationArgs);

      // Expect the prisma method to have been called
      expect(prisma.userBookmark.findMany).toHaveBeenCalledWith({
        skip: paginationArgs.skip,
        take: paginationArgs.take,
      });
      expect(result).toEqual([mockUserBookmark]);
    });
  });

  describe('findOne', () => {
    it('should return a single user-bookmark by ID', async () => {
      const id = '1';

      // Call the service method
      const result = await service.findOne(id);

      // Expect the prisma method to have been called
      expect(prisma.userBookmark.findUnique).toHaveBeenCalledWith({
        where: { id },
      });
      expect(result).toEqual(mockUserBookmark);
    });
  });

  describe('update', () => {
    it('should update and return the modified user-bookmark', async () => {
      const id = '1';
      const updateData: Prisma.UserBookmarkUpdateInput = {
        targetType: UserBookmarkType.BOOKING,
      };

      // Call the service method
      const result = await service.update(id, updateData);

      // Expect the prisma method to have been called with correct arguments
      expect(prisma.userBookmark.update).toHaveBeenCalledWith({
        where: { id },
        data: updateData,
      });
      expect(result).toEqual(mockUserBookmark);
    });
  });

  describe('delete', () => {
    it('should delete a user-bookmark and return it', async () => {
      const id = '1';

      // Call the service method
      const result = await service.delete(id);

      // Expect the prisma method to have been called
      expect(prisma.userBookmark.delete).toHaveBeenCalledWith({
        where: { id },
      });
      expect(result).toEqual(mockUserBookmark);
    });
  });
});
