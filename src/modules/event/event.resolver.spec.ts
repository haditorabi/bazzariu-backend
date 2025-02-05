import { Test, TestingModule } from '@nestjs/testing';
import { EventResolver } from './event.resolver';
import { EventService } from './event.service';
import { Event, CreateEventInput, UpdateEventInput } from './event.graphql';
import { PaginationArgs } from 'src/graphql/pagination-args-types';
import { EventStatus } from '@prisma/client';

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
  // categoryId: ['ddd'],
};

// Mock implementation of the EventService
const mockEventService = {
  create: jest.fn().mockResolvedValue(mockEvent),
  findAll: jest.fn().mockResolvedValue([mockEvent]),
  findOne: jest.fn().mockResolvedValue(mockEvent),
  update: jest.fn().mockResolvedValue(mockEvent),
  delete: jest.fn().mockResolvedValue(mockEvent),
};

describe('EventResolver', () => {
  let resolver: EventResolver;
  let service: EventService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EventResolver,
        {
          provide: EventService,
          useValue: mockEventService, // Inject the mocked service
        },
      ],
    }).compile();

    resolver = module.get<EventResolver>(EventResolver);
    service = module.get<EventService>(EventService);
  });
  describe('createEvent', () => {
    it('should create and return a events', async () => {
      const input: CreateEventInput = {
        ...mockEvent,
      };

      const result = await resolver.createEvent(input);
      expect(service.create).toHaveBeenCalledWith(input);
      expect(result).toEqual(mockEvent);
    });
  });

  describe('events (findAll)', () => {
    it('should return an array of events', async () => {
      const paginationArgs: PaginationArgs = {
        skip: 0,
        take: 10,
        limit: 10,
        page: 1,
      };

      // Call the resolver method
      const result = await resolver.events(paginationArgs);

      // Expect the service method to have been called
      expect(service.findAll).toHaveBeenCalledWith(paginationArgs);
      expect(result).toEqual([mockEvent]);
    });
  });

  describe('event (findOne)', () => {
    it('should return a single event by ID', async () => {
      const id = '1';

      // Call the resolver method
      const result = await resolver.event(id);

      // Expect the service method to have been called
      expect(service.findOne).toHaveBeenCalledWith(id);
      expect(result).toEqual(mockEvent);
    });
  });

  describe('updateEvent (update)', () => {
    it('should update and return the modified event', async () => {
      const id = '1';
      const updateData = { name: 'Updated' };
      const input: UpdateEventInput = {
        ...updateData,
      };

      // Call the resolver method
      const result = await resolver.updateEvent(id, input);

      // Expect the service method to have been called with correct arguments
      expect(service.update).toHaveBeenCalledWith(id, updateData);
      expect(result).toEqual(mockEvent);
    });
  });

  describe('deleteEvent (delete)', () => {
    it('should delete a event and return it', async () => {
      const id = '1';

      // Call the resolver method
      const result = await resolver.deleteEvent(id);

      // Expect the service method to have been called
      expect(service.delete).toHaveBeenCalledWith(id);
      expect(result).toEqual(mockEvent);
    });
  });
});
