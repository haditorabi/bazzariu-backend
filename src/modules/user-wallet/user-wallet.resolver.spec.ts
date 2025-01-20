import { Test, TestingModule } from '@nestjs/testing';
import { UserWalletResolver } from './user-wallet.resolver';

describe('UserWalletResolver', () => {
  let resolver: UserWalletResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserWalletResolver],
    }).compile();

    resolver = module.get<UserWalletResolver>(UserWalletResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
