import { Test, TestingModule } from '@nestjs/testing';
import { UserActionsLogsService } from './user-actions-logs.service';

describe('UserActionsLogsService', () => {
  let service: UserActionsLogsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserActionsLogsService],
    }).compile();

    service = module.get<UserActionsLogsService>(UserActionsLogsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
