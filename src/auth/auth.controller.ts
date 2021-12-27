import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthUserDto } from './user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('/sign-up')
  signUp(@Body() authUserDto: AuthUserDto) {
    return this.authService.createUser(authUserDto);
  }

  @Post('/sign-in')
  signIn(@Body() authUserDto: AuthUserDto) {
    return this.authService.signIn(authUserDto);
  }
}
