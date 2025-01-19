import { Test, TestingModule } from '@nestjs/testing';
import { BookingTimeSlotResolver } from './booking-time-slot.resolver';

describe('BookingTimeSlotResolver', () => {
  let resolver: BookingTimeSlotResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BookingTimeSlotResolver],
    }).compile();

    resolver = module.get<BookingTimeSlotResolver>(BookingTimeSlotResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
