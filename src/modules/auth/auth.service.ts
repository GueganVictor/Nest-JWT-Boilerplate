import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUserDto, SignInUserDto } from '../../lib/dto';

@Injectable()
export class AuthService {
  constructor(private usersService: UserService, private jwtService: JwtService) {}

  async login(payload: SignInUserDto) {
    try {
      const user = await this.usersService.findOne({ email: payload.email });
      if (!user) {
        throw new BadRequestException();
      }
      const isPasswordValid = bcrypt.compareSync(payload.password, user.password);
      if (isPasswordValid) {
        return {
          email: user.email,
          access_token: this.jwtService.sign({
            _id: user._id,
          }),
        };
      } else {
        throw new UnauthorizedException();
      }
    } catch (e) {
      throw new BadRequestException("Email and password aren't matching");
    }
  }

  async createAccount(payload: CreateUserDto) {
    try {
      const pass = bcrypt.hashSync(payload.password, process.env.SALT_ROUNDS);
      const user = await this.usersService.create({
        ...payload,
        password: pass,
      });
      return {
        _id: user._id,
        email: user.email,
        access_token: this.jwtService.sign({
          _id: user._id,
        }),
      };
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
