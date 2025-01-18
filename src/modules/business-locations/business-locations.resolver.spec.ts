import { Test, TestingModule } from '@nestjs/testing';
import { BusinessLocationsResolver } from './business-locations.resolver';

describe('BusinessLocationsResolver', () => {
  let resolver: BusinessLocationsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BusinessLocationsResolver],
    }).compile();

    resolver = module.get<BusinessLocationsResolver>(BusinessLocationsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
