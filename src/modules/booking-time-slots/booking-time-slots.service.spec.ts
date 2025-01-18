import { Test, TestingModule } from '@nestjs/testing';
import { BookingTimeSlotsService } from './booking-time-slots.service';

describe('BookingTimeSlotsService', () => {
  let service: BookingTimeSlotsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BookingTimeSlotsService],
    }).compile();

    service = module.get<BookingTimeSlotsService>(BookingTimeSlotsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
