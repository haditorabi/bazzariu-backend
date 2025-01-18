import { Test, TestingModule } from '@nestjs/testing';
import { UserActionsResolver } from './user-actions.resolver';

describe('UserActionsResolver', () => {
  let resolver: UserActionsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserActionsResolver],
    }).compile();

    resolver = module.get<UserActionsResolver>(UserActionsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
