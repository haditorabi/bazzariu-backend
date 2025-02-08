import { Test, TestingModule } from '@nestjs/testing';
import { ProvinceResolver } from './province.resolver';
import { ProvinceService } from './province.service';
import {
  Province,
  CreateProvinceInput,
  UpdateProvinceInput,
} from './province.graphql';
import { PaginationArgs } from 'src/graphql/pagination-args-types';
import { ProvinceStatus } from '@prisma/client';

// Mock data for testing
const mockProvince: Province = {
  id: '1',
  name: 'Sample',
  status: ProvinceStatus.ACTIVE,
};

// Mock implementation of the ProvinceService
const mockProvinceService = {
  create: jest.fn().mockResolvedValue(mockProvince),
  findAll: jest.fn().mockResolvedValue([mockProvince]),
  findOne: jest.fn().mockResolvedValue(mockProvince),
  update: jest.fn().mockResolvedValue(mockProvince),
  delete: jest.fn().mockResolvedValue(mockProvince),
};

describe('ProvinceResolver', () => {
  let resolver: ProvinceResolver;
  let service: ProvinceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProvinceResolver,
        {
          provide: ProvinceService,
          useValue: mockProvinceService, // Inject the mocked service
        },
      ],
    }).compile();

    resolver = module.get<ProvinceResolver>(ProvinceResolver);
    service = module.get<ProvinceService>(ProvinceService);
  });
  describe('createProvince', () => {
    it('should create and return a provinces', async () => {
      const input: CreateProvinceInput = {
        ...mockProvince,
        countryId: 'dddd',
      };

      const result = await resolver.createProvince(input);
      // expect(service.create).toHaveBeenCalledWith(input);
      expect(result).toEqual(mockProvince);
    });
  });

  describe('provinces (findAll)', () => {
    it('should return an array of provinces', async () => {
      const paginationArgs: PaginationArgs = {
        skip: 0,
        take: 10,
        limit: 10,
        page: 1,
      };

      // Call the resolver method
      const result = await resolver.provinces(paginationArgs);

      // Expect the service method to have been called
      expect(service.findAll).toHaveBeenCalledWith(paginationArgs);
      expect(result).toEqual([mockProvince]);
    });
  });

  describe('province (findOne)', () => {
    it('should return a single province by ID', async () => {
      const id = '1';

      // Call the resolver method
      const result = await resolver.province(id);

      // Expect the service method to have been called
      expect(service.findOne).toHaveBeenCalledWith(id);
      expect(result).toEqual(mockProvince);
    });
  });

  describe('updateProvince (update)', () => {
    it('should update and return the modified province', async () => {
      const id = '1';
      const updateData = { name: 'Updated' };
      const input: UpdateProvinceInput = {
        ...updateData,
      };

      // Call the resolver method
      const result = await resolver.updateProvince(id, input);

      // Expect the service method to have been called with correct arguments
      expect(service.update).toHaveBeenCalledWith(id, updateData);
      expect(result).toEqual(mockProvince);
    });
  });

  describe('deleteProvince (delete)', () => {
    it('should delete a province and return it', async () => {
      const id = '1';

      // Call the resolver method
      const result = await resolver.deleteProvince(id);

      // Expect the service method to have been called
      expect(service.delete).toHaveBeenCalledWith(id);
      expect(result).toEqual(mockProvince);
    });
  });
});
