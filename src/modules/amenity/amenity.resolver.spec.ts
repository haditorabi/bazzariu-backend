import { Test, TestingModule } from '@nestjs/testing';
import { AmenityResolver } from './amenity.resolver';

describe('AmenityResolver', () => {
  let resolver: AmenityResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AmenityResolver],
    }).compile();

    resolver = module.get<AmenityResolver>(AmenityResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
