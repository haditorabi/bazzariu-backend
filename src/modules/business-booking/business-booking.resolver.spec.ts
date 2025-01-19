import { Test, TestingModule } from '@nestjs/testing';
import { BusinessBookingResolver } from './business-booking.resolver';

describe('BusinessBookingResolver', () => {
  let resolver: BusinessBookingResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BusinessBookingResolver],
    }).compile();

    resolver = module.get<BusinessBookingResolver>(BusinessBookingResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
