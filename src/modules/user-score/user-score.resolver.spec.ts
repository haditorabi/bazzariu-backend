import { Test, TestingModule } from '@nestjs/testing';
import { UserScoreResolver } from './user-score.resolver';
import { UserScoreService } from './user-score.service';
import {
  UserScore,
  CreateUserScoreInput,
  UpdateUserScoreInput,
} from './user-score.graphql';
import { PaginationArgs } from 'src/graphql/pagination-args-types';

// Mock data for testing
const mockUserScore: UserScore = {
  id: '1',
  createdAt: new Date(),
  userId: '1',
  score: 1,
};

// Mock implementation of the UserScoreService
const mockUserScoreService = {
  create: jest.fn().mockResolvedValue(mockUserScore),
  findAll: jest.fn().mockResolvedValue([mockUserScore]),
  findOne: jest.fn().mockResolvedValue(mockUserScore),
  update: jest.fn().mockResolvedValue(mockUserScore),
  delete: jest.fn().mockResolvedValue(mockUserScore),
};

describe('UserScoreResolver', () => {
  let resolver: UserScoreResolver;
  let service: UserScoreService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserScoreResolver,
        {
          provide: UserScoreService,
          useValue: mockUserScoreService, // Inject the mocked service
        },
      ],
    }).compile();

    resolver = module.get<UserScoreResolver>(UserScoreResolver);
    service = module.get<UserScoreService>(UserScoreService);
  });
  describe('createUserScore', () => {
    it('should create and return a user-scores', async () => {
      const input: CreateUserScoreInput = {
        ...mockUserScore,
        userId: '1',
      };

      const result = await resolver.createUserScore(input);
      // expect(service.create).toHaveBeenCalledWith(input);
      expect(result).toEqual(mockUserScore);
    });
  });

  describe('userScores (findAll)', () => {
    it('should return an array of user-scores', async () => {
      const paginationArgs: PaginationArgs = {
        skip: 0,
        take: 10,
        limit: 10,
        page: 1,
      };

      // Call the resolver method
      const result = await resolver.userScores(paginationArgs);

      // Expect the service method to have been called
      expect(service.findAll).toHaveBeenCalledWith(paginationArgs);
      expect(result).toEqual([mockUserScore]);
    });
  });

  describe('userScore (findOne)', () => {
    it('should return a single user-score by ID', async () => {
      const id = '1';

      // Call the resolver method
      const result = await resolver.userScore(id);

      // Expect the service method to have been called
      expect(service.findOne).toHaveBeenCalledWith(id);
      expect(result).toEqual(mockUserScore);
    });
  });

  describe('updateUserScore (update)', () => {
    it('should update and return the modified user-score', async () => {
      const id = '1';
      const updateData = { score: 2 };
      const input: UpdateUserScoreInput = {
        ...updateData,
      };

      // Call the resolver method
      const result = await resolver.updateUserScore(id, input);

      // Expect the service method to have been called with correct arguments
      expect(service.update).toHaveBeenCalledWith(id, updateData);
      expect(result).toEqual(mockUserScore);
    });
  });

  describe('deleteUserScore (delete)', () => {
    it('should delete a user-score and return it', async () => {
      const id = '1';

      // Call the resolver method
      const result = await resolver.deleteUserScore(id);

      // Expect the service method to have been called
      expect(service.delete).toHaveBeenCalledWith(id);
      expect(result).toEqual(mockUserScore);
    });
  });
});
