import { Module } from '@nestjs/common';
import { PaymentMethodService } from './payment-method.service';
import { PaymentMethodResolver } from './payment-method.resolver';

@Module({
  providers: [PaymentMethodService, PaymentMethodResolver],
})
export class PaymentMethodModule {}
