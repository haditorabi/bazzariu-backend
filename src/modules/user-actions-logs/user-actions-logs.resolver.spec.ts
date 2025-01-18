import { Test, TestingModule } from '@nestjs/testing';
import { UserActionsLogsResolver } from './user-actions-logs.resolver';

describe('UserActionsLogsResolver', () => {
  let resolver: UserActionsLogsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserActionsLogsResolver],
    }).compile();

    resolver = module.get<UserActionsLogsResolver>(UserActionsLogsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
