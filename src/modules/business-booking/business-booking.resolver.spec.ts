import { Test, TestingModule } from '@nestjs/testing';
import { BusinessBookingResolver } from './business-booking.resolver';
import { BusinessBookingService } from './business-booking.service';
import { PrismaService } from '../prisma/prisma.service';
import {
  CreateBusinessBookingInput,
  UpdateBusinessBookingInput,
} from './business-booking.graphql';
import { NotFoundException } from '@nestjs/common';
import { PaginationArgs } from 'src/graphql/pagination-args-types';
import { ObjectId } from 'bson';
import {
  BookingTimeSlotStatus,
  BusinessBookingStatus,
  BusinessProductStatus,
  BusinessStatus,
} from '@prisma/client';

describe('BusinessBookingResolver', () => {
  let resolver: BusinessBookingResolver;
  let service: BusinessBookingService;

  // const mockBusinessBooking = {
  //   id: new ObjectId().toString(),
  //   businessId: new ObjectId().toString(),
  //   businessProductId: [new ObjectId().toString()],
  //   maxAvailable: 10,
  //   maxGuest: 5,
  //   mediaId: [new ObjectId().toString()],
  //   status: 'ACTIVE' as BusinessBookingStatus,
  //   createdAt: new Date(),
  //   updatedAt: new Date(),
  // };

  const mockBusinessBooking = {
    id: new ObjectId().toString(),
    businessId: new ObjectId().toString(),
    businessProductId: [new ObjectId().toString()],
    maxAvailable: 10,
    maxGuest: 5,
    mediaId: [new ObjectId().toString()],
    status: 'ACTIVE' as BusinessBookingStatus,
    createdAt: new Date(),
    updatedAt: new Date(),
    business: {
      id: new ObjectId().toString(),
      name: 'Test Business',
      mediaId: [new ObjectId().toString()],
      status: 'ACTIVE' as BusinessStatus,
      createdAt: new Date(),
      updatedAt: new Date(),
      description: 'Test Description',
      website: 'https://test.com',
      isClaimed: true,
      businessCategoryId: [new ObjectId().toString()],
      amenityId: [new ObjectId().toString()],
      languageId: [new ObjectId().toString()],
      regionId: new ObjectId().toString(),
      claimedBy: new ObjectId().toString(),
    },
  };

  const mockBusiness = {
    id: new ObjectId().toString(),
    name: 'Test Business',
    mediaId: [new ObjectId().toString()],
    status: 'ACTIVE' as BusinessStatus,
    createdAt: new Date(),
    updatedAt: new Date(),
    description: 'Test Description',
    website: 'https://test.com',
    isClaimed: true,
    businessCategoryId: [new ObjectId().toString()],
    amenityId: [new ObjectId().toString()],
    languageId: [new ObjectId().toString()],
    regionId: new ObjectId().toString(),
    claimedBy: new ObjectId().toString(),
  };

  const mockBusinessProducts = [
    {
      id: new ObjectId().toString(),
      name: 'Product 1',
      businessId: new ObjectId().toString(),
      mediaId: [new ObjectId().toString()],
      status: 'ACTIVE' as BusinessProductStatus,
      createdAt: new Date(),
      updatedAt: new Date(),
      description: 'Description 1',
      productCategoryId: new ObjectId().toString(),
      businessBookingId: [new ObjectId().toString()],
      businessDealId: [new ObjectId().toString()],
    },
    {
      id: new ObjectId().toString(),
      name: 'Product 2',
      businessId: new ObjectId().toString(),
      mediaId: [new ObjectId().toString()],
      status: 'ACTIVE' as BusinessProductStatus,
      createdAt: new Date(),
      updatedAt: new Date(),
      description: 'Description 2',
      productCategoryId: new ObjectId().toString(),
      businessBookingId: [new ObjectId().toString()],
      businessDealId: [new ObjectId().toString()],
    },
  ];

  const mockBookingTimeSlots = [
    {
      id: new ObjectId().toString(),
      status: 'ACTIVE' as BookingTimeSlotStatus,
      businessBookingId: new ObjectId().toString(),
      startAt: new Date(),
      endAt: new Date(),
      timezone: 'UTC',
    },
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BusinessBookingResolver,
        {
          provide: BusinessBookingService,
          useValue: {
            findAll: jest.fn(),
            findOne: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
            getBusiness: jest.fn(),
            getBusinessProducts: jest.fn(),
            getBookingTimeSlots: jest.fn(),
          },
        },
        {
          provide: PrismaService,
          useValue: {},
        },
      ],
    }).compile();

    resolver = module.get<BusinessBookingResolver>(BusinessBookingResolver);
    service = module.get<BusinessBookingService>(BusinessBookingService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('businessBookings', () => {
    it('should return paginated business bookings', async () => {
      const paginationArgs: PaginationArgs = {
        take: 10,
        skip: 0,
        limit: 10,
        page: 1,
      };
      jest.spyOn(service, 'findAll').mockResolvedValue([mockBusinessBooking]);

      const result = await resolver.businessBookings(paginationArgs);

      expect(service.findAll).toHaveBeenCalledWith(paginationArgs);
      expect(result).toEqual([mockBusinessBooking]);
    });
  });

  describe('businessBooking', () => {
    it('should return a single business booking by ID', async () => {
      jest.spyOn(service, 'findOne').mockResolvedValue(mockBusinessBooking);

      const result = await resolver.businessBooking(mockBusinessBooking.id);

      expect(service.findOne).toHaveBeenCalledWith(mockBusinessBooking.id);
      expect(result).toEqual(mockBusinessBooking);
    });

    it('should throw NotFoundException if business booking is not found', async () => {
      jest.spyOn(service, 'findOne').mockResolvedValue(null); // Mocking the service to return null

      // Test that the resolver throws the NotFoundException
      await expect(
        resolver.businessBooking(mockBusinessBooking.id),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('createBusinessBooking', () => {
    const createInput: CreateBusinessBookingInput = {
      businessId: mockBusiness.id,
      maxAvailable: 10,
      maxGuest: 5,
      mediaId: [new ObjectId().toString()],
      status: 'ACTIVE',
    };

    it('should create a new business booking', async () => {
      jest.spyOn(service, 'create').mockResolvedValue(mockBusinessBooking);

      const result = await resolver.createBusinessBooking(createInput);

      expect(service.create).toHaveBeenCalledWith(expect.any(Object));
      expect(result).toEqual(mockBusinessBooking);
    });
  });

  describe('updateBusinessBooking', () => {
    const updateInput: UpdateBusinessBookingInput = {
      maxAvailable: 15,
      maxGuest: 8,
    };

    it('should update an existing business booking', async () => {
      jest.spyOn(service, 'update').mockResolvedValue(mockBusinessBooking);

      const result = await resolver.updateBusinessBooking(
        mockBusinessBooking.id,
        updateInput,
      );

      expect(service.update).toHaveBeenCalledWith(
        mockBusinessBooking.id,
        expect.any(Object),
      );
      expect(result).toEqual(mockBusinessBooking);
    });
  });

  describe('deleteBusinessBooking', () => {
    it('should delete a business booking', async () => {
      jest.spyOn(service, 'delete').mockResolvedValue(mockBusinessBooking);

      const result = await resolver.deleteBusinessBooking(
        mockBusinessBooking.id,
      );

      expect(service.delete).toHaveBeenCalledWith(mockBusinessBooking.id);
      expect(result).toEqual(mockBusinessBooking);
    });
  });

  describe('resolveField - business', () => {
    it('should resolve the business field', async () => {
      jest.spyOn(service, 'getBusiness').mockResolvedValue(mockBusiness);

      const result = await resolver.business(mockBusinessBooking);

      expect(service.getBusiness).toHaveBeenCalledWith(
        mockBusinessBooking.businessId,
      );
      expect(result).toEqual(mockBusiness);
    });
  });

  describe('resolveField - businessProduct', () => {
    it('should resolve the businessProduct field', async () => {
      jest
        .spyOn(service, 'getBusinessProducts')
        .mockResolvedValue(mockBusinessProducts);

      const result = await resolver.businessProduct(mockBusinessBooking);

      expect(service.getBusinessProducts).toHaveBeenCalledWith(
        mockBusinessBooking.businessProductId,
      );
      expect(result).toEqual(mockBusinessProducts);
    });
  });

  describe('resolveField - bookingTimeSlot', () => {
    it('should resolve the bookingTimeSlot field', async () => {
      jest
        .spyOn(service, 'getBookingTimeSlots')
        .mockResolvedValue(mockBookingTimeSlots);

      const result = await resolver.bookingTimeSlot(mockBusinessBooking);

      expect(service.getBookingTimeSlots).toHaveBeenCalledWith(
        mockBusinessBooking.id,
      );
      expect(result).toEqual(mockBookingTimeSlots);
    });
  });
});
