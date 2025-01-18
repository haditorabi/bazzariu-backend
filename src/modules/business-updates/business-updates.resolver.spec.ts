import { Test, TestingModule } from '@nestjs/testing';
import { BusinessUpdatesResolver } from './business-updates.resolver';

describe('BusinessUpdatesResolver', () => {
  let resolver: BusinessUpdatesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BusinessUpdatesResolver],
    }).compile();

    resolver = module.get<BusinessUpdatesResolver>(BusinessUpdatesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
