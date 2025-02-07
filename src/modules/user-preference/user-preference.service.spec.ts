import { Test, TestingModule } from '@nestjs/testing';
import { UserPreferenceService } from './user-preference.service';
import { PrismaService } from '../prisma/prisma.service';
import { UserPreference } from '@prisma/client';
import { PaginationArgs } from 'src/graphql/pagination-args-types';
import { Prisma } from '@prisma/client';

// Mock data for testing
const mockUserPreference: UserPreference = {
  id: '1',
  updatedAt: new Date(),
  userId: '1',
  key: '1',
  value: '1',
  createdAt: new Date(),
};

// Mock implementation of the PrismaService
const mockPrismaService = {
  userPreference: {
    create: jest.fn().mockResolvedValue(mockUserPreference),
    findMany: jest.fn().mockResolvedValue([mockUserPreference]),
    findUnique: jest.fn().mockResolvedValue(mockUserPreference),
    update: jest.fn().mockResolvedValue(mockUserPreference),
    delete: jest.fn().mockResolvedValue(mockUserPreference),
  },
};

describe('UserPreferenceService', () => {
  let service: UserPreferenceService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserPreferenceService,
        {
          provide: PrismaService,
          useValue: mockPrismaService, // Inject the mocked PrismaService
        },
      ],
    }).compile();

    service = module.get<UserPreferenceService>(UserPreferenceService);
    prisma = module.get<PrismaService>(PrismaService);
  });
  describe('create', () => {
    it('should create and return a user-preference', async () => {
      const input: Prisma.UserPreferenceCreateInput = {
        ...mockUserPreference,
        user: { connect: { id: '1' } },
      };

      const result = await service.create(input);
      expect(prisma.userPreference.create).toHaveBeenCalledWith({
        data: input,
      });
      expect(result).toEqual(mockUserPreference);
    });
  });

  describe('findAll', () => {
    it('should return an array of user-preferences', async () => {
      const paginationArgs: PaginationArgs = {
        skip: 0,
        take: 10,
        limit: 10,
        page: 1,
      };

      // Call the service method
      const result = await service.findAll(paginationArgs);

      // Expect the prisma method to have been called
      expect(prisma.userPreference.findMany).toHaveBeenCalledWith({
        skip: paginationArgs.skip,
        take: paginationArgs.take,
      });
      expect(result).toEqual([mockUserPreference]);
    });
  });

  describe('findOne', () => {
    it('should return a single user-preference by ID', async () => {
      const id = '1';

      // Call the service method
      const result = await service.findOne(id);

      // Expect the prisma method to have been called
      expect(prisma.userPreference.findUnique).toHaveBeenCalledWith({
        where: { id },
      });
      expect(result).toEqual(mockUserPreference);
    });
  });

  describe('update', () => {
    it('should update and return the modified user-preference', async () => {
      const id = '1';
      const updateData: Prisma.UserPreferenceUpdateInput = { key: 'Updated' };

      // Call the service method
      const result = await service.update(id, updateData);

      // Expect the prisma method to have been called with correct arguments
      expect(prisma.userPreference.update).toHaveBeenCalledWith({
        where: { id },
        data: updateData,
      });
      expect(result).toEqual(mockUserPreference);
    });
  });

  describe('delete', () => {
    it('should delete a user-preference and return it', async () => {
      const id = '1';

      // Call the service method
      const result = await service.delete(id);

      // Expect the prisma method to have been called
      expect(prisma.userPreference.delete).toHaveBeenCalledWith({
        where: { id },
      });
      expect(result).toEqual(mockUserPreference);
    });
  });
});
