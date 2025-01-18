import { Test, TestingModule } from '@nestjs/testing';
import { BusinessTagResolver } from './business-tag.resolver';

describe('BusinessTagResolver', () => {
  let resolver: BusinessTagResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BusinessTagResolver],
    }).compile();

    resolver = module.get<BusinessTagResolver>(BusinessTagResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
