import { Test, TestingModule } from '@nestjs/testing';
import { MediaResolver } from './media.resolver';
import { MediaService } from './media.service';
import { Media, CreateMediaInput, UpdateMediaInput } from './media.graphql';
import { PaginationArgs } from 'src/graphql/pagination-args-types';

// Mock data for testing
const mockMedia: Media = {
  id: '1',
  createdAt: new Date(),
  url: '',
  type: 'IMAGE',
  moduleType: 'BUSINESS',
};

// Mock implementation of the MediaService
const mockMediaService = {
  create: jest.fn().mockResolvedValue(mockMedia),
  findAll: jest.fn().mockResolvedValue([mockMedia]),
  findOne: jest.fn().mockResolvedValue(mockMedia),
  update: jest.fn().mockResolvedValue(mockMedia),
  delete: jest.fn().mockResolvedValue(mockMedia),
};

describe('MediaResolver', () => {
  let resolver: MediaResolver;
  let service: MediaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MediaResolver,
        {
          provide: MediaService,
          useValue: mockMediaService, // Inject the mocked service
        },
      ],
    }).compile();

    resolver = module.get<MediaResolver>(MediaResolver);
    service = module.get<MediaService>(MediaService);
  });
  describe('createMedia', () => {
    it('should create and return a medias', async () => {
      const input: CreateMediaInput = {
        ...mockMedia,
      };

      const result = await resolver.createMedia(input);
      expect(service.create).toHaveBeenCalledWith(input);
      expect(result).toEqual(mockMedia);
    });
  });

  describe('medias (findAll)', () => {
    it('should return an array of medias', async () => {
      const paginationArgs: PaginationArgs = {
        skip: 0,
        take: 10,
        limit: 10,
        page: 1,
      };

      // Call the resolver method
      const result = await resolver.mediaList(paginationArgs);

      // Expect the service method to have been called
      expect(service.findAll).toHaveBeenCalledWith(paginationArgs);
      expect(result).toEqual([mockMedia]);
    });
  });

  describe('media (findOne)', () => {
    it('should return a single media by ID', async () => {
      const id = '1';

      // Call the resolver method
      const result = await resolver.media(id);

      // Expect the service method to have been called
      expect(service.findOne).toHaveBeenCalledWith(id);
      expect(result).toEqual(mockMedia);
    });
  });

  describe('updateMedia (update)', () => {
    it('should update and return the modified media', async () => {
      const id = '1';
      const updateData = { url: 'Updated' };
      const input: UpdateMediaInput = {
        ...updateData,
      };

      // Call the resolver method
      const result = await resolver.updateMedia(id, input);

      // Expect the service method to have been called with correct arguments
      expect(service.update).toHaveBeenCalledWith(id, updateData);
      expect(result).toEqual(mockMedia);
    });
  });

  describe('deleteMedia (delete)', () => {
    it('should delete a media and return it', async () => {
      const id = '1';

      // Call the resolver method
      const result = await resolver.deleteMedia(id);

      // Expect the service method to have been called
      expect(service.delete).toHaveBeenCalledWith(id);
      expect(result).toEqual(mockMedia);
    });
  });
});
