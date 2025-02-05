import { Test, TestingModule } from '@nestjs/testing';
import { CityResolver } from './city.resolver';
import { CityService } from './city.service';
import { City } from './city.graphql';
import { PaginationArgs } from 'src/graphql/pagination-args-types';
import { CityStatus } from '@prisma/client';

// Mock data for testing
const mockCity: City = {
  id: '1',
  name: 'test',
  provinceId: '1',
  status: CityStatus.ACTIVE,
};

// Mock implementation of the CityService
const mockCityService = {
  findAll: jest.fn().mockResolvedValue([mockCity]),
  findOne: jest.fn().mockResolvedValue(mockCity),
  update: jest.fn().mockResolvedValue(mockCity),
  delete: jest.fn().mockResolvedValue(mockCity),
};

describe('CityResolver', () => {
  let resolver: CityResolver;
  let service: CityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CityResolver,
        {
          provide: CityService,
          useValue: mockCityService, // Inject the mocked service
        },
      ],
    }).compile();

    resolver = module.get<CityResolver>(CityResolver);
    service = module.get<CityService>(CityService);
  });

  describe('citys (findAll)', () => {
    it('should return an array of business tags', async () => {
      const paginationArgs: PaginationArgs = {
        skip: 0,
        take: 10,
        limit: 10,
        page: 1,
      };

      // Call the resolver method
      const result = await resolver.cities(paginationArgs);

      // Expect the service method to have been called
      expect(service.findAll).toHaveBeenCalledWith(paginationArgs);
      expect(result).toEqual([mockCity]);
    });
  });

  describe('city (findOne)', () => {
    it('should return a single business tag by ID', async () => {
      const id = '1';

      // Call the resolver method
      const result = await resolver.city(id);

      // Expect the service method to have been called
      expect(service.findOne).toHaveBeenCalledWith(id);
      expect(result).toEqual(mockCity);
    });
  });

  describe('updateCity (update)', () => {
    it('should update and return the modified business tag', async () => {
      const id = '1';
      const updateData = { name: 'Updated Tag' };

      // Call the resolver method
      const result = await resolver.updateCity(id, updateData);

      // Expect the service method to have been called with correct arguments
      expect(service.update).toHaveBeenCalledWith(id, updateData);
      expect(result).toEqual(mockCity);
    });
  });

  describe('deleteCity (delete)', () => {
    it('should delete a business tag and return it', async () => {
      const id = '1';

      // Call the resolver method
      const result = await resolver.deleteCity(id);

      // Expect the service method to have been called
      expect(service.delete).toHaveBeenCalledWith(id);
      expect(result).toEqual(mockCity);
    });
  });
});
