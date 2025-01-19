import { Test, TestingModule } from '@nestjs/testing';
import { BookingTimeSlotService } from './booking-time-slot.service';

describe('BookingTimeSlotService', () => {
  let service: BookingTimeSlotService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BookingTimeSlotService],
    }).compile();

    service = module.get<BookingTimeSlotService>(BookingTimeSlotService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
