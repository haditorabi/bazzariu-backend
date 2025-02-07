import { Test, TestingModule } from '@nestjs/testing';
import { UserActionService } from './user-action.service';
import { PrismaService } from '../prisma/prisma.service';
import { UserAction, UserActionType } from '@prisma/client';
import { PaginationArgs } from 'src/graphql/pagination-args-types';
import { Prisma } from '@prisma/client';

// Mock data for testing
const mockUserAction: UserAction = {
  id: '1',
  createdAt: new Date(),
  userId: '1',
  action: UserActionType.CHECKIN,
  targetId: '',
  targetType: 'REVIEW',
  points: 10,
  actionDetails: '1',
};

// Mock implementation of the PrismaService
const mockPrismaService = {
  userAction: {
    create: jest.fn().mockResolvedValue(mockUserAction),
    findMany: jest.fn().mockResolvedValue([mockUserAction]),
    findUnique: jest.fn().mockResolvedValue(mockUserAction),
    update: jest.fn().mockResolvedValue(mockUserAction),
    delete: jest.fn().mockResolvedValue(mockUserAction),
  },
};

describe('UserActionService', () => {
  let service: UserActionService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserActionService,
        {
          provide: PrismaService,
          useValue: mockPrismaService, // Inject the mocked PrismaService
        },
      ],
    }).compile();

    service = module.get<UserActionService>(UserActionService);
    prisma = module.get<PrismaService>(PrismaService);
  });
  describe('create', () => {
    it('should create and return a user-action', async () => {
      const input: Prisma.UserActionCreateInput = {
        ...mockUserAction,
        user: { connect: { id: '1' } },
      };

      const result = await service.create(input);
      expect(prisma.userAction.create).toHaveBeenCalledWith({
        data: input,
      });
      expect(result).toEqual(mockUserAction);
    });
  });

  describe('findAll', () => {
    it('should return an array of user-actions', async () => {
      const paginationArgs: PaginationArgs = {
        skip: 0,
        take: 10,
        limit: 10,
        page: 1,
      };

      // Call the service method
      const result = await service.findAll(paginationArgs);

      // Expect the prisma method to have been called
      expect(prisma.userAction.findMany).toHaveBeenCalledWith({
        skip: paginationArgs.skip,
        take: paginationArgs.take,
      });
      expect(result).toEqual([mockUserAction]);
    });
  });

  describe('findOne', () => {
    it('should return a single user-action by ID', async () => {
      const id = '1';

      // Call the service method
      const result = await service.findOne(id);

      // Expect the prisma method to have been called
      expect(prisma.userAction.findUnique).toHaveBeenCalledWith({
        where: { id },
      });
      expect(result).toEqual(mockUserAction);
    });
  });

  describe('update', () => {
    it('should update and return the modified user-action', async () => {
      const id = '1';
      const updateData: Prisma.UserActionUpdateInput = {
        action: UserActionType.DELETE,
      };

      // Call the service method
      const result = await service.update(id, updateData);

      // Expect the prisma method to have been called with correct arguments
      expect(prisma.userAction.update).toHaveBeenCalledWith({
        where: { id },
        data: updateData,
      });
      expect(result).toEqual(mockUserAction);
    });
  });

  describe('delete', () => {
    it('should delete a user-action and return it', async () => {
      const id = '1';

      // Call the service method
      const result = await service.delete(id);

      // Expect the prisma method to have been called
      expect(prisma.userAction.delete).toHaveBeenCalledWith({
        where: { id },
      });
      expect(result).toEqual(mockUserAction);
    });
  });
});
