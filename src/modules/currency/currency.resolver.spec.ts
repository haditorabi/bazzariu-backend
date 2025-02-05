import { Test, TestingModule } from '@nestjs/testing';
import { CurrencyResolver } from './currency.resolver';
import { CurrencyService } from './currency.service';
import { Currency } from './currency.graphql';
import { PaginationArgs } from 'src/graphql/pagination-args-types';
import { CurrencyStatus } from '@prisma/client';

// Mock data for testing
const mockCurrency: Currency = {
  id: '1',
  name: 'Sample Tag',
  status: CurrencyStatus.ACTIVE,
  code: 'GPI',
};

// Mock implementation of the CurrencyService
const mockCurrencyService = {
  findAll: jest.fn().mockResolvedValue([mockCurrency]),
  findOne: jest.fn().mockResolvedValue(mockCurrency),
  update: jest.fn().mockResolvedValue(mockCurrency),
  delete: jest.fn().mockResolvedValue(mockCurrency),
};

describe('CurrencyResolver', () => {
  let resolver: CurrencyResolver;
  let service: CurrencyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CurrencyResolver,
        {
          provide: CurrencyService,
          useValue: mockCurrencyService, // Inject the mocked service
        },
      ],
    }).compile();

    resolver = module.get<CurrencyResolver>(CurrencyResolver);
    service = module.get<CurrencyService>(CurrencyService);
  });

  describe('currencys (findAll)', () => {
    it('should return an array of currencys', async () => {
      const paginationArgs: PaginationArgs = {
        skip: 0,
        take: 10,
        limit: 10,
        page: 1,
      };

      // Call the resolver method
      const result = await resolver.currencies(paginationArgs);

      // Expect the service method to have been called
      expect(service.findAll).toHaveBeenCalledWith(paginationArgs);
      expect(result).toEqual([mockCurrency]);
    });
  });

  describe('currency (findOne)', () => {
    it('should return a single currency by ID', async () => {
      const id = '1';

      // Call the resolver method
      const result = await resolver.currency(id);

      // Expect the service method to have been called
      expect(service.findOne).toHaveBeenCalledWith(id);
      expect(result).toEqual(mockCurrency);
    });
  });

  describe('updateCurrency (update)', () => {
    it('should update and return the modified currency', async () => {
      const id = '1';
      const updateData = { name: 'Updated Tag' };

      // Call the resolver method
      const result = await resolver.updateCurrency(id, updateData);

      // Expect the service method to have been called with correct arguments
      expect(service.update).toHaveBeenCalledWith(id, updateData);
      expect(result).toEqual(mockCurrency);
    });
  });

  describe('deleteCurrency (delete)', () => {
    it('should delete a currency and return it', async () => {
      const id = '1';

      // Call the resolver method
      const result = await resolver.deleteCurrency(id);

      // Expect the service method to have been called
      expect(service.delete).toHaveBeenCalledWith(id);
      expect(result).toEqual(mockCurrency);
    });
  });
});
