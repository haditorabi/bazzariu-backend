import { Test, TestingModule } from '@nestjs/testing';
import { MediaService } from './media.service';
import { PrismaService } from '../prisma/prisma.service';
import { Media } from '@prisma/client';
import { PaginationArgs } from 'src/graphql/pagination-args-types';
import { Prisma } from '@prisma/client';

// Mock data for testing
const mockMedia: Media = {
  id: '1',
  createdAt: new Date(),
  url: '',
  type: 'IMAGE',
  moduleType: 'BUSINESS',
};

// Mock implementation of the PrismaService
const mockPrismaService = {
  media: {
    create: jest.fn().mockResolvedValue(mockMedia),
    findMany: jest.fn().mockResolvedValue([mockMedia]),
    findUnique: jest.fn().mockResolvedValue(mockMedia),
    update: jest.fn().mockResolvedValue(mockMedia),
    delete: jest.fn().mockResolvedValue(mockMedia),
  },
};

describe('MediaService', () => {
  let service: MediaService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MediaService,
        {
          provide: PrismaService,
          useValue: mockPrismaService, // Inject the mocked PrismaService
        },
      ],
    }).compile();

    service = module.get<MediaService>(MediaService);
    prisma = module.get<PrismaService>(PrismaService);
  });
  describe('create', () => {
    it('should create and return a media', async () => {
      const input: Prisma.MediaCreateInput = {
        ...mockMedia,
      };

      const result = await service.create(input);
      expect(prisma.media.create).toHaveBeenCalledWith({
        data: input,
      });
      expect(result).toEqual(mockMedia);
    });
  });

  describe('findAll', () => {
    it('should return an array of medias', async () => {
      const paginationArgs: PaginationArgs = {
        skip: 0,
        take: 10,
        limit: 10,
        page: 1,
      };

      // Call the service method
      const result = await service.findAll(paginationArgs);

      // Expect the prisma method to have been called
      expect(prisma.media.findMany).toHaveBeenCalledWith({
        skip: paginationArgs.skip,
        take: paginationArgs.take,
      });
      expect(result).toEqual([mockMedia]);
    });
  });

  describe('findOne', () => {
    it('should return a single media by ID', async () => {
      const id = '1';

      // Call the service method
      const result = await service.findOne(id);

      // Expect the prisma method to have been called
      expect(prisma.media.findUnique).toHaveBeenCalledWith({
        where: { id },
      });
      expect(result).toEqual(mockMedia);
    });
  });

  describe('update', () => {
    it('should update and return the modified media', async () => {
      const id = '1';
      const updateData: Prisma.MediaUpdateInput = { url: 'Updated' };

      // Call the service method
      const result = await service.update(id, updateData);

      // Expect the prisma method to have been called with correct arguments
      expect(prisma.media.update).toHaveBeenCalledWith({
        where: { id },
        data: updateData,
      });
      expect(result).toEqual(mockMedia);
    });
  });

  describe('delete', () => {
    it('should delete a media and return it', async () => {
      const id = '1';

      // Call the service method
      const result = await service.delete(id);

      // Expect the prisma method to have been called
      expect(prisma.media.delete).toHaveBeenCalledWith({
        where: { id },
      });
      expect(result).toEqual(mockMedia);
    });
  });
});
