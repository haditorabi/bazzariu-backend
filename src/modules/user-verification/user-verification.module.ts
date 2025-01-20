import { Module } from '@nestjs/common';
import { UserVerificationService } from './user-verification.service';
import { UserVerificationResolver } from './user-verification.resolver';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [UserVerificationService, UserVerificationResolver]
})
export class UserVerificationModule {}
