import { Test, TestingModule } from '@nestjs/testing';
import { BusinessBookingsService } from './business-bookings.service';

describe('BusinessBookingsService', () => {
  let service: BusinessBookingsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BusinessBookingsService],
    }).compile();

    service = module.get<BusinessBookingsService>(BusinessBookingsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
