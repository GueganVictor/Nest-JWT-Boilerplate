import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;
  @IsNotEmpty()
  password: string;
}

export class SignInUserDto {
  @IsEmail()
  email: string;
  @IsNotEmpty()
  password: string;
}
