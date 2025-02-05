import { Test, TestingModule } from '@nestjs/testing';
import { EventCategoryResolver } from './event-category.resolver';
import { EventCategoryService } from './event-category.service';
import {
  EventCategory,
  CreateEventCategoryInput,
  UpdateEventCategoryInput,
} from './event-category.graphql';
import { PaginationArgs } from 'src/graphql/pagination-args-types';
import { EventCategoryStatus } from '@prisma/client';

// Mock data for testing
const mockEventCategory: EventCategory = {
  id: '1',
  name: 'Sample',
  status: EventCategoryStatus.ACTIVE,
  createdAt: new Date(),
};

// Mock implementation of the EventCategoryService
const mockEventCategoryService = {
  create: jest.fn().mockResolvedValue(mockEventCategory),
  findAll: jest.fn().mockResolvedValue([mockEventCategory]),
  findOne: jest.fn().mockResolvedValue(mockEventCategory),
  update: jest.fn().mockResolvedValue(mockEventCategory),
  delete: jest.fn().mockResolvedValue(mockEventCategory),
};

describe('EventCategoryResolver', () => {
  let resolver: EventCategoryResolver;
  let service: EventCategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EventCategoryResolver,
        {
          provide: EventCategoryService,
          useValue: mockEventCategoryService, // Inject the mocked service
        },
      ],
    }).compile();

    resolver = module.get<EventCategoryResolver>(EventCategoryResolver);
    service = module.get<EventCategoryService>(EventCategoryService);
  });
  describe('createEventCategory', () => {
    it('should create and return a event-categorys', async () => {
      const input: CreateEventCategoryInput = {
        ...mockEventCategory,
      };

      const result = await resolver.createEventCategory(input);
      expect(service.create).toHaveBeenCalledWith(input);
      expect(result).toEqual(mockEventCategory);
    });
  });

  describe('eventCategorys (findAll)', () => {
    it('should return an array of event-categorys', async () => {
      const paginationArgs: PaginationArgs = {
        skip: 0,
        take: 10,
        limit: 10,
        page: 1,
      };

      // Call the resolver method
      const result = await resolver.eventCategories(paginationArgs);

      // Expect the service method to have been called
      expect(service.findAll).toHaveBeenCalledWith(paginationArgs);
      expect(result).toEqual([mockEventCategory]);
    });
  });

  describe('eventCategory (findOne)', () => {
    it('should return a single event-category by ID', async () => {
      const id = '1';

      // Call the resolver method
      const result = await resolver.eventCategory(id);

      // Expect the service method to have been called
      expect(service.findOne).toHaveBeenCalledWith(id);
      expect(result).toEqual(mockEventCategory);
    });
  });

  describe('updateEventCategory (update)', () => {
    it('should update and return the modified event-category', async () => {
      const id = '1';
      const updateData = { name: 'Updated' };
      const input: UpdateEventCategoryInput = {
        ...updateData,
      };

      // Call the resolver method
      const result = await resolver.updateEventCategory(id, input);

      // Expect the service method to have been called with correct arguments
      expect(service.update).toHaveBeenCalledWith(id, updateData);
      expect(result).toEqual(mockEventCategory);
    });
  });

  describe('deleteEventCategory (delete)', () => {
    it('should delete a event-category and return it', async () => {
      const id = '1';

      // Call the resolver method
      const result = await resolver.deleteEventCategory(id);

      // Expect the service method to have been called
      expect(service.delete).toHaveBeenCalledWith(id);
      expect(result).toEqual(mockEventCategory);
    });
  });
});
