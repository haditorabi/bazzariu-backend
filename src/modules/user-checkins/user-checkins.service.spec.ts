import { Test, TestingModule } from '@nestjs/testing';
import { UserCheckinsService } from './user-checkins.service';

describe('UserCheckinsService', () => {
  let service: UserCheckinsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserCheckinsService],
    }).compile();

    service = module.get<UserCheckinsService>(UserCheckinsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
