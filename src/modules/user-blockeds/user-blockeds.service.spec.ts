import { Test, TestingModule } from '@nestjs/testing';
import { UserBlockedsService } from './user-blockeds.service';

describe('UserBlockedsService', () => {
  let service: UserBlockedsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserBlockedsService],
    }).compile();

    service = module.get<UserBlockedsService>(UserBlockedsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
