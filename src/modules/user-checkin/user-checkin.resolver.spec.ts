import { Test, TestingModule } from '@nestjs/testing';
import { UserCheckinResolver } from './user-checkin.resolver';

describe('UserCheckinResolver', () => {
  let resolver: UserCheckinResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserCheckinResolver],
    }).compile();

    resolver = module.get<UserCheckinResolver>(UserCheckinResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
