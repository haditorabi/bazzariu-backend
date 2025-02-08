import { Test, TestingModule } from '@nestjs/testing';
import { BookingTimeSlotResolver } from './booking-time-slot.resolver';
import { BookingTimeSlotService } from './booking-time-slot.service';
import {
  CreateBookingTimeSlotInput,
  UpdateBookingTimeSlotInput,
} from './booking-time-slot.graphql';
import { BookingTimeSlotStatus } from '@prisma/client';
import { PaginationArgs } from 'src/graphql/pagination-args-types';
import { ObjectId } from 'mongodb';

describe('BookingTimeSlotResolver', () => {
  let resolver: BookingTimeSlotResolver;

  const mockBookingTimeSlotService = {
    findAll: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    getBusinessBooking: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BookingTimeSlotResolver,
        {
          provide: BookingTimeSlotService,
          useValue: mockBookingTimeSlotService,
        },
      ],
    }).compile();

    resolver = module.get<BookingTimeSlotResolver>(BookingTimeSlotResolver);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('bookingTimeSlots', () => {
    it('should return an array of booking time slots', async () => {
      const paginationArgs: PaginationArgs = {
        skip: 0,
        take: 10,
        limit: 10,
        page: 1,
      };
      const result = [
        {
          id: new ObjectId().toHexString(),
          startAt: new Date(),
          endAt: new Date(),
          timezone: 'UTC',
          status: BookingTimeSlotStatus.ACTIVE,
        },
      ];
      mockBookingTimeSlotService.findAll.mockResolvedValue(result);
      expect(await resolver.bookingTimeSlots(paginationArgs)).toEqual(result);
    });
  });

  describe('bookingTimeSlot', () => {
    it('should return a single booking time slot', async () => {
      const id = new ObjectId().toHexString();
      const result = {
        id,
        startAt: new Date(),
        endAt: new Date(),
        timezone: 'UTC',
        status: BookingTimeSlotStatus.ACTIVE,
      };
      mockBookingTimeSlotService.findOne.mockResolvedValue(result);
      expect(await resolver.bookingTimeSlot(id)).toEqual(result);
    });

    it('should throw error if booking time slot is not found', async () => {
      const id = new ObjectId().toHexString();
      mockBookingTimeSlotService.findOne.mockResolvedValue(null);
      await expect(resolver.bookingTimeSlot(id)).rejects.toThrow();
    });
  });

  describe('createBookingTimeSlot', () => {
    it('should create and return a booking time slot', async () => {
      const input: CreateBookingTimeSlotInput = {
        businessBookingId: new ObjectId().toHexString(),
        startAt: new Date(),
        endAt: new Date(),
        timezone: 'UTC',
        status: BookingTimeSlotStatus.ACTIVE,
      };
      const result = {
        id: new ObjectId().toHexString(),
        ...input,
      };
      mockBookingTimeSlotService.create.mockResolvedValue(result);
      expect(await resolver.createBookingTimeSlot(input)).toEqual(result);
    });

    // it('should throw an error if input validation fails', async () => {
    //   const input: CreateBookingTimeSlotInput = {
    //     businessBooking: new ObjectId().toHexString(),
    //     startAt: new Date(),
    //     endAt: new Date('invalid-date'),
    //     timezone: 'UTC',
    //     status: BookingTimeSlotStatus.ACTIVE,
    //   };
    //   await expect(resolver.createBookingTimeSlot(input)).rejects.toThrow();
    // });
  });

  describe('updateBookingTimeSlot', () => {
    it('should update and return the booking time slot', async () => {
      const id = new ObjectId().toHexString();
      const input: UpdateBookingTimeSlotInput = {
        startAt: new Date(),
      };
      const result = {
        id,
        ...input,
        endAt: new Date(),
        timezone: 'UTC',
        status: BookingTimeSlotStatus.ACTIVE,
      };
      mockBookingTimeSlotService.update.mockResolvedValue(result);
      expect(await resolver.updateBookingTimeSlot(id, input)).toEqual(result);
    });

    it('should throw an error if booking time slot is not found', async () => {
      const id = new ObjectId().toHexString();
      const input: UpdateBookingTimeSlotInput = {
        startAt: new Date(),
      };
      mockBookingTimeSlotService.update.mockResolvedValue(null);
      await expect(resolver.updateBookingTimeSlot(id, input)).rejects.toThrow();
    });
  });

  describe('deleteBookingTimeSlot', () => {
    it('should delete the booking time slot and return true', async () => {
      const id = new ObjectId().toHexString();
      mockBookingTimeSlotService.delete.mockResolvedValue(true);
      expect(await resolver.deleteBookingTimeSlot(id)).toBe(true);
    });

    it('should return false if booking time slot is not found', async () => {
      const id = new ObjectId().toHexString();
      mockBookingTimeSlotService.delete.mockResolvedValue(false);
      expect(await resolver.deleteBookingTimeSlot(id)).toBe(false);
    });
  });

  describe('businessBooking', () => {
    it('should return the associated business booking', async () => {
      const bookingTimeSlot = {
        id: new ObjectId().toHexString(),
        startAt: new Date(),
        endAt: new Date(),
        timezone: 'UTC',
        status: BookingTimeSlotStatus.ACTIVE,
      };
      const businessBooking = {
        id: new ObjectId().toHexString(),
        name: 'Test Business',
      };
      mockBookingTimeSlotService.getBusinessBooking.mockResolvedValue(
        businessBooking,
      );
      expect(await resolver.businessBooking(bookingTimeSlot)).toEqual(
        businessBooking,
      );
    });

    it('should return null if no associated business booking is found', async () => {
      const bookingTimeSlot = {
        id: new ObjectId().toHexString(),
        startAt: new Date(),
        endAt: new Date(),
        timezone: 'UTC',
        status: BookingTimeSlotStatus.ACTIVE,
      };
      mockBookingTimeSlotService.getBusinessBooking.mockResolvedValue(null);
      expect(await resolver.businessBooking(bookingTimeSlot)).toBeNull();
    });
  });
});
