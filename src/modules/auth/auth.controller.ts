import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @Post('register')
  async register(
    @Body() body: { email: string; password: string; name: string },
  ) {
    const hashedPassword = await this.authService.hashPassword(body.password);
    const user = await this.userService.createUser({
      email: body.email,
      password: hashedPassword,
      name: body.name,
    });
    return this.authService.generateToken({
      id: user.id,
      email: user.email,
      name: user.name,
    });
  }

  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    const user = await this.userService.findUserByEmail(body.email);
    if (
      !user ||
      !(await this.authService.comparePasswords(body.password, user.password))
    ) {
      throw new Error('Invalid credentials');
    }
    return this.authService.generateToken({
      id: user.id,
      email: user.email,
      name: user.name,
    });
  }
}

// @Controller('protected')
// export class ProtectedController {
//   @UseGuards(JwtAuthGuard)
//   @Get()
//   getProtectedData() {
//     return { message: 'This is protected data.' };
//   }
// }
