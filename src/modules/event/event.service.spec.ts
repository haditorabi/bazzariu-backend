import { Test, TestingModule } from '@nestjs/testing';
import { EventService } from './event.service';
import { PrismaService } from '../prisma/prisma.service';
import { Event, EventStatus } from '@prisma/client';
import { PaginationArgs } from 'src/graphql/pagination-args-types';
import { Prisma } from '@prisma/client';

// Mock data for testing
const mockEvent: Event = {
  id: '1',
  name: 'Sample',
  status: EventStatus.ACTIVE,
  createdAt: new Date(),
  description: 'Test',
  startDate: new Date(),
  endDate: new Date(),
  updatedAt: new Date(),
  categoryId: ['ddd'],
  mediaId: ['ddd'],
};

// Mock implementation of the PrismaService
const mockPrismaService = {
  event: {
    create: jest.fn().mockResolvedValue(mockEvent),
    findMany: jest.fn().mockResolvedValue([mockEvent]),
    findUnique: jest.fn().mockResolvedValue(mockEvent),
    update: jest.fn().mockResolvedValue(mockEvent),
    delete: jest.fn().mockResolvedValue(mockEvent),
  },
};

describe('EventService', () => {
  let service: EventService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EventService,
        {
          provide: PrismaService,
          useValue: mockPrismaService, // Inject the mocked PrismaService
        },
      ],
    }).compile();

    service = module.get<EventService>(EventService);
    prisma = module.get<PrismaService>(PrismaService);
  });
  describe('create', () => {
    it('should create and return a event', async () => {
      const input: Prisma.EventCreateInput = {
        ...mockEvent,
      };

      const result = await service.create(input);
      expect(prisma.event.create).toHaveBeenCalledWith({
        data: input,
      });
      expect(result).toEqual(mockEvent);
    });
  });

  describe('findAll', () => {
    it('should return an array of events', async () => {
      const paginationArgs: PaginationArgs = {
        skip: 0,
        take: 10,
        limit: 10,
        page: 1,
      };

      // Call the service method
      const result = await service.findAll(paginationArgs);

      // Expect the prisma method to have been called
      expect(prisma.event.findMany).toHaveBeenCalledWith({
        skip: paginationArgs.skip,
        take: paginationArgs.take,
      });
      expect(result).toEqual([mockEvent]);
    });
  });

  describe('findOne', () => {
    it('should return a single event by ID', async () => {
      const id = '1';

      // Call the service method
      const result = await service.findOne(id);

      // Expect the prisma method to have been called
      expect(prisma.event.findUnique).toHaveBeenCalledWith({
        where: { id },
      });
      expect(result).toEqual(mockEvent);
    });
  });

  describe('update', () => {
    it('should update and return the modified event', async () => {
      const id = '1';
      const updateData: Prisma.EventUpdateInput = { name: 'Updated' };

      // Call the service method
      const result = await service.update(id, updateData);

      // Expect the prisma method to have been called with correct arguments
      expect(prisma.event.update).toHaveBeenCalledWith({
        where: { id },
        data: updateData,
      });
      expect(result).toEqual(mockEvent);
    });
  });

  describe('delete', () => {
    it('should delete a event and return it', async () => {
      const id = '1';

      // Call the service method
      const result = await service.delete(id);

      // Expect the prisma method to have been called
      expect(prisma.event.delete).toHaveBeenCalledWith({
        where: { id },
      });
      expect(result).toEqual(mockEvent);
    });
  });
});
