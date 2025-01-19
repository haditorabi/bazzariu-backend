import { Test, TestingModule } from '@nestjs/testing';
import { BusinessBookingService } from './business-booking.service';

describe('BusinessBookingervice', () => {
  let service: BusinessBookingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BusinessBookingService],
    }).compile();

    service = module.get<BusinessBookingService>(BusinessBookingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
