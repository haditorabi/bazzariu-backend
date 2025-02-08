import { Test, TestingModule } from '@nestjs/testing';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';
import { User, UpdateUserInput } from './user.graphql';
import { PaginationArgs } from 'src/graphql/pagination-args-types';

// Mock data for testing
const mockUser: User = {
  id: '1',
  name: 'Sample',
  createdAt: new Date(),
  updatedAt: new Date(),
  email: 'test@test.com',
};

// Mock implementation of the UserService
const mockUserService = {
  create: jest.fn().mockResolvedValue(mockUser),
  findAll: jest.fn().mockResolvedValue([mockUser]),
  findOne: jest.fn().mockResolvedValue(mockUser),
  update: jest.fn().mockResolvedValue(mockUser),
  delete: jest.fn().mockResolvedValue(mockUser),
};

describe('UserResolver', () => {
  let resolver: UserResolver;
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserResolver,
        {
          provide: UserService,
          useValue: mockUserService, // Inject the mocked service
        },
      ],
    }).compile();

    resolver = module.get<UserResolver>(UserResolver);
    service = module.get<UserService>(UserService);
  });

  describe('users (findAll)', () => {
    it('should return an array of users', async () => {
      const paginationArgs: PaginationArgs = {
        skip: 0,
        take: 10,
        limit: 10,
        page: 1,
      };

      // Call the resolver method
      const result = await resolver.users(paginationArgs);

      // Expect the service method to have been called
      expect(service.findAll).toHaveBeenCalledWith(paginationArgs);
      expect(result).toEqual([mockUser]);
    });
  });

  describe('user (findOne)', () => {
    it('should return a single user by ID', async () => {
      const id = '1';

      // Call the resolver method
      const result = await resolver.user(id);

      // Expect the service method to have been called
      expect(service.findOne).toHaveBeenCalledWith(id);
      expect(result).toEqual(mockUser);
    });
  });

  describe('updateUser (update)', () => {
    it('should update and return the modified user', async () => {
      const id = '1';
      const updateData = { name: 'Updated' };
      const input: UpdateUserInput = {
        ...updateData,
      };

      // Call the resolver method
      const result = await resolver.updateUser(id, input);

      // Expect the service method to have been called with correct arguments
      expect(service.update).toHaveBeenCalledWith(id, updateData);
      expect(result).toEqual(mockUser);
    });
  });

  describe('deleteUser (delete)', () => {
    it('should delete a user and return it', async () => {
      const id = '1';

      // Call the resolver method
      const result = await resolver.deleteUser(id);

      // Expect the service method to have been called
      expect(service.delete).toHaveBeenCalledWith(id);
      expect(result).toEqual(mockUser);
    });
  });
});
