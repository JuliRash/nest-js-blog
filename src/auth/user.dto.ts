import { IsAlphanumeric, IsNotEmpty, MinLength } from 'class-validator';

export class AuthUserDto {
  @IsNotEmpty()
  username: string;

  @IsAlphanumeric()
  @MinLength(8)
  @IsNotEmpty()
  password: string;
}
