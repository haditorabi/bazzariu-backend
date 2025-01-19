import { Test, TestingModule } from '@nestjs/testing';
import { DealRedemtionService } from './deal-redemtion.service';

describe('DealRedemtionService', () => {
  let service: DealRedemtionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DealRedemtionService],
    }).compile();

    service = module.get<DealRedemtionService>(DealRedemtionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
