import { Test, TestingModule } from '@nestjs/testing';
import { PaymentsMethodsResolver } from './payments-methods.resolver';

describe('PaymentsMethodsResolver', () => {
  let resolver: PaymentsMethodsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PaymentsMethodsResolver],
    }).compile();

    resolver = module.get<PaymentsMethodsResolver>(PaymentsMethodsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
