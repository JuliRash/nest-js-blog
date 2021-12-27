import { EntityRepository, Repository } from 'typeorm';
import { AuthUserDto } from './user.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
  async createUser(authUserDto: AuthUserDto) {
    const { username, password } = authUserDto;

    const salt = await bcrypt.genSalt();

    const hashedPassword = await bcrypt.hash(password, salt);

    const user = this.create({ username, password: hashedPassword });

    try {
      await this.save(user);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('username already taken');
      } else {
        throw new InternalServerErrorException();
      }
    }

    return user;
  }
}
