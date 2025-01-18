import { Test, TestingModule } from '@nestjs/testing';
import { BusinessBookingsResolver } from './business-bookings.resolver';

describe('BusinessBookingsResolver', () => {
  let resolver: BusinessBookingsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BusinessBookingsResolver],
    }).compile();

    resolver = module.get<BusinessBookingsResolver>(BusinessBookingsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
