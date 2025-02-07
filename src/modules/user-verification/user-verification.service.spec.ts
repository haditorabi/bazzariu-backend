import { Test, TestingModule } from '@nestjs/testing';
import { UserVerificationService } from './user-verification.service';
import { PrismaService } from '../prisma/prisma.service';
import { UserVerification, UserVerificationStatus } from '@prisma/client';
import { PaginationArgs } from 'src/graphql/pagination-args-types';
import { Prisma } from '@prisma/client';

// Mock data for testing
const mockUserVerification: UserVerification = {
  id: '1',
  createdAt: new Date(),
  userId: '1',
  type: 'EMAIL',
  status: UserVerificationStatus.APPROVED,
  updatedAt: new Date(),
};

// Mock implementation of the PrismaService
const mockPrismaService = {
  userVerification: {
    create: jest.fn().mockResolvedValue(mockUserVerification),
    findMany: jest.fn().mockResolvedValue([mockUserVerification]),
    findUnique: jest.fn().mockResolvedValue(mockUserVerification),
    update: jest.fn().mockResolvedValue(mockUserVerification),
    delete: jest.fn().mockResolvedValue(mockUserVerification),
  },
};

describe('UserVerificationService', () => {
  let service: UserVerificationService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserVerificationService,
        {
          provide: PrismaService,
          useValue: mockPrismaService, // Inject the mocked PrismaService
        },
      ],
    }).compile();

    service = module.get<UserVerificationService>(UserVerificationService);
    prisma = module.get<PrismaService>(PrismaService);
  });
  describe('create', () => {
    it('should create and return a user-verification', async () => {
      const input: Prisma.UserVerificationCreateInput = {
        ...mockUserVerification,
        user: { connect: { id: '1' } },
      };

      const result = await service.create(input);
      expect(prisma.userVerification.create).toHaveBeenCalledWith({
        data: input,
      });
      expect(result).toEqual(mockUserVerification);
    });
  });

  describe('findAll', () => {
    it('should return an array of user-verifications', async () => {
      const paginationArgs: PaginationArgs = {
        skip: 0,
        take: 10,
        limit: 10,
        page: 1,
      };

      // Call the service method
      const result = await service.findAll(paginationArgs);

      // Expect the prisma method to have been called
      expect(prisma.userVerification.findMany).toHaveBeenCalledWith({
        skip: paginationArgs.skip,
        take: paginationArgs.take,
      });
      expect(result).toEqual([mockUserVerification]);
    });
  });

  describe('findOne', () => {
    it('should return a single user-verification by ID', async () => {
      const id = '1';

      // Call the service method
      const result = await service.findOne(id);

      // Expect the prisma method to have been called
      expect(prisma.userVerification.findUnique).toHaveBeenCalledWith({
        where: { id },
      });
      expect(result).toEqual(mockUserVerification);
    });
  });

  describe('update', () => {
    it('should update and return the modified user-verification', async () => {
      const id = '1';
      const updateData: Prisma.UserVerificationUpdateInput = {
        status: UserVerificationStatus.APPROVED,
      };

      // Call the service method
      const result = await service.update(id, updateData);

      // Expect the prisma method to have been called with correct arguments
      expect(prisma.userVerification.update).toHaveBeenCalledWith({
        where: { id },
        data: updateData,
      });
      expect(result).toEqual(mockUserVerification);
    });
  });

  describe('delete', () => {
    it('should delete a user-verification and return it', async () => {
      const id = '1';

      // Call the service method
      const result = await service.delete(id);

      // Expect the prisma method to have been called
      expect(prisma.userVerification.delete).toHaveBeenCalledWith({
        where: { id },
      });
      expect(result).toEqual(mockUserVerification);
    });
  });
});
