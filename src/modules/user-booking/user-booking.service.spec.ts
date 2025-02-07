import { Test, TestingModule } from '@nestjs/testing';
import { UserBookingService } from './user-booking.service';
import { PrismaService } from '../prisma/prisma.service';
import { UserBooking, UserBookingStatus } from '@prisma/client';
import { PaginationArgs } from 'src/graphql/pagination-args-types';
import { Prisma } from '@prisma/client';

// Mock data for testing
const mockUserBooking: UserBooking = {
  id: '1',
  createdAt: new Date(),
  userId: '',
  bookingTimeSlotId: '1',
  status: UserBookingStatus.CANCELED,
  updatedAt: new Date(),
  businessProductId: ['1'],
};

// Mock implementation of the PrismaService
const mockPrismaService = {
  userBooking: {
    create: jest.fn().mockResolvedValue(mockUserBooking),
    findMany: jest.fn().mockResolvedValue([mockUserBooking]),
    findUnique: jest.fn().mockResolvedValue(mockUserBooking),
    update: jest.fn().mockResolvedValue(mockUserBooking),
    delete: jest.fn().mockResolvedValue(mockUserBooking),
  },
};

describe('UserBookingService', () => {
  let service: UserBookingService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserBookingService,
        {
          provide: PrismaService,
          useValue: mockPrismaService, // Inject the mocked PrismaService
        },
      ],
    }).compile();

    service = module.get<UserBookingService>(UserBookingService);
    prisma = module.get<PrismaService>(PrismaService);
  });
  describe('create', () => {
    it('should create and return a user-booking', async () => {
      const input: Prisma.UserBookingCreateInput = {
        ...mockUserBooking,
        user: {
          connect: {
            id: '1',
          },
        },
        bookingTimeSlot: {
          connect: {
            id: '1',
          },
        },
      };

      const result = await service.create(input);
      expect(prisma.userBooking.create).toHaveBeenCalledWith({
        data: input,
      });
      expect(result).toEqual(mockUserBooking);
    });
  });

  describe('findAll', () => {
    it('should return an array of user-bookings', async () => {
      const paginationArgs: PaginationArgs = {
        skip: 0,
        take: 10,
        limit: 10,
        page: 1,
      };

      // Call the service method
      const result = await service.findAll(paginationArgs);

      // Expect the prisma method to have been called
      expect(prisma.userBooking.findMany).toHaveBeenCalledWith({
        skip: paginationArgs.skip,
        take: paginationArgs.take,
      });
      expect(result).toEqual([mockUserBooking]);
    });
  });

  describe('findOne', () => {
    it('should return a single user-booking by ID', async () => {
      const id = '1';

      // Call the service method
      const result = await service.findOne(id);

      // Expect the prisma method to have been called
      expect(prisma.userBooking.findUnique).toHaveBeenCalledWith({
        where: { id },
      });
      expect(result).toEqual(mockUserBooking);
    });
  });

  describe('update', () => {
    it('should update and return the modified user-booking', async () => {
      const id = '1';
      const updateData: Prisma.UserBookingUpdateInput = {
        status: UserBookingStatus.CANCELED,
      };

      // Call the service method
      const result = await service.update(id, updateData);

      // Expect the prisma method to have been called with correct arguments
      expect(prisma.userBooking.update).toHaveBeenCalledWith({
        where: { id },
        data: updateData,
      });
      expect(result).toEqual(mockUserBooking);
    });
  });

  describe('delete', () => {
    it('should delete a user-booking and return it', async () => {
      const id = '1';

      // Call the service method
      const result = await service.delete(id);

      // Expect the prisma method to have been called
      expect(prisma.userBooking.delete).toHaveBeenCalledWith({
        where: { id },
      });
      expect(result).toEqual(mockUserBooking);
    });
  });
});
