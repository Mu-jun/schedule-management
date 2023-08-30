import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiBadRequestResponse, ApiConflictResponse, ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('유저 API')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post()
  @ApiOperation({
    summary: '유저 생성 API',
    description: '유저 정보를 등록하는 API'
  })
  @ApiCreatedResponse({ description: '가입 성공' })
  @ApiBadRequestResponse({
    description: 'request body validation 실패',
  })
  @ApiConflictResponse({ description: '이미 등록된 유저' })
  async signUp(@Body() createUserDto: CreateUserDto) {
    await this.userService.signUp(createUserDto);
  }
}
