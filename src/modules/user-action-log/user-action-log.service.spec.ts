import { Test, TestingModule } from '@nestjs/testing';
import { UserActionLogService } from './user-action-log.service';
import { PrismaService } from '../prisma/prisma.service';
import {
  UserActionLog,
  UserActionLogType,
  UserActionTargetType,
} from '@prisma/client';
import { PaginationArgs } from 'src/graphql/pagination-args-types';
import { Prisma } from '@prisma/client';

// Mock data for testing
const mockUserActionLog: UserActionLog = {
  id: '1',
  createdAt: new Date(),
  userId: '1',
  action: UserActionLogType.BOOKMARK,
  targetId: '1',
  targetType: UserActionTargetType.BOOKING,
  ipAddress: '127.0.0.1',
  actionDetails: '1',
  device: '1',
  os: 'll',
};

// Mock implementation of the PrismaService
const mockPrismaService = {
  userActionLog: {
    create: jest.fn().mockResolvedValue(mockUserActionLog),
    findMany: jest.fn().mockResolvedValue([mockUserActionLog]),
    findUnique: jest.fn().mockResolvedValue(mockUserActionLog),
    update: jest.fn().mockResolvedValue(mockUserActionLog),
    delete: jest.fn().mockResolvedValue(mockUserActionLog),
  },
};

describe('UserActionLogService', () => {
  let service: UserActionLogService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserActionLogService,
        {
          provide: PrismaService,
          useValue: mockPrismaService, // Inject the mocked PrismaService
        },
      ],
    }).compile();

    service = module.get<UserActionLogService>(UserActionLogService);
    prisma = module.get<PrismaService>(PrismaService);
  });
  describe('create', () => {
    it('should create and return a user-action-log', async () => {
      const input: Prisma.UserActionLogCreateInput = {
        ...mockUserActionLog,
        user: {
          connect: {
            id: '1',
          },
        },
      };

      const result = await service.create(input);
      expect(prisma.userActionLog.create).toHaveBeenCalledWith({
        data: input,
      });
      expect(result).toEqual(mockUserActionLog);
    });
  });

  describe('findAll', () => {
    it('should return an array of user-action-logs', async () => {
      const paginationArgs: PaginationArgs = {
        skip: 0,
        take: 10,
        limit: 10,
        page: 1,
      };

      // Call the service method
      const result = await service.findAll(paginationArgs);

      // Expect the prisma method to have been called
      expect(prisma.userActionLog.findMany).toHaveBeenCalledWith({
        skip: paginationArgs.skip,
        take: paginationArgs.take,
      });
      expect(result).toEqual([mockUserActionLog]);
    });
  });

  describe('findOne', () => {
    it('should return a single user-action-log by ID', async () => {
      const id = '1';

      // Call the service method
      const result = await service.findOne(id);

      // Expect the prisma method to have been called
      expect(prisma.userActionLog.findUnique).toHaveBeenCalledWith({
        where: { id },
      });
      expect(result).toEqual(mockUserActionLog);
    });
  });

  describe('update', () => {
    it('should update and return the modified user-action-log', async () => {
      const id = '1';
      const updateData: Prisma.UserActionLogUpdateInput = {
        targetType: UserActionTargetType.BUSINESS,
      };

      // Call the service method
      const result = await service.update(id, updateData);

      // Expect the prisma method to have been called with correct arguments
      expect(prisma.userActionLog.update).toHaveBeenCalledWith({
        where: { id },
        data: updateData,
      });
      expect(result).toEqual(mockUserActionLog);
    });
  });

  describe('delete', () => {
    it('should delete a user-action-log and return it', async () => {
      const id = '1';

      // Call the service method
      const result = await service.delete(id);

      // Expect the prisma method to have been called
      expect(prisma.userActionLog.delete).toHaveBeenCalledWith({
        where: { id },
      });
      expect(result).toEqual(mockUserActionLog);
    });
  });
});
