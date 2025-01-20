import { Module } from '@nestjs/common';
import { UserWalletService } from './user-wallet.service';
import { UserWalletResolver } from './user-wallet.resolver';

@Module({
  providers: [UserWalletService, UserWalletResolver]
})
export class UserWalletModule {}
