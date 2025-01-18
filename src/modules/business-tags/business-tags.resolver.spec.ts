import { Test, TestingModule } from '@nestjs/testing';
import { BusinessTagsResolver } from './business-tags.resolver';

describe('BusinessTagsResolver', () => {
  let resolver: BusinessTagsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BusinessTagsResolver],
    }).compile();

    resolver = module.get<BusinessTagsResolver>(BusinessTagsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
