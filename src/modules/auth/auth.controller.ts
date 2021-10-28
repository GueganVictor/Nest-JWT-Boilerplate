import { Controller, Post, Body } from '@nestjs/common';
import { CreateUserDto, SignInUserDto } from '../../lib/dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signUp(@Body() payload: CreateUserDto) {
    return this.authService.createAccount(payload);
  }

  @Post('signin')
  async signIn(@Body() payload: SignInUserDto) {
    return this.authService.login(payload);
  }
}
