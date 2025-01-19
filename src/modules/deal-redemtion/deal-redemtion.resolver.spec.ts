import { Test, TestingModule } from '@nestjs/testing';
import { DealRedemtionResolver } from './deal-redemtion.resolver';

describe('DealRedemtionResolver', () => {
  let resolver: DealRedemtionResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DealRedemtionResolver],
    }).compile();

    resolver = module.get<DealRedemtionResolver>(DealRedemtionResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
