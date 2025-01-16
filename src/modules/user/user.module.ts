import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { PrismaModule } from '../prisma/prisma.module'; // Adjust path as needed

@Module({
  imports: [PrismaModule], // Import PrismaModule to use PrismaService
  providers: [UserService],
  exports: [UserService], // Export UserService for other modules
})
export class UserModule {}
