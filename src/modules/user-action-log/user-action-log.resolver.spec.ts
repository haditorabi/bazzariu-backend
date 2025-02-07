import { Test, TestingModule } from '@nestjs/testing';
import { UserActionLogResolver } from './user-action-log.resolver';
import { UserActionLogService } from './user-action-log.service';
import {
  UserActionLog,
  CreateUserActionLogInput,
  UpdateUserActionLogInput,
} from './user-action-log.graphql';
import { PaginationArgs } from 'src/graphql/pagination-args-types';
import { UserActionLogType, UserActionTargetType } from '@prisma/client';

// Mock data for testing
const mockUserActionLog: UserActionLog = {
  id: '1',
  createdAt: new Date(),
  userId: '1',
  action: UserActionLogType.BOOKMARK,
  targetId: '1',
  targetType: UserActionTargetType.BOOKING,
  ipAddress: '127.0.0.1',
};

// Mock implementation of the UserActionLogService
const mockUserActionLogService = {
  create: jest.fn().mockResolvedValue(mockUserActionLog),
  findAll: jest.fn().mockResolvedValue([mockUserActionLog]),
  findOne: jest.fn().mockResolvedValue(mockUserActionLog),
  update: jest.fn().mockResolvedValue(mockUserActionLog),
  delete: jest.fn().mockResolvedValue(mockUserActionLog),
};

describe('UserActionLogResolver', () => {
  let resolver: UserActionLogResolver;
  let service: UserActionLogService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserActionLogResolver,
        {
          provide: UserActionLogService,
          useValue: mockUserActionLogService, // Inject the mocked service
        },
      ],
    }).compile();

    resolver = module.get<UserActionLogResolver>(UserActionLogResolver);
    service = module.get<UserActionLogService>(UserActionLogService);
  });
  describe('createUserActionLog', () => {
    it('should create and return a user-action-logs', async () => {
      const input: CreateUserActionLogInput = {
        ...mockUserActionLog,
      };

      const result = await resolver.createUserActionLog(input);
      // expect(service.create).toHaveBeenCalledWith(input);
      expect(result).toEqual(mockUserActionLog);
    });
  });

  describe('userActionLogs (findAll)', () => {
    it('should return an array of user-action-logs', async () => {
      const paginationArgs: PaginationArgs = {
        skip: 0,
        take: 10,
        limit: 10,
        page: 1,
      };

      // Call the resolver method
      const result = await resolver.userActionLogs(paginationArgs);

      // Expect the service method to have been called
      expect(service.findAll).toHaveBeenCalledWith(paginationArgs);
      expect(result).toEqual([mockUserActionLog]);
    });
  });

  describe('userActionLog (findOne)', () => {
    it('should return a single user-action-log by ID', async () => {
      const id = '1';

      // Call the resolver method
      const result = await resolver.userActionLog(id);

      // Expect the service method to have been called
      expect(service.findOne).toHaveBeenCalledWith(id);
      expect(result).toEqual(mockUserActionLog);
    });
  });

  describe('updateUserActionLog (update)', () => {
    it('should update and return the modified user-action-log', async () => {
      const id = '1';
      const updateData = { action: UserActionLogType.DELETE };
      const input: UpdateUserActionLogInput = {
        ...updateData,
      };

      // Call the resolver method
      const result = await resolver.updateUserActionLog(id, input);

      // Expect the service method to have been called with correct arguments
      expect(service.update).toHaveBeenCalledWith(id, updateData);
      expect(result).toEqual(mockUserActionLog);
    });
  });

  describe('deleteUserActionLog (delete)', () => {
    it('should delete a user-action-log and return it', async () => {
      const id = '1';

      // Call the resolver method
      const result = await resolver.deleteUserActionLog(id);

      // Expect the service method to have been called
      expect(service.delete).toHaveBeenCalledWith(id);
      expect(result).toEqual(mockUserActionLog);
    });
  });
});
