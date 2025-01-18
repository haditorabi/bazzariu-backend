import { Test, TestingModule } from '@nestjs/testing';
import { UserCheckinsResolver } from './user-checkins.resolver';

describe('UserCheckinsResolver', () => {
  let resolver: UserCheckinsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserCheckinsResolver],
    }).compile();

    resolver = module.get<UserCheckinsResolver>(UserCheckinsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
