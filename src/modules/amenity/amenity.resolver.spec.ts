import { Test, TestingModule } from '@nestjs/testing';
import { AmenityResolver } from './amenity.resolver';
import { AmenityService } from './amenity.service';
import {
  Amenity,
  CreateAmenityInput,
  UpdateAmenityInput,
} from './amenity.graphql';
import { PrismaService } from '../prisma/prisma.service';
import { ObjectId } from 'mongodb';

// Mock data
const mockAmenity: Amenity = {
  id: new ObjectId().toHexString(),
  name: 'Pool',
  mediaId: new ObjectId().toHexString(),
  createdAt: new Date('2023-01-01T00:00:00Z'),
};
const mockAmenityArray: Amenity[] = [mockAmenity];

// Mock PrismaService
const mockPrismaService = {
  amenity: {
    findMany: jest.fn().mockResolvedValue(mockAmenityArray),
    findUnique: jest.fn().mockResolvedValue(mockAmenity),
    create: jest.fn().mockResolvedValue(mockAmenity),
    update: jest.fn().mockResolvedValue(mockAmenity),
    delete: jest.fn().mockResolvedValue(mockAmenity),
  },
};

describe('AmenityResolver', () => {
  let resolver: AmenityResolver;
  let service: AmenityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AmenityResolver,
        AmenityService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    resolver = module.get<AmenityResolver>(AmenityResolver);
    service = module.get<AmenityService>(AmenityService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('amenities', () => {
    it('should return an array of amenities', async () => {
      const result = await resolver.amenities({
        page: 1,
        limit: 10,
        skip: 1,
        take: 10,
      });
      expect(result).toEqual(mockAmenityArray);
      expect(mockPrismaService.amenity.findMany).toHaveBeenCalled();
    });
  });

  describe('amenity', () => {
    it('should return a single amenity by id', async () => {
      const result = await resolver.amenity(mockAmenity.id);
      expect(result).toEqual(mockAmenity);
      expect(mockPrismaService.amenity.findUnique).toHaveBeenCalledWith({
        where: { id: mockAmenity.id },
      });
    });
  });

  describe('createAmenity', () => {
    it('should create a new amenity', async () => {
      const input: CreateAmenityInput = {
        name: 'Gym',
        mediaId: new ObjectId().toHexString(),
      };
      const result = await resolver.createAmenity(input);
      expect(result).toEqual(mockAmenity);
      expect(mockPrismaService.amenity.create).toHaveBeenCalledWith({
        data: input,
      });
    });
  });

  describe('updateAmenity', () => {
    it('should update an existing amenity', async () => {
      const id = new ObjectId().toHexString();
      const input: UpdateAmenityInput = {
        name: 'Updated Pool',
        mediaId: new ObjectId().toHexString(),
      };
      const result = await resolver.updateAmenity(id, input);
      expect(result).toEqual(mockAmenity);
      expect(mockPrismaService.amenity.update).toHaveBeenCalledWith({
        where: { id },
        data: input,
      });
    });
  });

  describe('deleteAmenity', () => {
    it('should delete an amenity by id', async () => {
      const id = new ObjectId().toHexString();
      const result = await resolver.deleteAmenity(id);
      expect(result).toEqual(mockAmenity);
      expect(mockPrismaService.amenity.delete).toHaveBeenCalledWith({
        where: { id },
      });
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
