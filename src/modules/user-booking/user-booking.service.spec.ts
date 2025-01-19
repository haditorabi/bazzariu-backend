import { Test, TestingModule } from '@nestjs/testing';
import { UserBookingService } from './user-booking.service';

describe('UserBookingService', () => {
  let service: UserBookingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserBookingService],
    }).compile();

    service = module.get<UserBookingService>(UserBookingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
