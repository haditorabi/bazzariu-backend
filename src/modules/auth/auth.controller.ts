import { Body, Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';
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
    @Body()
    body: {
      email: string;
      password: string;
      name: string;
      status: string;
    },
  ) {
    const hashedPassword = await this.authService.hashPassword(body.password);
    const user = await this.userService.create({
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
  async login(
    @Body() body: { email: string; password: string },
    @Res() res: Response,
  ) {
    const user = await this.userService.findUserByEmail(body.email);
    if (
      !user ||
      !(await this.authService.comparePasswords(body.password, user.password))
    ) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = await this.authService.generateToken({
      id: user.id,
      email: user.email,
      name: user.name,
    });
    return res.status(200).json({ message: 'Login successful', token });
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
