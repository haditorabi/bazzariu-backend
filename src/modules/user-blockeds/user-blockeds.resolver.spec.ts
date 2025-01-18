import { Test, TestingModule } from '@nestjs/testing';
import { UserBlockedsResolver } from './user-blockeds.resolver';

describe('UserBlockedsResolver', () => {
  let resolver: UserBlockedsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserBlockedsResolver],
    }).compile();

    resolver = module.get<UserBlockedsResolver>(UserBlockedsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
