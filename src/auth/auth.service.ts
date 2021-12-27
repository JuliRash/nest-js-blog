import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthUserDto } from './user.dto';
import { UsersRepository } from './users.repository';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { jwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UsersRepository)
    private usersRepository: UsersRepository,
    private jwtService: JwtService,
  ) {}
  async createUser(authUserDto: AuthUserDto) {
    return await this.usersRepository.createUser(authUserDto);
  }

  async signIn(authUserDto: AuthUserDto): Promise<{ accessToken: string }> {
    const { username, password } = authUserDto;

    const user = await this.usersRepository.findOne({ username });

    const decryptedPassword = await bcrypt.compare(password, user.password);

    if (user && decryptedPassword) {
      const payload: jwtPayload = { username };
      const accessToken: string = await this.jwtService.sign(payload);
      return { accessToken };
    } else {
      throw new UnauthorizedException('check your login details');
    }
  }
}
