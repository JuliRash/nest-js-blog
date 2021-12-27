import { ApiProperty } from '@nestjs/swagger';
import { IsAlphanumeric, IsNotEmpty, MinLength } from 'class-validator';

export class AuthUserDto {
  @ApiProperty()
  @IsNotEmpty()
  username: string;

  @ApiProperty()
  @IsAlphanumeric()
  @MinLength(8)
  @IsNotEmpty()
  password: string;
}
