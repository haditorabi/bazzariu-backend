import { Test, TestingModule } from '@nestjs/testing';
import { UserActionLogResolver } from './user-action-log.resolver';

describe('UserActionLogResolver', () => {
  let resolver: UserActionLogResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserActionLogResolver],
    }).compile();

    resolver = module.get<UserActionLogResolver>(UserActionLogResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
