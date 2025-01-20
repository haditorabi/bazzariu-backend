import { Module } from '@nestjs/common';
import { UserVerificationService } from './user-verification.service';
import { UserVerificationResolver } from './user-verification.resolver';

@Module({
  providers: [UserVerificationService, UserVerificationResolver]
})
export class UserVerificationModule {}
