import { Test, TestingModule } from '@nestjs/testing';
import { UserActionResolver } from './user-action.resolver';

describe('UserActionResolver', () => {
  let resolver: UserActionResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserActionResolver],
    }).compile();

    resolver = module.get<UserActionResolver>(UserActionResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
