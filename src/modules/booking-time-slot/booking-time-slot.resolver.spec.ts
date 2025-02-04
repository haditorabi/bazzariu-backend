import { Test, TestingModule } from '@nestjs/testing';
import { BookingTimeSlotResolver } from './booking-time-slot.resolver';
import { BookingTimeSlotService } from './booking-time-slot.service';
import { PrismaService } from '../prisma/prisma.service';

describe('BookingTimeSlotResolver', () => {
  let resolver: BookingTimeSlotResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BookingTimeSlotResolver,
        BookingTimeSlotService,
        PrismaService,
      ],
    }).compile();

    resolver = module.get<BookingTimeSlotResolver>(BookingTimeSlotResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
