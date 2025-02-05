import { Test, TestingModule } from '@nestjs/testing';
import { CountryService } from './country.service';
import { PrismaService } from '../prisma/prisma.service';
import { Country, CountryStatus } from '@prisma/client';
import { PaginationArgs } from 'src/graphql/pagination-args-types';
import { Prisma } from '@prisma/client';

// Mock data for testing
const mockCountry: Country = {
  id: '1',
  name: 'Sample',
  status: CountryStatus.ACTIVE,
  code: 'AAA',
};

// Mock implementation of the PrismaService
const mockPrismaService = {
  country: {
    findMany: jest.fn().mockResolvedValue([mockCountry]),
    findUnique: jest.fn().mockResolvedValue(mockCountry),
    update: jest.fn().mockResolvedValue(mockCountry),
    delete: jest.fn().mockResolvedValue(mockCountry),
  },
};

describe('CountryService', () => {
  let service: CountryService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CountryService,
        {
          provide: PrismaService,
          useValue: mockPrismaService, // Inject the mocked PrismaService
        },
      ],
    }).compile();

    service = module.get<CountryService>(CountryService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  describe('findAll', () => {
    it('should return an array of countries', async () => {
      const paginationArgs: PaginationArgs = {
        skip: 0,
        take: 10,
        limit: 10,
        page: 1,
      };

      // Call the service method
      const result = await service.findAll(paginationArgs);

      // Expect the prisma method to have been called
      expect(prisma.country.findMany).toHaveBeenCalledWith({
        skip: paginationArgs.skip,
        take: paginationArgs.take,
      });
      expect(result).toEqual([mockCountry]);
    });
  });

  describe('findOne', () => {
    it('should return a single country by ID', async () => {
      const id = '1';

      // Call the service method
      const result = await service.findOne(id);

      // Expect the prisma method to have been called
      expect(prisma.country.findUnique).toHaveBeenCalledWith({
        where: { id },
      });
      expect(result).toEqual(mockCountry);
    });
  });

  describe('update', () => {
    it('should update and return the modified country', async () => {
      const id = '1';
      const updateData: Prisma.CountryUpdateInput = { name: 'Updated' };

      // Call the service method
      const result = await service.update(id, updateData);

      // Expect the prisma method to have been called with correct arguments
      expect(prisma.country.update).toHaveBeenCalledWith({
        where: { id },
        data: updateData,
      });
      expect(result).toEqual(mockCountry);
    });
  });

  describe('delete', () => {
    it('should delete a country and return it', async () => {
      const id = '1';

      // Call the service method
      const result = await service.delete(id);

      // Expect the prisma method to have been called
      expect(prisma.country.delete).toHaveBeenCalledWith({
        where: { id },
      });
      expect(result).toEqual(mockCountry);
    });
  });
});
