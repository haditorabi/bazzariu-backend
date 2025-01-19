import { Test, TestingModule } from '@nestjs/testing';
import { BusinessAmenityResolver } from './business-amenity.resolver';

describe('BusinessAmenityResolver', () => {
  let resolver: BusinessAmenityResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BusinessAmenityResolver],
    }).compile();

    resolver = module.get<BusinessAmenityResolver>(BusinessAmenityResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
