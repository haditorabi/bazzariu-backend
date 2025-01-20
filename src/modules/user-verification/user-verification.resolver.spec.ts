import { Test, TestingModule } from '@nestjs/testing';
import { UserVerificationResolver } from './user-verification.resolver';

describe('UserVerificationResolver', () => {
  let resolver: UserVerificationResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserVerificationResolver],
    }).compile();

    resolver = module.get<UserVerificationResolver>(UserVerificationResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
