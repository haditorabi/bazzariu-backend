import { Test, TestingModule } from '@nestjs/testing';
import { DealsRedemptionService } from './deal-redemption.service';

describe('DealRedemtionService', () => {
  let service: DealsRedemptionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DealsRedemptionService],
    }).compile();

    service = module.get<DealsRedemptionService>(DealsRedemptionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
