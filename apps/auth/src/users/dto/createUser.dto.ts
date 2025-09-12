import { IsEmail, IsString, IsStrongPassword } from 'class-validator';

export class CreateUserDto {
  @IsStrongPassword()
  password: string;

  @IsEmail()
  email: string;
}
