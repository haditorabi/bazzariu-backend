import { Test, TestingModule } from '@nestjs/testing';
import { UserBlockedService } from './user-blocked.service';
import { PrismaService } from '../prisma/prisma.service';
import { UserBlocked } from '@prisma/client';
import { PaginationArgs } from 'src/graphql/pagination-args-types';
import { Prisma } from '@prisma/client';

// Mock data for testing
const mockUserBlocked: UserBlocked = {
  id: '1',
  createdAt: new Date(),
  userId: '1',
  blockedId: '1',
};

// Mock implementation of the PrismaService
const mockPrismaService = {
  userBlocked: {
    create: jest.fn().mockResolvedValue(mockUserBlocked),
    findMany: jest.fn().mockResolvedValue([mockUserBlocked]),
    findUnique: jest.fn().mockResolvedValue(mockUserBlocked),
    update: jest.fn().mockResolvedValue(mockUserBlocked),
    delete: jest.fn().mockResolvedValue(mockUserBlocked),
  },
};

describe('UserBlockedService', () => {
  let service: UserBlockedService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserBlockedService,
        {
          provide: PrismaService,
          useValue: mockPrismaService, // Inject the mocked PrismaService
        },
      ],
    }).compile();

    service = module.get<UserBlockedService>(UserBlockedService);
    prisma = module.get<PrismaService>(PrismaService);
  });
  describe('create', () => {
    it('should create and return a user-blocked', async () => {
      const input: Prisma.UserBlockedCreateInput = {
        ...mockUserBlocked,
        user: {
          connect: {
            id: '1',
          },
        },
        blocked: {
          connect: {
            id: '1',
          },
        },
      };

      const result = await service.create(input);
      expect(prisma.userBlocked.create).toHaveBeenCalledWith({
        data: input,
      });
      expect(result).toEqual(mockUserBlocked);
    });
  });

  describe('findAll', () => {
    it('should return an array of user-blockeds', async () => {
      const paginationArgs: PaginationArgs = {
        skip: 0,
        take: 10,
        limit: 10,
        page: 1,
      };

      // Call the service method
      const result = await service.findAll(paginationArgs);

      // Expect the prisma method to have been called
      expect(prisma.userBlocked.findMany).toHaveBeenCalledWith({
        skip: paginationArgs.skip,
        take: paginationArgs.take,
      });
      expect(result).toEqual([mockUserBlocked]);
    });
  });

  describe('findOne', () => {
    it('should return a single user-blocked by ID', async () => {
      const id = '1';

      // Call the service method
      const result = await service.findOne(id);

      // Expect the prisma method to have been called
      expect(prisma.userBlocked.findUnique).toHaveBeenCalledWith({
        where: { id },
      });
      expect(result).toEqual(mockUserBlocked);
    });
  });

  describe('update', () => {
    it('should update and return the modified user-blocked', async () => {
      const id = '1';
      const updateData: Prisma.UserBlockedUpdateInput = {
        createdAt: new Date(),
      };

      // Call the service method
      const result = await service.update(id, updateData);

      // Expect the prisma method to have been called with correct arguments
      expect(prisma.userBlocked.update).toHaveBeenCalledWith({
        where: { id },
        data: updateData,
      });
      expect(result).toEqual(mockUserBlocked);
    });
  });

  describe('delete', () => {
    it('should delete a user-blocked and return it', async () => {
      const id = '1';

      // Call the service method
      const result = await service.delete(id);

      // Expect the prisma method to have been called
      expect(prisma.userBlocked.delete).toHaveBeenCalledWith({
        where: { id },
      });
      expect(result).toEqual(mockUserBlocked);
    });
  });
});
