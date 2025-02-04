import { Test } from '@nestjs/testing';
import { BusinessBookingService } from './business-booking.service';
import { PrismaService } from '../prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';
import { BusinessBookingStatus } from '@prisma/client';
import { ObjectId } from 'bson';

const generateObjectId = () => new ObjectId().toHexString();

const mockBusinessBooking = {
  id: generateObjectId(),
  businessId: generateObjectId(),
  businessProductId: [generateObjectId()],
  maxAvailable: 5,
  maxGuest: 10,
  mediaId: [generateObjectId()],
  status: BusinessBookingStatus.ACTIVE,
  createdAt: new Date(),
  updatedAt: new Date(),
  business: { id: generateObjectId(), name: 'Test Business' },
  businessProduct: [{ id: generateObjectId(), name: 'Test Product' }],
  BookingTimeSlot: [
    { id: generateObjectId(), startTime: new Date(), endTime: new Date() },
  ],
};

const mockPrisma = {
  businessBooking: {
    findMany: jest.fn().mockResolvedValue([mockBusinessBooking]),
    findUnique: jest.fn().mockResolvedValue(mockBusinessBooking),
    create: jest.fn().mockResolvedValue(mockBusinessBooking),
    update: jest.fn().mockResolvedValue(mockBusinessBooking),
    delete: jest.fn().mockResolvedValue(mockBusinessBooking),
  },
  business: {
    findUnique: jest.fn().mockResolvedValue(mockBusinessBooking.business),
  },
  businessProduct: {
    findMany: jest.fn().mockResolvedValue(mockBusinessBooking.businessProduct),
  },
  bookingTimeSlot: {
    findMany: jest.fn().mockResolvedValue(mockBusinessBooking.BookingTimeSlot),
  },
};

describe('BusinessBookingService', () => {
  let service: BusinessBookingService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        BusinessBookingService,
        { provide: PrismaService, useValue: mockPrisma },
      ],
    }).compile();

    service = module.get<BusinessBookingService>(BusinessBookingService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create a business booking', async () => {
      const result = await service.create(mockBusinessBooking as any);
      expect(prisma.businessBooking.create).toHaveBeenCalledWith({
        data: mockBusinessBooking,
      });
      expect(result).toEqual(mockBusinessBooking);
    });

    it('should throw error when creation fails', async () => {
      const error = new Error('Creation failed');
      jest.spyOn(prisma.businessBooking, 'create').mockRejectedValue(error);
      await expect(service.create(mockBusinessBooking as any)).rejects.toThrow(
        'Failed to create business booking: Creation failed',
      );
    });
  });

  describe('findAll', () => {
    it('should return all business bookings with pagination', async () => {
      const pagination = { skip: 0, take: 10, limit: 10, page: 1 };
      const result = await service.findAll(pagination);

      expect(prisma.businessBooking.findMany).toHaveBeenCalledWith({
        skip: pagination.skip,
        take: pagination.take,
        include: {
          business: true,
          businessProduct: true,
          BookingTimeSlot: true,
        },
      });
      expect(result).toEqual([mockBusinessBooking]);
    });
  });

  describe('findOne', () => {
    it('should return a business booking by ID', async () => {
      const result = await service.findOne(mockBusinessBooking.id);

      expect(prisma.businessBooking.findUnique).toHaveBeenCalledWith({
        where: { id: mockBusinessBooking.id },
        include: {
          business: true,
          businessProduct: true,
          BookingTimeSlot: true,
        },
      });
      expect(result).toEqual(mockBusinessBooking);
    });

    it('should throw NotFoundException when booking not found', async () => {
      jest.spyOn(prisma.businessBooking, 'findUnique').mockResolvedValue(null);
      await expect(service.findOne('invalid-id')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('update', () => {
    it('should update a business booking', async () => {
      const updateData = { maxGuest: 15 };
      const result = await service.update(
        mockBusinessBooking.id,
        updateData as any,
      );
      expect(prisma.businessBooking.update).toHaveBeenCalledWith({
        where: { id: mockBusinessBooking.id },
        data: updateData,
      });
      expect(result).toEqual(mockBusinessBooking);
    });
    it('should throw error when update fails', async () => {
      const error = new Error('Update failed');
      jest.spyOn(prisma.businessBooking, 'update').mockRejectedValue(error);
      await expect(
        service.update(mockBusinessBooking.id, {} as any),
      ).rejects.toThrow('Failed to update business booking: Update failed');
    });
  });

  describe('delete', () => {
    it('should delete a business booking', async () => {
      const result = await service.delete(mockBusinessBooking.id);

      expect(prisma.businessBooking.delete).toHaveBeenCalledWith({
        where: { id: mockBusinessBooking.id },
      });
      expect(result).toEqual(mockBusinessBooking);
    });
  });

  describe('getBusiness', () => {
    it('should retrieve associated business', async () => {
      const result = await service.getBusiness(mockBusinessBooking.businessId);

      expect(prisma.business.findUnique).toHaveBeenCalledWith({
        where: { id: mockBusinessBooking.businessId },
      });
      expect(result).toEqual(mockBusinessBooking.business);
    });
  });

  describe('getBusinessProducts', () => {
    it('should retrieve associated products', async () => {
      const productIds = [mockBusinessBooking.businessProduct[0].id];
      const result = await service.getBusinessProducts(productIds);

      expect(prisma.businessProduct.findMany).toHaveBeenCalledWith({
        where: { id: { in: productIds } },
      });
      expect(result).toEqual(mockBusinessBooking.businessProduct);
    });
  });

  describe('getBookingTimeSlots', () => {
    it('should retrieve associated time slots', async () => {
      const result = await service.getBookingTimeSlots(mockBusinessBooking.id);

      expect(prisma.bookingTimeSlot.findMany).toHaveBeenCalledWith({
        where: { businessBookingId: mockBusinessBooking.id },
      });
      expect(result).toEqual(mockBusinessBooking.BookingTimeSlot);
    });
  });
});
