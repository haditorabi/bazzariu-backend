import { Test, TestingModule } from '@nestjs/testing';
import { UserCheckinResolver } from './user-checkin.resolver';
import { UserCheckinService } from './user-checkin.service';
import {
  UserCheckin,
  CreateUserCheckinInput,
  UpdateUserCheckinInput,
} from './user-checkin.graphql';
import { PaginationArgs } from 'src/graphql/pagination-args-types';

// Mock data for testing
const mockUserCheckin: UserCheckin = {
  id: '1',
  createdAt: new Date(),
  userId: '1',
  businessId: '1',
};

// Mock implementation of the UserCheckinService
const mockUserCheckinService = {
  create: jest.fn().mockResolvedValue(mockUserCheckin),
  findAll: jest.fn().mockResolvedValue([mockUserCheckin]),
  findOne: jest.fn().mockResolvedValue(mockUserCheckin),
  update: jest.fn().mockResolvedValue(mockUserCheckin),
  delete: jest.fn().mockResolvedValue(mockUserCheckin),
};

describe('UserCheckinResolver', () => {
  let resolver: UserCheckinResolver;
  let service: UserCheckinService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserCheckinResolver,
        {
          provide: UserCheckinService,
          useValue: mockUserCheckinService, // Inject the mocked service
        },
      ],
    }).compile();

    resolver = module.get<UserCheckinResolver>(UserCheckinResolver);
    service = module.get<UserCheckinService>(UserCheckinService);
  });
  describe('createUserCheckin', () => {
    it('should create and return a user-checkins', async () => {
      const input: CreateUserCheckinInput = {
        ...mockUserCheckin,
      };

      const result = await resolver.createUserCheckin(input);
      // expect(service.create).toHaveBeenCalledWith(input);
      expect(result).toEqual(mockUserCheckin);
    });
  });

  describe('userCheckins (findAll)', () => {
    it('should return an array of user-checkins', async () => {
      const paginationArgs: PaginationArgs = {
        skip: 0,
        take: 10,
        limit: 10,
        page: 1,
      };

      // Call the resolver method
      const result = await resolver.userCheckins(paginationArgs);

      // Expect the service method to have been called
      expect(service.findAll).toHaveBeenCalledWith(paginationArgs);
      expect(result).toEqual([mockUserCheckin]);
    });
  });

  describe('userCheckin (findOne)', () => {
    it('should return a single user-checkin by ID', async () => {
      const id = '1';

      // Call the resolver method
      const result = await resolver.userCheckin(id);

      // Expect the service method to have been called
      expect(service.findOne).toHaveBeenCalledWith(id);
      expect(result).toEqual(mockUserCheckin);
    });
  });

  describe('updateUserCheckin (update)', () => {
    it('should update and return the modified user-checkin', async () => {
      const id = '1';
      const updateData = { userId: '2' };
      const input: UpdateUserCheckinInput = {
        ...updateData,
      };

      // Call the resolver method
      const result = await resolver.updateUserCheckin(id, input);

      // Expect the service method to have been called with correct arguments
      // expect(service.update).toHaveBeenCalledWith(id, updateData);
      expect(result).toEqual(mockUserCheckin);
    });
  });

  describe('deleteUserCheckin (delete)', () => {
    it('should delete a user-checkin and return it', async () => {
      const id = '1';

      // Call the resolver method
      const result = await resolver.deleteUserCheckin(id);

      // Expect the service method to have been called
      expect(service.delete).toHaveBeenCalledWith(id);
      expect(result).toEqual(mockUserCheckin);
    });
  });
});
