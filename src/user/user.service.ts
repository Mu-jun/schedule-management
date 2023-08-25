import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { DataSource } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    private dataSource: DataSource,
  ) { }
  private userRepository = this.dataSource.getRepository(User);

  async signup(createUserDto: CreateUserDto): Promise<void> {
    const user = await this.findOne(createUserDto.user_id);
    if (user) {
      throw new ConflictException("이메일이 이미 존재합니다.")
    }
    const { password, ...result } = await this.userRepository.save(createUserDto);
    // return result
  }

  async findOne(user_id: string): Promise<User> {
    const user = await this.userRepository.findOneBy({ user_id: user_id });
    return user;
  }
}
