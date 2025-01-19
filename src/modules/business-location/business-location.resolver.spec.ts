import { Test, TestingModule } from '@nestjs/testing';
import { BusinessLocationResolver } from './business-location.resolver';

describe('BusinessLocationResolver', () => {
  let resolver: BusinessLocationResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BusinessLocationResolver],
    }).compile();

    resolver = module.get<BusinessLocationResolver>(BusinessLocationResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
