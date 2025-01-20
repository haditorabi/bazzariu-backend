import { Module } from '@nestjs/common';
import { UserWalletService } from './user-wallet.service';
import { UserWalletResolver } from './user-wallet.resolver';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [UserWalletService, UserWalletResolver]
})
export class UserWalletModule {}
