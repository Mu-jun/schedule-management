import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiConflictResponse, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('유저 API')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post()
  @ApiCreatedResponse({ description: '가입 성공' })
  @ApiConflictResponse({ description: '이미 등록된 유저' })
  signup(@Body() createUserDto: CreateUserDto) {
    this.userService.signup(createUserDto);
  }
}
