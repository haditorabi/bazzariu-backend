import { Test, TestingModule } from '@nestjs/testing';
import { DealsRedemtionsService } from './deals-redemtions.service';

describe('DealsRedemtionsService', () => {
  let service: DealsRedemtionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DealsRedemtionsService],
    }).compile();

    service = module.get<DealsRedemtionsService>(DealsRedemtionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
