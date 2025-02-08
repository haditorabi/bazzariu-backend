import { Test, TestingModule } from '@nestjs/testing';
import { UserBlockedResolver } from './user-blocked.resolver';
import { UserBlockedService } from './user-blocked.service';
import {
  UserBlocked,
  CreateUserBlockedInput,
  UpdateUserBlockedInput,
} from './user-blocked.graphql';
import { PaginationArgs } from 'src/graphql/pagination-args-types';

// Mock data for testing
const mockUserBlocked: UserBlocked = {
  id: '1',
  createdAt: new Date(),
  userId: '1',
  blockedId: '1',
};

// Mock implementation of the UserBlockedService
const mockUserBlockedService = {
  create: jest.fn().mockResolvedValue(mockUserBlocked),
  findAll: jest.fn().mockResolvedValue([mockUserBlocked]),
  findOne: jest.fn().mockResolvedValue(mockUserBlocked),
  update: jest.fn().mockResolvedValue(mockUserBlocked),
  delete: jest.fn().mockResolvedValue(mockUserBlocked),
};

describe('UserBlockedResolver', () => {
  let resolver: UserBlockedResolver;
  let service: UserBlockedService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserBlockedResolver,
        {
          provide: UserBlockedService,
          useValue: mockUserBlockedService, // Inject the mocked service
        },
      ],
    }).compile();

    resolver = module.get<UserBlockedResolver>(UserBlockedResolver);
    service = module.get<UserBlockedService>(UserBlockedService);
  });
  describe('createUserBlocked', () => {
    it('should create and return a user-blockeds', async () => {
      const input: CreateUserBlockedInput = {
        ...mockUserBlocked,
        userId: '1',
        blockedId: '1',
      };

      const result = await resolver.createUserBlocked(input);
      // expect(service.create).toHaveBeenCalledWith(input);
      expect(result).toEqual(mockUserBlocked);
    });
  });

  describe('userBlockeds (findAll)', () => {
    it('should return an array of user-blockeds', async () => {
      const paginationArgs: PaginationArgs = {
        skip: 0,
        take: 10,
        limit: 10,
        page: 1,
      };

      // Call the resolver method
      const result = await resolver.userBlockes(paginationArgs);

      // Expect the service method to have been called
      expect(service.findAll).toHaveBeenCalledWith(paginationArgs);
      expect(result).toEqual([mockUserBlocked]);
    });
  });

  describe('updateUserBlocked (update)', () => {
    it('should update and return the modified user-blocked', async () => {
      const id = '1';
      const updateData = { userId: '1' };
      const input: UpdateUserBlockedInput = {
        ...updateData,
      };

      // Call the resolver method
      const result = await resolver.updateUserBlocked(id, input);

      // Expect the service method to have been called with correct arguments
      // expect(service.update).toHaveBeenCalledWith(id, updateData);
      expect(result).toEqual(mockUserBlocked);
    });
  });

  describe('deleteUserBlocked (delete)', () => {
    it('should delete a user-blocked and return it', async () => {
      const id = '1';

      // Call the resolver method
      const result = await resolver.deleteUserBlocked(id);

      // Expect the service method to have been called
      expect(service.delete).toHaveBeenCalledWith(id);
      expect(result).toEqual(mockUserBlocked);
    });
  });
});
