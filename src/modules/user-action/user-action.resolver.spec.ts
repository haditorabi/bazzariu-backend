import { Test, TestingModule } from '@nestjs/testing';
import { UserActionResolver } from './user-action.resolver';
import { UserActionService } from './user-action.service';
import {
  UserAction,
  CreateUserActionInput,
  UpdateUserActionInput,
} from './user-action.graphql';
import { PaginationArgs } from 'src/graphql/pagination-args-types';
import { UserActionType } from '@prisma/client';

// Mock data for testing
const mockUserAction: UserAction = {
  id: '1',
  createdAt: new Date(),
  userId: '1',
  action: UserActionType.CHECKIN,
  targetId: '',
  targetType: 'REVIEW',
  points: 10,
};

// Mock implementation of the UserActionService
const mockUserActionService = {
  create: jest.fn().mockResolvedValue(mockUserAction),
  findAll: jest.fn().mockResolvedValue([mockUserAction]),
  findOne: jest.fn().mockResolvedValue(mockUserAction),
  update: jest.fn().mockResolvedValue(mockUserAction),
  delete: jest.fn().mockResolvedValue(mockUserAction),
};

describe('UserActionResolver', () => {
  let resolver: UserActionResolver;
  let service: UserActionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserActionResolver,
        {
          provide: UserActionService,
          useValue: mockUserActionService, // Inject the mocked service
        },
      ],
    }).compile();

    resolver = module.get<UserActionResolver>(UserActionResolver);
    service = module.get<UserActionService>(UserActionService);
  });
  describe('createUserAction', () => {
    it('should create and return a user-actions', async () => {
      const input: CreateUserActionInput = {
        ...mockUserAction,
        userId: '1',
      };

      const result = await resolver.createUserAction(input);
      // expect(service.create).toHaveBeenCalledWith(input);
      expect(result).toEqual(mockUserAction);
    });
  });

  describe('userActions (findAll)', () => {
    it('should return an array of user-actions', async () => {
      const paginationArgs: PaginationArgs = {
        skip: 0,
        take: 10,
        limit: 10,
        page: 1,
      };

      // Call the resolver method
      const result = await resolver.userActions(paginationArgs);

      // Expect the service method to have been called
      expect(service.findAll).toHaveBeenCalledWith(paginationArgs);
      expect(result).toEqual([mockUserAction]);
    });
  });

  describe('userAction (findOne)', () => {
    it('should return a single user-action by ID', async () => {
      const id = '1';

      // Call the resolver method
      const result = await resolver.userAction(id);

      // Expect the service method to have been called
      expect(service.findOne).toHaveBeenCalledWith(id);
      expect(result).toEqual(mockUserAction);
    });
  });

  describe('updateUserAction (update)', () => {
    it('should update and return the modified user-action', async () => {
      const id = '1';
      const updateData = { action: UserActionType.CHECKIN };
      const input: UpdateUserActionInput = {
        ...updateData,
      };

      // Call the resolver method
      const result = await resolver.updateUserAction(id, input);

      // Expect the service method to have been called with correct arguments
      expect(service.update).toHaveBeenCalledWith(id, updateData);
      expect(result).toEqual(mockUserAction);
    });
  });

  describe('deleteUserAction (delete)', () => {
    it('should delete a user-action and return it', async () => {
      const id = '1';

      // Call the resolver method
      const result = await resolver.deleteUserAction(id);

      // Expect the service method to have been called
      expect(service.delete).toHaveBeenCalledWith(id);
      expect(result).toEqual(mockUserAction);
    });
  });
});
