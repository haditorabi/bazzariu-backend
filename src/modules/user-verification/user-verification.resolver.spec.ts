import { Test, TestingModule } from '@nestjs/testing';
import { UserVerificationResolver } from './user-verification.resolver';
import { UserVerificationService } from './user-verification.service';
import {
  UserVerification,
  CreateUserVerificationInput,
  UpdateUserVerificationInput,
} from './user-verification.graphql';
import { PaginationArgs } from 'src/graphql/pagination-args-types';
import { UserVerificationStatus } from '@prisma/client';

// Mock data for testing
const mockUserVerification: UserVerification = {
  id: '1',
  createdAt: new Date(),
  userId: '1',
  type: 'EMAIL',
  status: UserVerificationStatus.APPROVED,
  updatedAt: new Date(),
};

// Mock implementation of the UserVerificationService
const mockUserVerificationService = {
  create: jest.fn().mockResolvedValue(mockUserVerification),
  findAll: jest.fn().mockResolvedValue([mockUserVerification]),
  findOne: jest.fn().mockResolvedValue(mockUserVerification),
  update: jest.fn().mockResolvedValue(mockUserVerification),
  delete: jest.fn().mockResolvedValue(mockUserVerification),
};

describe('UserVerificationResolver', () => {
  let resolver: UserVerificationResolver;
  let service: UserVerificationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserVerificationResolver,
        {
          provide: UserVerificationService,
          useValue: mockUserVerificationService, // Inject the mocked service
        },
      ],
    }).compile();

    resolver = module.get<UserVerificationResolver>(UserVerificationResolver);
    service = module.get<UserVerificationService>(UserVerificationService);
  });
  describe('createUserVerification', () => {
    it('should create and return a user-verifications', async () => {
      const input: CreateUserVerificationInput = {
        ...mockUserVerification,
      };

      const result = await resolver.createUserVerification(input);
      // expect(service.create).toHaveBeenCalledWith(input);
      expect(result).toEqual(mockUserVerification);
    });
  });

  describe('userVerifications (findAll)', () => {
    it('should return an array of user-verifications', async () => {
      const paginationArgs: PaginationArgs = {
        skip: 0,
        take: 10,
        limit: 10,
        page: 1,
      };

      // Call the resolver method
      const result = await resolver.userVerifications(paginationArgs);

      // Expect the service method to have been called
      expect(service.findAll).toHaveBeenCalledWith(paginationArgs);
      expect(result).toEqual([mockUserVerification]);
    });
  });

  describe('userVerification (findOne)', () => {
    it('should return a single user-verification by ID', async () => {
      const id = '1';

      // Call the resolver method
      const result = await resolver.userVerification(id);

      // Expect the service method to have been called
      expect(service.findOne).toHaveBeenCalledWith(id);
      expect(result).toEqual(mockUserVerification);
    });
  });

  describe('updateUserVerification (update)', () => {
    it('should update and return the modified user-verification', async () => {
      const id = '1';
      const updateData = { status: UserVerificationStatus.APPROVED };
      const input: UpdateUserVerificationInput = {
        ...updateData,
      };

      // Call the resolver method
      const result = await resolver.updateUserVerification(id, input);

      // Expect the service method to have been called with correct arguments
      expect(service.update).toHaveBeenCalledWith(id, updateData);
      expect(result).toEqual(mockUserVerification);
    });
  });

  describe('deleteUserVerification (delete)', () => {
    it('should delete a user-verification and return it', async () => {
      const id = '1';

      // Call the resolver method
      const result = await resolver.deleteUserVerification(id);

      // Expect the service method to have been called
      expect(service.delete).toHaveBeenCalledWith(id);
      expect(result).toEqual(mockUserVerification);
    });
  });
});
