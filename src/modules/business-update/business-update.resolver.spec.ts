import { Test, TestingModule } from '@nestjs/testing';
import { BusinessUpdateResolver } from './business-update.resolver';

describe('BusinessUpdateResolver', () => {
  let resolver: BusinessUpdateResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BusinessUpdateResolver],
    }).compile();

    resolver = module.get<BusinessUpdateResolver>(BusinessUpdateResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
