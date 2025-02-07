import { Test, TestingModule } from '@nestjs/testing';
import { UserWalletService } from './user-wallet.service';
import { PrismaService } from '../prisma/prisma.service';
import { UserWallet } from '@prisma/client';
import { PaginationArgs } from 'src/graphql/pagination-args-types';
import { Prisma } from '@prisma/client';

// Mock data for testing
const mockUserWallet: UserWallet = {
  id: '1',
  createdAt: new Date(),
  userId: '1',
  balance: 10,
  currencyId: '1',
  updatedAt: new Date(),
};

// Mock implementation of the PrismaService
const mockPrismaService = {
  userWallet: {
    create: jest.fn().mockResolvedValue(mockUserWallet),
    findMany: jest.fn().mockResolvedValue([mockUserWallet]),
    findUnique: jest.fn().mockResolvedValue(mockUserWallet),
    update: jest.fn().mockResolvedValue(mockUserWallet),
    delete: jest.fn().mockResolvedValue(mockUserWallet),
  },
};

describe('UserWalletService', () => {
  let service: UserWalletService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserWalletService,
        {
          provide: PrismaService,
          useValue: mockPrismaService, // Inject the mocked PrismaService
        },
      ],
    }).compile();

    service = module.get<UserWalletService>(UserWalletService);
    prisma = module.get<PrismaService>(PrismaService);
  });
  describe('create', () => {
    it('should create and return a user-wallet', async () => {
      const input: Prisma.UserWalletCreateInput = {
        ...mockUserWallet,
        user: { connect: { id: '1' } },
      };

      const result = await service.create(input);
      expect(prisma.userWallet.create).toHaveBeenCalledWith({
        data: input,
      });
      expect(result).toEqual(mockUserWallet);
    });
  });

  describe('findAll', () => {
    it('should return an array of user-wallets', async () => {
      const paginationArgs: PaginationArgs = {
        skip: 0,
        take: 10,
        limit: 10,
        page: 1,
      };

      // Call the service method
      const result = await service.findAll(paginationArgs);

      // Expect the prisma method to have been called
      expect(prisma.userWallet.findMany).toHaveBeenCalledWith({
        skip: paginationArgs.skip,
        take: paginationArgs.take,
      });
      expect(result).toEqual([mockUserWallet]);
    });
  });

  describe('findOne', () => {
    it('should return a single user-wallet by ID', async () => {
      const id = '1';

      // Call the service method
      const result = await service.findOne(id);

      // Expect the prisma method to have been called
      expect(prisma.userWallet.findUnique).toHaveBeenCalledWith({
        where: { id },
      });
      expect(result).toEqual(mockUserWallet);
    });
  });

  describe('update', () => {
    it('should update and return the modified user-wallet', async () => {
      const id = '1';
      const updateData: Prisma.UserWalletUpdateInput = { currencyId: '2' };

      // Call the service method
      const result = await service.update(id, updateData);

      // Expect the prisma method to have been called with correct arguments
      expect(prisma.userWallet.update).toHaveBeenCalledWith({
        where: { id },
        data: updateData,
      });
      expect(result).toEqual(mockUserWallet);
    });
  });

  describe('delete', () => {
    it('should delete a user-wallet and return it', async () => {
      const id = '1';

      // Call the service method
      const result = await service.delete(id);

      // Expect the prisma method to have been called
      expect(prisma.userWallet.delete).toHaveBeenCalledWith({
        where: { id },
      });
      expect(result).toEqual(mockUserWallet);
    });
  });
});
