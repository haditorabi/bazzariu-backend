import { Test, TestingModule } from '@nestjs/testing';
import { UserPreferenceResolver } from './user-preference.resolver';
import { UserPreferenceService } from './user-preference.service';
import {
  UserPreference,
  CreateUserPreferenceInput,
  UpdateUserPreferenceInput,
} from './user-preference.graphql';
import { PaginationArgs } from 'src/graphql/pagination-args-types';

// Mock data for testing
const mockUserPreference: UserPreference = {
  id: '1',
  updatedAt: new Date(),
  userId: '1',
  key: '1',
  value: '1',
};

// Mock implementation of the UserPreferenceService
const mockUserPreferenceService = {
  create: jest.fn().mockResolvedValue(mockUserPreference),
  findAll: jest.fn().mockResolvedValue([mockUserPreference]),
  findOne: jest.fn().mockResolvedValue(mockUserPreference),
  update: jest.fn().mockResolvedValue(mockUserPreference),
  delete: jest.fn().mockResolvedValue(mockUserPreference),
};

describe('UserPreferenceResolver', () => {
  let resolver: UserPreferenceResolver;
  let service: UserPreferenceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserPreferenceResolver,
        {
          provide: UserPreferenceService,
          useValue: mockUserPreferenceService, // Inject the mocked service
        },
      ],
    }).compile();

    resolver = module.get<UserPreferenceResolver>(UserPreferenceResolver);
    service = module.get<UserPreferenceService>(UserPreferenceService);
  });
  describe('createUserPreference', () => {
    it('should create and return a user-preferences', async () => {
      const input: CreateUserPreferenceInput = {
        ...mockUserPreference,
      };

      const result = await resolver.createUserPreference(input);
      // expect(service.create).toHaveBeenCalledWith(input);
      expect(result).toEqual(mockUserPreference);
    });
  });

  describe('userPreferences (findAll)', () => {
    it('should return an array of user-preferences', async () => {
      const paginationArgs: PaginationArgs = {
        skip: 0,
        take: 10,
        limit: 10,
        page: 1,
      };

      // Call the resolver method
      const result = await resolver.userPreferences(paginationArgs);

      // Expect the service method to have been called
      expect(service.findAll).toHaveBeenCalledWith(paginationArgs);
      expect(result).toEqual([mockUserPreference]);
    });
  });

  describe('userPreference (findOne)', () => {
    it('should return a single user-preference by ID', async () => {
      const id = '1';

      // Call the resolver method
      const result = await resolver.userPreference(id);

      // Expect the service method to have been called
      expect(service.findOne).toHaveBeenCalledWith(id);
      expect(result).toEqual(mockUserPreference);
    });
  });

  describe('updateUserPreference (update)', () => {
    it('should update and return the modified user-preference', async () => {
      const id = '1';
      const updateData = { key: 'Updated' };
      const input: UpdateUserPreferenceInput = {
        ...updateData,
      };

      // Call the resolver method
      const result = await resolver.updateUserPreference(id, input);

      // Expect the service method to have been called with correct arguments
      expect(service.update).toHaveBeenCalledWith(id, updateData);
      expect(result).toEqual(mockUserPreference);
    });
  });

  describe('deleteUserPreference (delete)', () => {
    it('should delete a user-preference and return it', async () => {
      const id = '1';

      // Call the resolver method
      const result = await resolver.deleteUserPreference(id);

      // Expect the service method to have been called
      expect(service.delete).toHaveBeenCalledWith(id);
      expect(result).toEqual(mockUserPreference);
    });
  });
});
