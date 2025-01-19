import { Test, TestingModule } from '@nestjs/testing';
import { UserBookingResolver } from './user-booking.resolver';

describe('UserBookingResolver', () => {
  let resolver: UserBookingResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserBookingResolver],
    }).compile();

    resolver = module.get<UserBookingResolver>(UserBookingResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
