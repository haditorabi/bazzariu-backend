import { Test, TestingModule } from '@nestjs/testing';
import { CountryResolver } from './country.resolver';
import { CountryService } from './country.service';
import { Country } from './country.graphql';
import { PaginationArgs } from 'src/graphql/pagination-args-types';
import { CountryStatus } from '@prisma/client';

// Mock data for testing
const mockCountry: Country = {
  id: '1',
  name: 'Sample',
  status: CountryStatus.ACTIVE,
  code: 'AAA',
};

// Mock implementation of the CountryService
const mockCountryService = {
  findAll: jest.fn().mockResolvedValue([mockCountry]),
  findOne: jest.fn().mockResolvedValue(mockCountry),
  update: jest.fn().mockResolvedValue(mockCountry),
  delete: jest.fn().mockResolvedValue(mockCountry),
};

describe('CountryResolver', () => {
  let resolver: CountryResolver;
  let service: CountryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CountryResolver,
        {
          provide: CountryService,
          useValue: mockCountryService, // Inject the mocked service
        },
      ],
    }).compile();

    resolver = module.get<CountryResolver>(CountryResolver);
    service = module.get<CountryService>(CountryService);
  });

  describe('countrys (findAll)', () => {
    it('should return an array of countrys', async () => {
      const paginationArgs: PaginationArgs = {
        skip: 0,
        take: 10,
        limit: 10,
        page: 1,
      };

      // Call the resolver method
      const result = await resolver.countries(paginationArgs);

      // Expect the service method to have been called
      expect(service.findAll).toHaveBeenCalledWith(paginationArgs);
      expect(result).toEqual([mockCountry]);
    });
  });

  describe('country (findOne)', () => {
    it('should return a single country by ID', async () => {
      const id = '1';

      // Call the resolver method
      const result = await resolver.country(id);

      // Expect the service method to have been called
      expect(service.findOne).toHaveBeenCalledWith(id);
      expect(result).toEqual(mockCountry);
    });
  });

  describe('updateCountry (update)', () => {
    it('should update and return the modified country', async () => {
      const id = '1';
      const updateData = { name: 'Updated' };

      // Call the resolver method
      const result = await resolver.updateCountry(id, updateData);

      // Expect the service method to have been called with correct arguments
      expect(service.update).toHaveBeenCalledWith(id, updateData);
      expect(result).toEqual(mockCountry);
    });
  });

  describe('deleteCountry (delete)', () => {
    it('should delete a country and return it', async () => {
      const id = '1';

      // Call the resolver method
      const result = await resolver.deleteCountry(id);

      // Expect the service method to have been called
      expect(service.delete).toHaveBeenCalledWith(id);
      expect(result).toEqual(mockCountry);
    });
  });
});
