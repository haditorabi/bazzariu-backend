import { Test, TestingModule } from '@nestjs/testing';
import { BookingTimeSlotService } from './booking-time-slot.service';
import { PrismaService } from '../prisma/prisma.service';
import { mockDeep, DeepMockProxy } from 'jest-mock-extended';
import { BookingTimeSlot, BusinessBookingStatus, Prisma } from '@prisma/client';
import { PaginationArgs } from 'src/graphql/pagination-args-types';

describe('BookingTimeSlotService', () => {
  let service: BookingTimeSlotService;
  let prisma: DeepMockProxy<PrismaService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BookingTimeSlotService,
        { provide: PrismaService, useValue: mockDeep<PrismaService>() },
      ],
    }).compile();

    service = module.get<BookingTimeSlotService>(BookingTimeSlotService);
    prisma = module.get(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of booking time slots', async () => {
      const paginationArgs: PaginationArgs = {
        skip: 0,
        take: 10,
        limit: 10,
        page: 1,
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

      prisma.bookingTimeSlot.findMany.mockResolvedValue(bookingTimeSlots);

      const result = await service.findAll(paginationArgs);
      expect(result).toEqual(bookingTimeSlots);
      expect(prisma.bookingTimeSlot.findMany).toHaveBeenCalledWith({
        skip: paginationArgs.skip,
        take: paginationArgs.take,
      });
    });
  });

  describe('findOne', () => {
    it('should return a single booking time slot', async () => {
      const bookingTimeSlot: BookingTimeSlot = {
        id: '1',
        startAt: new Date(),
        endAt: new Date(),
        timezone: 'UTC',
        status: 'ACTIVE',
        businessBookingId: 'business1',
      };

      prisma.bookingTimeSlot.findUnique.mockResolvedValue(bookingTimeSlot);

      const result = await service.findOne('1');
      expect(result).toEqual(bookingTimeSlot);
      expect(prisma.bookingTimeSlot.findUnique).toHaveBeenCalledWith({
        where: { id: '1' },
      });
    });

    it('should return null if booking time slot is not found', async () => {
      prisma.bookingTimeSlot.findUnique.mockResolvedValue(null);

      const result = await service.findOne('1');
      expect(result).toBeNull();
      expect(prisma.bookingTimeSlot.findUnique).toHaveBeenCalledWith({
        where: { id: '1' },
      });
    });
  });

  describe('create', () => {
    it('should create and return a booking time slot', async () => {
      const data: Prisma.BookingTimeSlotCreateInput = {
        startAt: new Date(),
        endAt: new Date(),
        timezone: 'UTC',
        status: 'ACTIVE',
        businessBooking: {
          connect: { id: 'business1' },
        },
      };

      const createdBookingTimeSlot: BookingTimeSlot = {
        id: '1',
        startAt: data.startAt as Date,
        endAt: data.endAt as Date,
        timezone: data.timezone,
        status: data.status,
        businessBookingId: 'business1',
      };

      prisma.bookingTimeSlot.create.mockResolvedValue(createdBookingTimeSlot);

      const result = await service.create(data);
      expect(result).toEqual(createdBookingTimeSlot);
      expect(prisma.bookingTimeSlot.create).toHaveBeenCalledWith({ data });
    });
  });

  describe('update', () => {
    it('should update and return the booking time slot', async () => {
      const data: Prisma.BookingTimeSlotUpdateInput = {
        startAt: new Date(),
        endAt: new Date(),
        timezone: 'UTC',
        status: 'NOTAVAILABLE',
        businessBooking: {
          connect: { id: 'business1' },
        },
      };

      const updatedBookingTimeSlot: BookingTimeSlot = {
        id: '1',
        startAt: data.startAt as Date,
        endAt: data.endAt as Date,
        timezone: data.timezone as string,
        status: data.status as 'ACTIVE' | 'NOTAVAILABLE',
        businessBookingId: 'business1',
      };

      prisma.bookingTimeSlot.update.mockResolvedValue(updatedBookingTimeSlot);

      const result = await service.update('1', data);
      expect(result).toEqual(updatedBookingTimeSlot);
      expect(prisma.bookingTimeSlot.update).toHaveBeenCalledWith({
        where: { id: '1' },
        data,
      });
    });
  });

  describe('delete', () => {
    it('should delete the booking time slot and return true', async () => {
      prisma.bookingTimeSlot.delete.mockResolvedValue({
        id: '1',
        startAt: new Date(),
        endAt: new Date(),
        timezone: 'UTC',
        status: 'ACTIVE',
        businessBookingId: 'business1',
      });

      const result = await service.delete('1');
      expect(result).toBe(true);
      expect(prisma.bookingTimeSlot.delete).toHaveBeenCalledWith({
        where: { id: '1' },
      });
    });
  });

  describe('getBusinessBooking', () => {
    it('should return the associated business booking', async () => {
      const businessBooking = {
        id: 'business1',
        name: 'Business 1',
        status: BusinessBookingStatus.ACTIVE,
        businessId: 'business1',
        businessProductId: ['product1'],
        maxAvailable: 10,
        maxGuest: 5,
        mediaId: ['media1'],
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      prisma.businessBooking.findUnique.mockResolvedValue(businessBooking);

      const result = await service.getBusinessBooking('1');
      expect(result).toEqual(businessBooking);
      expect(prisma.businessBooking.findUnique).toHaveBeenCalledWith({
        where: { id: '1' },
      });
    });
  });
});
