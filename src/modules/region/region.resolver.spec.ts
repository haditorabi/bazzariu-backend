import { Test, TestingModule } from '@nestjs/testing';
import { RegionResolver } from './region.resolver';
import { RegionService } from './region.service';
import { Region, CreateRegionInput, UpdateRegionInput } from './region.graphql';
import { PaginationArgs } from 'src/graphql/pagination-args-types';
import { CountryStatus, RegionStatus } from '@prisma/client';

// Mock data for testing
const mockRegion: Region = {
  id: '1',
  name: 'Sample',
  status: RegionStatus.ACTIVE,
  countryId: '333',
  cityId: '3333',
};

// Mock implementation of the RegionService
const mockRegionService = {
  create: jest.fn().mockResolvedValue(mockRegion),
  findAll: jest.fn().mockResolvedValue([mockRegion]),
  findOne: jest.fn().mockResolvedValue(mockRegion),
  update: jest.fn().mockResolvedValue(mockRegion),
  delete: jest.fn().mockResolvedValue(mockRegion),
};

describe('RegionResolver', () => {
  let resolver: RegionResolver;
  let service: RegionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RegionResolver,
        {
          provide: RegionService,
          useValue: mockRegionService, // Inject the mocked service
        },
      ],
    }).compile();

    resolver = module.get<RegionResolver>(RegionResolver);
    service = module.get<RegionService>(RegionService);
  });
  describe('createRegion', () => {
    it('should create and return a regions', async () => {
      const input: CreateRegionInput = {
        name: mockRegion.name,
        countryId: '1',
        cityId: '1',
        status: CountryStatus.ACTIVE,
      };

      const result = await resolver.createRegion(input);
      // expect(service.create).toHaveBeenCalledWith(input);
      expect(result).toEqual(mockRegion);
    });
  });

  describe('regions (findAll)', () => {
    it('should return an array of regions', async () => {
      const paginationArgs: PaginationArgs = {
        skip: 0,
        take: 10,
        limit: 10,
        page: 1,
      };

      // Call the resolver method
      const result = await resolver.regions(paginationArgs);

      // Expect the service method to have been called
      expect(service.findAll).toHaveBeenCalledWith(paginationArgs);
      expect(result).toEqual([mockRegion]);
    });
  });

  describe('region (findOne)', () => {
    it('should return a single region by ID', async () => {
      const id = '1';

      // Call the resolver method
      const result = await resolver.region(id);

      // Expect the service method to have been called
      expect(service.findOne).toHaveBeenCalledWith(id);
      expect(result).toEqual(mockRegion);
    });
  });

  describe('updateRegion (update)', () => {
    it('should update and return the modified region', async () => {
      const id = '1';
      const updateData = { name: 'Updated' };
      const input: UpdateRegionInput = {
        ...updateData,
      };

      // Call the resolver method
      const result = await resolver.updateRegion(id, input);

      // Expect the service method to have been called with correct arguments
      expect(service.update).toHaveBeenCalledWith(id, updateData);
      expect(result).toEqual(mockRegion);
    });
  });

  describe('deleteRegion (delete)', () => {
    it('should delete a region and return it', async () => {
      const id = '1';

      // Call the resolver method
      const result = await resolver.deleteRegion(id);

      // Expect the service method to have been called
      expect(service.delete).toHaveBeenCalledWith(id);
      expect(result).toEqual(mockRegion);
    });
  });
});
