import { Test, TestingModule } from '@nestjs/testing';
import { UserCheckinService } from './user-checkin.service';
import { PrismaService } from '../prisma/prisma.service';
import { UserCheckin } from '@prisma/client';
import { PaginationArgs } from 'src/graphql/pagination-args-types';
import { Prisma } from '@prisma/client';

// Mock data for testing
const mockUserCheckin: UserCheckin = {
  id: '1',
  createdAt: new Date(),
  userId: '1',
  businessId: '1',
};

// Mock implementation of the PrismaService
const mockPrismaService = {
  userCheckin: {
    create: jest.fn().mockResolvedValue(mockUserCheckin),
    findMany: jest.fn().mockResolvedValue([mockUserCheckin]),
    findUnique: jest.fn().mockResolvedValue(mockUserCheckin),
    update: jest.fn().mockResolvedValue(mockUserCheckin),
    delete: jest.fn().mockResolvedValue(mockUserCheckin),
  },
};

describe('UserCheckinService', () => {
  let service: UserCheckinService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserCheckinService,
        {
          provide: PrismaService,
          useValue: mockPrismaService, // Inject the mocked PrismaService
        },
      ],
    }).compile();

    service = module.get<UserCheckinService>(UserCheckinService);
    prisma = module.get<PrismaService>(PrismaService);
  });
  describe('create', () => {
    it('should create and return a user-checkin', async () => {
      const input: Prisma.UserCheckinCreateInput = {
        ...mockUserCheckin,
        user: {
          connect: {
            id: '1',
          },
        },
        business: {
          connect: {
            id: '1',
          },
        },
      };

      const result = await service.create(input);
      expect(prisma.userCheckin.create).toHaveBeenCalledWith({
        data: input,
      });
      expect(result).toEqual(mockUserCheckin);
    });
  });

  describe('findAll', () => {
    it('should return an array of user-checkins', async () => {
      const paginationArgs: PaginationArgs = {
        skip: 0,
        take: 10,
        limit: 10,
        page: 1,
      };

      // Call the service method
      const result = await service.findAll(paginationArgs);

      // Expect the prisma method to have been called
      expect(prisma.userCheckin.findMany).toHaveBeenCalledWith({
        skip: paginationArgs.skip,
        take: paginationArgs.take,
      });
      expect(result).toEqual([mockUserCheckin]);
    });
  });

  describe('findOne', () => {
    it('should return a single user-checkin by ID', async () => {
      const id = '1';

      // Call the service method
      const result = await service.findOne(id);

      // Expect the prisma method to have been called
      expect(prisma.userCheckin.findUnique).toHaveBeenCalledWith({
        where: { id },
      });
      expect(result).toEqual(mockUserCheckin);
    });
  });

  describe('update', () => {
    it('should update and return the modified user-checkin', async () => {
      const id = '1';
      const updateData: Prisma.UserCheckinUpdateInput = {
        user: { connect: { id: '2' } },
      };

      // Call the service method
      const result = await service.update(id, updateData);

      // Expect the prisma method to have been called with correct arguments
      expect(prisma.userCheckin.update).toHaveBeenCalledWith({
        where: { id },
        data: updateData,
      });
      expect(result).toEqual(mockUserCheckin);
    });
  });

  describe('delete', () => {
    it('should delete a user-checkin and return it', async () => {
      const id = '1';

      // Call the service method
      const result = await service.delete(id);

      // Expect the prisma method to have been called
      expect(prisma.userCheckin.delete).toHaveBeenCalledWith({
        where: { id },
      });
      expect(result).toEqual(mockUserCheckin);
    });
  });
});
