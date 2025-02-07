import { Test, TestingModule } from '@nestjs/testing';
import { UserScoreService } from './user-score.service';
import { PrismaService } from '../prisma/prisma.service';
import { UserScore } from '@prisma/client';
import { PaginationArgs } from 'src/graphql/pagination-args-types';
import { Prisma } from '@prisma/client';

// Mock data for testing
const mockUserScore: UserScore = {
  id: '1',
  createdAt: new Date(),
  userId: '1',
  score: 1,
};

// Mock implementation of the PrismaService
const mockPrismaService = {
  userScore: {
    create: jest.fn().mockResolvedValue(mockUserScore),
    findMany: jest.fn().mockResolvedValue([mockUserScore]),
    findUnique: jest.fn().mockResolvedValue(mockUserScore),
    update: jest.fn().mockResolvedValue(mockUserScore),
    delete: jest.fn().mockResolvedValue(mockUserScore),
  },
};

describe('UserScoreService', () => {
  let service: UserScoreService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserScoreService,
        {
          provide: PrismaService,
          useValue: mockPrismaService, // Inject the mocked PrismaService
        },
      ],
    }).compile();

    service = module.get<UserScoreService>(UserScoreService);
    prisma = module.get<PrismaService>(PrismaService);
  });
  describe('create', () => {
    it('should create and return a user-score', async () => {
      const input: Prisma.UserScoreCreateInput = {
        ...mockUserScore,
        user: {
          connect: {
            id: '1',
          },
        },
      };

      const result = await service.create(input);
      expect(prisma.userScore.create).toHaveBeenCalledWith({
        data: input,
      });
      expect(result).toEqual(mockUserScore);
    });
  });

  describe('findAll', () => {
    it('should return an array of user-scores', async () => {
      const paginationArgs: PaginationArgs = {
        skip: 0,
        take: 10,
        limit: 10,
        page: 1,
      };

      // Call the service method
      const result = await service.findAll(paginationArgs);

      // Expect the prisma method to have been called
      expect(prisma.userScore.findMany).toHaveBeenCalledWith({
        skip: paginationArgs.skip,
        take: paginationArgs.take,
      });
      expect(result).toEqual([mockUserScore]);
    });
  });

  describe('findOne', () => {
    it('should return a single user-score by ID', async () => {
      const id = '1';

      // Call the service method
      const result = await service.findOne(id);

      // Expect the prisma method to have been called
      expect(prisma.userScore.findUnique).toHaveBeenCalledWith({
        where: { id },
      });
      expect(result).toEqual(mockUserScore);
    });
  });

  describe('update', () => {
    it('should update and return the modified user-score', async () => {
      const id = '1';
      const updateData: Prisma.UserScoreUpdateInput = { score: 2 };

      // Call the service method
      const result = await service.update(id, updateData);

      // Expect the prisma method to have been called with correct arguments
      expect(prisma.userScore.update).toHaveBeenCalledWith({
        where: { id },
        data: updateData,
      });
      expect(result).toEqual(mockUserScore);
    });
  });

  describe('delete', () => {
    it('should delete a user-score and return it', async () => {
      const id = '1';

      // Call the service method
      const result = await service.delete(id);

      // Expect the prisma method to have been called
      expect(prisma.userScore.delete).toHaveBeenCalledWith({
        where: { id },
      });
      expect(result).toEqual(mockUserScore);
    });
  });
});
