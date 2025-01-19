import { Test, TestingModule } from '@nestjs/testing';
import { UserBlockedResolver } from './user-blocked.resolver';

describe('UserBlockedResolver', () => {
  let resolver: UserBlockedResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserBlockedResolver],
    }).compile();

    resolver = module.get<UserBlockedResolver>(UserBlockedResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
