import { Test, TestingModule } from '@nestjs/testing';
import { ProvinceResolver } from './province.resolver';

describe('ProvinceResolver', () => {
  let resolver: ProvinceResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProvinceResolver],
    }).compile();

    resolver = module.get<ProvinceResolver>(ProvinceResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
