import { Test, TestingModule } from '@nestjs/testing';
import { UserBookingsResolver } from './user-bookings.resolver';

describe('UserBookingsResolver', () => {
  let resolver: UserBookingsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserBookingsResolver],
    }).compile();

    resolver = module.get<UserBookingsResolver>(UserBookingsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
