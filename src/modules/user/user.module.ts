import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { PrismaModule } from '../prisma/prisma.module'; // Adjust path as needed
import { UserResolver } from './user.resolver';

@Module({
  imports: [PrismaModule], // Import PrismaModule to use PrismaService
  providers: [UserService, UserResolver],
  exports: [UserService], // Export UserService for other modules
})
export class UserModule {}
