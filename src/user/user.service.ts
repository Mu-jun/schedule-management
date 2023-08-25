import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { SignInDto } from '../auth/dto/signin-user.dto';
import { TokenService } from 'src/auth/token/token.service';
import { DataSource } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    private dataSource: DataSource,
  ) {}
  private userRepository = this.dataSource.getRepository(User);

  signup(createUserDto: CreateUserDto) {
    const user = this.findOne(createUserDto.user_id);
    if (user) {
      throw new ConflictException("이메일이 이미 존재합니다.")
    }
    return this.userRepository.save(createUserDto);;
  }

  signin(signinUserDto: SignInDto) {
    const user = this.findOne(signinUserDto.user_id);
    if (!user) {
      throw new NotFoundException("존재하지 않는 이메일입니다.")
    }
    return 'This action adds a new user';
  }

  async findOne(user_id: string): Promise<User> {
    const user = await this.userRepository.findOneBy({ user_id: user_id});
    return user;
  }
}
