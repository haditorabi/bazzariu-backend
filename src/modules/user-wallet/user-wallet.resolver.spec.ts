import { Test, TestingModule } from '@nestjs/testing';
import { UserWalletResolver } from './user-wallet.resolver';
import { UserWalletService } from './user-wallet.service';
import {
  UserWallet,
  CreateUserWalletInput,
  UpdateUserWalletInput,
} from './user-wallet.graphql';
import { PaginationArgs } from 'src/graphql/pagination-args-types';

// Mock data for testing
const mockUserWallet: UserWallet = {
  id: '1',
  createdAt: new Date(),
  userId: '1',
  balance: 10,
  currencyId: '1',
  updatedAt: new Date(),
};

// Mock implementation of the UserWalletService
const mockUserWalletService = {
  create: jest.fn().mockResolvedValue(mockUserWallet),
  findAll: jest.fn().mockResolvedValue([mockUserWallet]),
  findOne: jest.fn().mockResolvedValue(mockUserWallet),
  update: jest.fn().mockResolvedValue(mockUserWallet),
  delete: jest.fn().mockResolvedValue(mockUserWallet),
};

describe('UserWalletResolver', () => {
  let resolver: UserWalletResolver;
  let service: UserWalletService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserWalletResolver,
        {
          provide: UserWalletService,
          useValue: mockUserWalletService, // Inject the mocked service
        },
      ],
    }).compile();

    resolver = module.get<UserWalletResolver>(UserWalletResolver);
    service = module.get<UserWalletService>(UserWalletService);
  });
  describe('createUserWallet', () => {
    it('should create and return a user-wallets', async () => {
      const input: CreateUserWalletInput = {
        ...mockUserWallet,
      };

      const result = await resolver.createUserWallet(input);
      // expect(service.create).toHaveBeenCalledWith(input);
      expect(result).toEqual(mockUserWallet);
    });
  });

  describe('userWallets (findAll)', () => {
    it('should return an array of user-wallets', async () => {
      const paginationArgs: PaginationArgs = {
        skip: 0,
        take: 10,
        limit: 10,
        page: 1,
      };

      // Call the resolver method
      const result = await resolver.userWallets(paginationArgs);

      // Expect the service method to have been called
      expect(service.findAll).toHaveBeenCalledWith(paginationArgs);
      expect(result).toEqual([mockUserWallet]);
    });
  });

  describe('userWallet (findOne)', () => {
    it('should return a single user-wallet by ID', async () => {
      const id = '1';

      // Call the resolver method
      const result = await resolver.userWallet(id);

      // Expect the service method to have been called
      expect(service.findOne).toHaveBeenCalledWith(id);
      expect(result).toEqual(mockUserWallet);
    });
  });

  describe('updateUserWallet (update)', () => {
    it('should update and return the modified user-wallet', async () => {
      const id = '1';
      const updateData = { balance: 20 };
      const input: UpdateUserWalletInput = {
        ...updateData,
      };

      // Call the resolver method
      const result = await resolver.updateUserWallet(id, input);

      // Expect the service method to have been called with correct arguments
      expect(service.update).toHaveBeenCalledWith(id, updateData);
      expect(result).toEqual(mockUserWallet);
    });
  });

  describe('deleteUserWallet (delete)', () => {
    it('should delete a user-wallet and return it', async () => {
      const id = '1';

      // Call the resolver method
      const result = await resolver.deleteUserWallet(id);

      // Expect the service method to have been called
      expect(service.delete).toHaveBeenCalledWith(id);
      expect(result).toEqual(mockUserWallet);
    });
  });
});
