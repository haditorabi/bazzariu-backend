import { Test, TestingModule } from '@nestjs/testing';
import { LanguageResolver } from './language.resolver';
import { LanguageService } from './language.service';
import {
  Language,
  CreateLanguageInput,
  UpdateLanguageInput,
} from './language.graphql';
import { PaginationArgs } from 'src/graphql/pagination-args-types';
import { LanguageStatus } from '@prisma/client';

// Mock data for testing
const mockLanguage: Language = {
  id: '1',
  name: 'Sample',
  status: LanguageStatus.ACTIVE,
  code: 'FA',
};

// Mock implementation of the LanguageService
const mockLanguageService = {
  create: jest.fn().mockResolvedValue(mockLanguage),
  findAll: jest.fn().mockResolvedValue([mockLanguage]),
  findOne: jest.fn().mockResolvedValue(mockLanguage),
  update: jest.fn().mockResolvedValue(mockLanguage),
  delete: jest.fn().mockResolvedValue(mockLanguage),
};

describe('LanguageResolver', () => {
  let resolver: LanguageResolver;
  let service: LanguageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LanguageResolver,
        {
          provide: LanguageService,
          useValue: mockLanguageService, // Inject the mocked service
        },
      ],
    }).compile();

    resolver = module.get<LanguageResolver>(LanguageResolver);
    service = module.get<LanguageService>(LanguageService);
  });
  describe('createLanguage', () => {
    it('should create and return a languages', async () => {
      const input: CreateLanguageInput = {
        ...mockLanguage,
      };

      const result = await resolver.createLanguage(input);
      expect(service.create).toHaveBeenCalledWith(input);
      expect(result).toEqual(mockLanguage);
    });
  });

  describe('languages (findAll)', () => {
    it('should return an array of languages', async () => {
      const paginationArgs: PaginationArgs = {
        skip: 0,
        take: 10,
        limit: 10,
        page: 1,
      };

      // Call the resolver method
      const result = await resolver.languages(paginationArgs);

      // Expect the service method to have been called
      expect(service.findAll).toHaveBeenCalledWith(paginationArgs);
      expect(result).toEqual([mockLanguage]);
    });
  });

  describe('language (findOne)', () => {
    it('should return a single language by ID', async () => {
      const id = '1';

      // Call the resolver method
      const result = await resolver.language(id);

      // Expect the service method to have been called
      expect(service.findOne).toHaveBeenCalledWith(id);
      expect(result).toEqual(mockLanguage);
    });
  });

  describe('updateLanguage (update)', () => {
    it('should update and return the modified language', async () => {
      const id = '1';
      const updateData = { name: 'Updated' };
      const input: UpdateLanguageInput = {
        ...updateData,
      };

      // Call the resolver method
      const result = await resolver.updateLanguage(id, input);

      // Expect the service method to have been called with correct arguments
      expect(service.update).toHaveBeenCalledWith(id, updateData);
      expect(result).toEqual(mockLanguage);
    });
  });

  describe('deleteLanguage (delete)', () => {
    it('should delete a language and return it', async () => {
      const id = '1';

      // Call the resolver method
      const result = await resolver.deleteLanguage(id);

      // Expect the service method to have been called
      expect(service.delete).toHaveBeenCalledWith(id);
      expect(result).toEqual(mockLanguage);
    });
  });
});
