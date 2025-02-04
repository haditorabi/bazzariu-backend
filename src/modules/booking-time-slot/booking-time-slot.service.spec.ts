import { Test, TestingModule } from '@nestjs/testing';
import { BookingTimeSlotService } from './booking-time-slot.service';
import { PrismaService } from '../prisma/prisma.service';
import { BookingTimeSlot, Prisma, BookingTimeSlotStatus } from '@prisma/client';
import { PaginationArgs } from 'src/graphql/pagination-args-types';
import { ObjectId } from 'mongodb';

describe('BookingTimeSlotService', () => {
  let service: BookingTimeSlotService;
  let prismaService: PrismaService;

  const mockPrismaService = {
    bookingTimeSlot: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
    businessBooking: {
      findUnique: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BookingTimeSlotService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<BookingTimeSlotService>(BookingTimeSlotService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('findAll', () => {
    it('should return an array of booking time slots', async () => {
      const paginationArgs: PaginationArgs = {
        skip: 0,
        take: 10,
        limit: 10,
        page: 1,
      };
      const result: BookingTimeSlot[] = [
        {
          id: new ObjectId().toHexString(),
          startAt: new Date(),
          endAt: new Date(),
          timezone: 'UTC',
          status: BookingTimeSlotStatus.ACTIVE,
          businessBookingId: new ObjectId().toHexString(),
        },
      ];
      mockPrismaService.bookingTimeSlot.findMany.mockResolvedValue(result);
      expect(await service.findAll(paginationArgs)).toEqual(result);
    });
  });

  describe('findOne', () => {
    it('should return a booking time slot', async () => {
      const id = new ObjectId().toHexString();
      const result: BookingTimeSlot = {
        id,
        startAt: new Date(),
        endAt: new Date(),
        timezone: 'UTC',
        status: BookingTimeSlotStatus.ACTIVE,
        businessBookingId: new ObjectId().toHexString(),
      };
      mockPrismaService.bookingTimeSlot.findUnique.mockResolvedValue(result);
      expect(await service.findOne(id)).toEqual(result);
    });

    it('should return null if booking time slot is not found', async () => {
      const id = new ObjectId().toHexString();
      mockPrismaService.bookingTimeSlot.findUnique.mockResolvedValue(null);
      expect(await service.findOne(id)).toBeNull();
    });
  });

  describe('create', () => {
    it('should create and return a booking time slot', async () => {
      const data: Prisma.BookingTimeSlotCreateInput = {
        startAt: new Date(),
        endAt: new Date(),
        timezone: 'UTC',
        status: BookingTimeSlotStatus.ACTIVE,
        businessBooking: {
          connect: { id: new ObjectId().toHexString() },
        },
      };
      const result: BookingTimeSlot = {
        id: new ObjectId().toHexString(),
        startAt: data.startAt as Date,
        endAt: data.endAt as Date,
        timezone: data.timezone,
        status: data.status,
        businessBookingId: new ObjectId().toHexString(),
      };
      mockPrismaService.bookingTimeSlot.create.mockResolvedValue(result);
      expect(await service.create(data)).toEqual(result);
    });
  });

  describe('update', () => {
    it('should update and return the booking time slot', async () => {
      const id = new ObjectId().toHexString();
      const data: Prisma.BookingTimeSlotUpdateInput = {
        startAt: new Date(),
      };
      const result: BookingTimeSlot = {
        id,
        startAt: data.startAt as Date,
        endAt: new Date(),
        timezone: 'UTC',
        status: BookingTimeSlotStatus.ACTIVE,
        businessBookingId: new ObjectId().toHexString(),
      };
      mockPrismaService.bookingTimeSlot.update.mockResolvedValue(result);
      expect(await service.update(id, data)).toEqual(result);
    });

    it('should throw an error if booking time slot is not found', async () => {
      const id = new ObjectId().toHexString();
      const data: Prisma.BookingTimeSlotUpdateInput = {
        startAt: new Date(),
      };
      mockPrismaService.bookingTimeSlot.update.mockRejectedValue(
        new Error('Not found'),
      );
      await expect(service.update(id, data)).rejects.toThrow('Not found');
    });
  });

  describe('delete', () => {
    it('should delete the booking time slot and return true', async () => {
      const id = new ObjectId().toHexString();
      mockPrismaService.bookingTimeSlot.delete.mockResolvedValue(
        {} as BookingTimeSlot,
      );
      expect(await service.delete(id)).toBe(true);
    });

    it('should throw an error if booking time slot is not found', async () => {
      const id = new ObjectId().toHexString();
      mockPrismaService.bookingTimeSlot.delete.mockRejectedValue(
        new Error('Not found'),
      );
      await expect(service.delete(id)).rejects.toThrow('Not found');
    });
  });

  describe('getBusinessBooking', () => {
    it('should return the associated business booking', async () => {
      const bookingTimeSlotId = new ObjectId().toHexString();
      const businessBooking = {
        id: new ObjectId().toHexString(),
        name: 'Test Business',
      };
      mockPrismaService.businessBooking.findUnique.mockResolvedValue(
        businessBooking,
      );
      expect(await service.getBusinessBooking(bookingTimeSlotId)).toEqual(
        businessBooking,
      );
    });

    it('should return null if no associated business booking is found', async () => {
      const bookingTimeSlotId = new ObjectId().toHexString();
      mockPrismaService.businessBooking.findUnique.mockResolvedValue(null);
      expect(await service.getBusinessBooking(bookingTimeSlotId)).toBeNull();
    });
  });
});
