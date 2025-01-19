import { Test, TestingModule } from '@nestjs/testing';
import { UserBlockedService } from './user-blocked.service';

describe('UserBlockedService', () => {
  let service: UserBlockedService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserBlockedService],
    }).compile();

    service = module.get<UserBlockedService>(UserBlockedService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
