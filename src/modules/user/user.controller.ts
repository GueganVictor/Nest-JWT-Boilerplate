import { Controller, UseGuards, Request, Get } from '@nestjs/common';
import { UserDocument } from 'src/lib/entities';
import { JwtAuthGuard } from '../auth/jwt/jwt.guard';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private usersService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async me(@Request() req): Promise<UserDocument> {
    return this.usersService.findOne({ _id: req.user._id });
  }
}
