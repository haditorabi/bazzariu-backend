import { Test, TestingModule } from '@nestjs/testing';
import { AmenityService } from './amenity.service';
import { PrismaService } from '../prisma/prisma.service';
import { Amenity } from './amenity.graphql';
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

describe('AmenityService', () => {
  let service: AmenityService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AmenityService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    service = module.get<AmenityService>(AmenityService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all amenities', async () => {
      const result = await service.findAll({
        page: 1,
        limit: 10,
        skip: 1,
        take: 10,
      });
      expect(result).toEqual(mockAmenityArray);
      expect(prisma.amenity.findMany).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return an amenity by id', async () => {
      const id = new ObjectId().toHexString();
      const result = await service.findOne(id);
      expect(result).toEqual(mockAmenity);
      expect(prisma.amenity.findUnique).toHaveBeenCalledWith({
        where: { id },
      });
    });

    it('should throw an error if amenity not found', async () => {
      (prisma.amenity.findUnique as jest.Mock).mockResolvedValueOnce(null);
      const id = new ObjectId().toHexString();
      await expect(service.findOne(id)).rejects.toThrow('Amenity not found');
    });
  });

  describe('create', () => {
    it('should create a new amenity', async () => {
      const data = { name: 'Gym', mediaId: new ObjectId().toHexString() };
      const result = await service.create(data);
      expect(result).toEqual(mockAmenity);
      expect(prisma.amenity.create).toHaveBeenCalledWith({ data });
    });
  });

  describe('update', () => {
    it('should update an amenity', async () => {
      const id = new ObjectId().toHexString();
      const data = {
        name: 'Updated Gym',
        mediaId: new ObjectId().toHexString(),
      };
      const result = await service.update(id, data);
      expect(result).toEqual(mockAmenity);
      expect(prisma.amenity.update).toHaveBeenCalledWith({
        where: { id },
        data,
      });
    });
  });

  describe('delete', () => {
    it('should delete an amenity by id', async () => {
      const id = new ObjectId().toHexString();
      const result = await service.delete(id);
      expect(result).toEqual(mockAmenity);
      expect(prisma.amenity.delete).toHaveBeenCalledWith({
        where: { id },
      });
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
