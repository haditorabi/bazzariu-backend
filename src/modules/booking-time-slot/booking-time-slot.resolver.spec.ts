import { Test, TestingModule } from '@nestjs/testing';
import { BookingTimeSlotResolver } from './booking-time-slot.resolver';
import { BookingTimeSlotService } from './booking-time-slot.service';
import {
  CreateBookingTimeSlotInput,
  UpdateBookingTimeSlotInput,
} from './booking-time-slot.graphql';
import { mockDeep, DeepMockProxy } from 'jest-mock-extended';
import { BookingTimeSlot } from '@prisma/client';
import { PaginationArgs } from 'src/graphql/pagination-args-types';

describe('BookingTimeSlotResolver', () => {
  let resolver: BookingTimeSlotResolver;
  let service: DeepMockProxy<BookingTimeSlotService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BookingTimeSlotResolver,
        {
          provide: BookingTimeSlotService,
          useValue: mockDeep<BookingTimeSlotService>(),
        },
      ],
    }).compile();

    resolver = module.get<BookingTimeSlotResolver>(BookingTimeSlotResolver);
    service = module.get(BookingTimeSlotService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('bookingTimeSlots', () => {
    it('should return an array of booking time slots', async () => {
      const paginationArgs: PaginationArgs = {
        page: 1,
        limit: 10,
        take: 0,
        skip: 10,
      };
      const bookingTimeSlots: BookingTimeSlot[] = [
        {
          id: '1',
          startAt: new Date(),
          endAt: new Date(),
          timezone: 'UTC',
          status: 'ACTIVE',
          businessBookingId: 'business1',
        },
      ];

      service.findAll.mockResolvedValue(bookingTimeSlots);

      const result = await resolver.bookingTimeSlots(paginationArgs);
      expect(result).toEqual(bookingTimeSlots);
      expect(service.findAll).toHaveBeenCalledWith(paginationArgs);
    });
  });

  describe('bookingTimeSlot', () => {
    it('should return a single booking time slot', async () => {
      const bookingTimeSlot: BookingTimeSlot = {
        id: '1',
        startAt: new Date(),
        endAt: new Date(),
        timezone: 'UTC',
        status: 'ACTIVE',
        businessBookingId: 'business1',
      };

      service.findOne.mockResolvedValue(bookingTimeSlot);

      const result = await resolver.bookingTimeSlot('1');
      expect(result).toEqual(bookingTimeSlot);
      expect(service.findOne).toHaveBeenCalledWith('1');
    });

    it('should return null if booking time slot is not found', async () => {
      service.findOne.mockResolvedValue(null);

      const result = await resolver.bookingTimeSlot('1');
      expect(result).toBeNull();
      expect(service.findOne).toHaveBeenCalledWith('1');
    });
  });

  describe('createBookingTimeSlot', () => {
    it('should create and return a booking time slot', async () => {
      const input: CreateBookingTimeSlotInput = {
        startAt: new Date(),
        endAt: new Date(),
        timezone: 'UTC',
        status: 'ACTIVE',
        businessBooking: 'business1',
      };

      const createdBookingTimeSlot: BookingTimeSlot = {
        id: '1',
        startAt: input.startAt,
        endAt: input.endAt,
        timezone: input.timezone,
        status: input.status,
        businessBookingId: 'business1',
      };

      service.create.mockResolvedValue(createdBookingTimeSlot);

      const result = await resolver.createBookingTimeSlot(input);
      expect(result).toEqual(createdBookingTimeSlot);
      expect(service.create).toHaveBeenCalledWith({
        ...input,
        businessBooking: {
          connect: { id: input.businessBooking },
        },
      });
    });
  });

  describe('updateBookingTimeSlot', () => {
    it('should update and return the booking time slot', async () => {
      const input: UpdateBookingTimeSlotInput = {
        startAt: new Date(),
        endAt: new Date(),
        timezone: 'UTC',
        status: 'NOTAVAILABLE',
        businessBooking: 'business1',
      };

      const updatedBookingTimeSlot: BookingTimeSlot = {
        id: '1',
        startAt: input.startAt,
        endAt: input.endAt,
        timezone: input.timezone,
        status: input.status,
        businessBookingId: 'business1',
      };

      service.update.mockResolvedValue(updatedBookingTimeSlot);

      const result = await resolver.updateBookingTimeSlot('1', input);
      expect(result).toEqual(updatedBookingTimeSlot);
      expect(service.update).toHaveBeenCalledWith('1', {
        ...input,
        businessBooking: {
          connect: { id: input.businessBooking },
        },
      });
    });
  });

  describe('deleteBookingTimeSlot', () => {
    it('should delete the booking time slot and return true', async () => {
      service.delete.mockResolvedValue(true);

      const result = await resolver.deleteBookingTimeSlot('1');
      expect(result).toBe(true);
      expect(service.delete).toHaveBeenCalledWith('1');
    });
  });

  describe('businessBooking', () => {
    it('should return the associated business booking', async () => {
      const bookingTimeSlot: BookingTimeSlot = {
        id: '1',
        startAt: new Date(),
        endAt: new Date(),
        timezone: 'UTC',
        status: 'ACTIVE',
        businessBookingId: 'business1',
      };

      const businessBooking = { id: 'business1', name: 'Business 1' };

      service.getBusinessBooking.mockResolvedValue(businessBooking);

      const result = await resolver.businessBooking(bookingTimeSlot);
      expect(result).toEqual(businessBooking);
      expect(service.getBusinessBooking).toHaveBeenCalledWith('1');
    });
  });
});
