import { Module } from '@nestjs/common';
import { PaymentsMethodsService } from './payments-methods.service';
import { PaymentsMethodsResolver } from './payments-methods.resolver';

@Module({
  providers: [PaymentsMethodsService, PaymentsMethodsResolver]
})
export class PaymentsMethodsModule {}
