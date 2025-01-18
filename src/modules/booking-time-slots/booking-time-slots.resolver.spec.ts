import { Test, TestingModule } from '@nestjs/testing';
import { BookingTimeSlotsResolver } from './booking-time-slots.resolver';

describe('BookingTimeSlotsResolver', () => {
  let resolver: BookingTimeSlotsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BookingTimeSlotsResolver],
    }).compile();

    resolver = module.get<BookingTimeSlotsResolver>(BookingTimeSlotsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
