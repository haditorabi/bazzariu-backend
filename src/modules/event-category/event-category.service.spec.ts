import { Test, TestingModule } from '@nestjs/testing';
import { EventCategoryService } from './event-category.service';
import { PrismaService } from '../prisma/prisma.service';
import { EventCategory, EventCategoryStatus } from '@prisma/client';
import { PaginationArgs } from 'src/graphql/pagination-args-types';
import { Prisma } from '@prisma/client';

// Mock data for testing
const mockEventCategory: EventCategory = {
  id: '1',
  name: 'Sample',
  status: EventCategoryStatus.ACTIVE,
  createdAt: new Date(),
  eventId: ['ddd'],
};

// Mock implementation of the PrismaService
const mockPrismaService = {
  eventCategory: {
    create: jest.fn().mockResolvedValue(mockEventCategory),
    findMany: jest.fn().mockResolvedValue([mockEventCategory]),
    findUnique: jest.fn().mockResolvedValue(mockEventCategory),
    update: jest.fn().mockResolvedValue(mockEventCategory),
    delete: jest.fn().mockResolvedValue(mockEventCategory),
  },
};

describe('EventCategoryService', () => {
  let service: EventCategoryService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EventCategoryService,
        {
          provide: PrismaService,
          useValue: mockPrismaService, // Inject the mocked PrismaService
        },
      ],
    }).compile();

    service = module.get<EventCategoryService>(EventCategoryService);
    prisma = module.get<PrismaService>(PrismaService);
  });
  describe('create', () => {
    it('should create and return a event-category', async () => {
      const input: Prisma.EventCategoryCreateInput = {
        ...mockEventCategory,
      };

      const result = await service.create(input);
      expect(prisma.eventCategory.create).toHaveBeenCalledWith({
        data: input,
      });
      expect(result).toEqual(mockEventCategory);
    });
  });

  describe('findAll', () => {
    it('should return an array of event-categorys', async () => {
      const paginationArgs: PaginationArgs = {
        skip: 0,
        take: 10,
        limit: 10,
        page: 1,
      };

      // Call the service method
      const result = await service.findAll(paginationArgs);

      // Expect the prisma method to have been called
      expect(prisma.eventCategory.findMany).toHaveBeenCalledWith({
        skip: paginationArgs.skip,
        take: paginationArgs.take,
      });
      expect(result).toEqual([mockEventCategory]);
    });
  });

  describe('findOne', () => {
    it('should return a single event-category by ID', async () => {
      const id = '1';

      // Call the service method
      const result = await service.findOne(id);

      // Expect the prisma method to have been called
      expect(prisma.eventCategory.findUnique).toHaveBeenCalledWith({
        where: { id },
      });
      expect(result).toEqual(mockEventCategory);
    });
  });

  describe('update', () => {
    it('should update and return the modified event-category', async () => {
      const id = '1';
      const updateData: Prisma.EventCategoryUpdateInput = { name: 'Updated' };

      // Call the service method
      const result = await service.update(id, updateData);

      // Expect the prisma method to have been called with correct arguments
      expect(prisma.eventCategory.update).toHaveBeenCalledWith({
        where: { id },
        data: updateData,
      });
      expect(result).toEqual(mockEventCategory);
    });
  });

  describe('delete', () => {
    it('should delete a event-category and return it', async () => {
      const id = '1';

      // Call the service method
      const result = await service.delete(id);

      // Expect the prisma method to have been called
      expect(prisma.eventCategory.delete).toHaveBeenCalledWith({
        where: { id },
      });
      expect(result).toEqual(mockEventCategory);
    });
  });
});
