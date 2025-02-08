import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';
import { PaginationArgs } from 'src/graphql/pagination-args-types';
import { Prisma } from '@prisma/client';

// Mock data for testing
const mockUser: User = {
  id: '1',
  name: 'Sample',
  createdAt: new Date(),
  updatedAt: new Date(),
  email: 'test@test.com',
  password: '123456',
  firstName: 'test',
  lastName: 'test',
  role: 'USER',
  status: 'ACTIVE',
};

// Mock implementation of the PrismaService
const mockPrismaService = {
  user: {
    create: jest.fn().mockResolvedValue(mockUser),
    findMany: jest.fn().mockResolvedValue([mockUser]),
    findUnique: jest.fn().mockResolvedValue(mockUser),
    update: jest.fn().mockResolvedValue(mockUser),
    delete: jest.fn().mockResolvedValue(mockUser),
  },
};

describe('UserService', () => {
  let service: UserService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: PrismaService,
          useValue: mockPrismaService, // Inject the mocked PrismaService
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    prisma = module.get<PrismaService>(PrismaService);
  });
  describe('create', () => {
    it('should create and return a user', async () => {
      const input: Prisma.UserCreateInput = {
        ...mockUser,
      };

      const result = await service.create(input);
      // expect(prisma.user.create).toHaveBeenCalledWith({
      //   data: input,
      // });
      expect(result).toEqual(mockUser);
    });
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const paginationArgs: PaginationArgs = {
        skip: 0,
        take: 10,
        limit: 10,
        page: 1,
      };

      // Call the service method
      const result = await service.findAll(paginationArgs);

      // Expect the prisma method to have been called
      expect(prisma.user.findMany).toHaveBeenCalledWith({
        skip: paginationArgs.skip,
        take: paginationArgs.take,
      });
      expect(result).toEqual([mockUser]);
    });
  });

  describe('findOne', () => {
    it('should return a single user by ID', async () => {
      const id = '1';

      // Call the service method
      const result = await service.findOne(id);

      // Expect the prisma method to have been called
      expect(prisma.user.findUnique).toHaveBeenCalledWith({
        where: { id },
      });
      expect(result).toEqual(mockUser);
    });
  });

  describe('update', () => {
    it('should update and return the modified user', async () => {
      const id = '1';
      const updateData: Prisma.UserUpdateInput = { name: 'Updated' };

      // Call the service method
      const result = await service.update(id, updateData);

      // Expect the prisma method to have been called with correct arguments
      expect(prisma.user.update).toHaveBeenCalledWith({
        where: { id },
        data: updateData,
      });
      expect(result).toEqual(mockUser);
    });
  });

  describe('delete', () => {
    it('should delete a user and return it', async () => {
      const id = '1';

      // Call the service method
      const result = await service.delete(id);

      // Expect the prisma method to have been called
      expect(prisma.user.delete).toHaveBeenCalledWith({
        where: { id },
      });
      expect(result).toEqual(mockUser);
    });
  });
});
