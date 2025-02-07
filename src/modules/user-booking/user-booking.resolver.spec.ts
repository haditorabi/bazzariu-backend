import { Test, TestingModule } from '@nestjs/testing';
import { UserBookingResolver } from './user-booking.resolver';
import { UserBookingService } from './user-booking.service';
import {
  UserBooking,
  CreateUserBookingInput,
  UpdateUserBookingInput,
} from './user-booking.graphql';
import { PaginationArgs } from 'src/graphql/pagination-args-types';
import { UserBookingStatus } from '@prisma/client';

// Mock data for testing
const mockUserBooking: UserBooking = {
  id: '1',
  createdAt: new Date(),
  userId: '',
  bookingTimeSlotId: '',
  status: UserBookingStatus.CANCELED,
  updatedAt: new Date(),
};

// Mock implementation of the UserBookingService
const mockUserBookingService = {
  create: jest.fn().mockResolvedValue(mockUserBooking),
  findAll: jest.fn().mockResolvedValue([mockUserBooking]),
  findOne: jest.fn().mockResolvedValue(mockUserBooking),
  update: jest.fn().mockResolvedValue(mockUserBooking),
  delete: jest.fn().mockResolvedValue(mockUserBooking),
};

describe('UserBookingResolver', () => {
  let resolver: UserBookingResolver;
  let service: UserBookingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserBookingResolver,
        {
          provide: UserBookingService,
          useValue: mockUserBookingService, // Inject the mocked service
        },
      ],
    }).compile();

    resolver = module.get<UserBookingResolver>(UserBookingResolver);
    service = module.get<UserBookingService>(UserBookingService);
  });
  describe('createUserBooking', () => {
    it('should create and return a user-bookings', async () => {
      const input: CreateUserBookingInput = {
        ...mockUserBooking,
        userId: '1',
        bookingTimeSlotId: '1',
      };

      const result = await resolver.createUserBooking(input);
      // expect(service.create).toHaveBeenCalledWith(input);
      expect(result).toEqual(mockUserBooking);
    });
  });

  describe('userBookings (findAll)', () => {
    it('should return an array of user-bookings', async () => {
      const paginationArgs: PaginationArgs = {
        skip: 0,
        take: 10,
        limit: 10,
        page: 1,
      };

      // Call the resolver method
      const result = await resolver.userBookings(paginationArgs);

      // Expect the service method to have been called
      expect(service.findAll).toHaveBeenCalledWith(paginationArgs);
      expect(result).toEqual([mockUserBooking]);
    });
  });

  describe('userBooking (findOne)', () => {
    it('should return a single user-booking by ID', async () => {
      const id = '1';

      // Call the resolver method
      const result = await resolver.userBooking(id);

      // Expect the service method to have been called
      expect(service.findOne).toHaveBeenCalledWith(id);
      expect(result).toEqual(mockUserBooking);
    });
  });

  describe('updateUserBooking (update)', () => {
    it('should update and return the modified user-booking', async () => {
      const id = '1';
      const updateData = { status: UserBookingStatus.CANCELED };
      const input: UpdateUserBookingInput = {
        ...updateData,
      };

      // Call the resolver method
      const result = await resolver.updateUserBooking(id, input);

      // Expect the service method to have been called with correct arguments
      expect(service.update).toHaveBeenCalledWith(id, updateData);
      expect(result).toEqual(mockUserBooking);
    });
  });

  describe('deleteUserBooking (delete)', () => {
    it('should delete a user-booking and return it', async () => {
      const id = '1';

      // Call the resolver method
      const result = await resolver.deleteUserBooking(id);

      // Expect the service method to have been called
      expect(service.delete).toHaveBeenCalledWith(id);
      expect(result).toEqual(mockUserBooking);
    });
  });
});
