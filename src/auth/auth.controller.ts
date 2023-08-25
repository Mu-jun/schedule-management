import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from 'src/auth/dto/signin-user.dto';
import { ApiCreatedResponse, ApiProperty, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { TokenVo } from './token/token.vo';

@ApiTags('인증 API')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post('login')
  @ApiProperty({ description: '로그인' })
  @ApiCreatedResponse({ description: '로그인 성공', type: TokenVo })
  @ApiUnauthorizedResponse({ description: '로그인 실패' })
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto);
  }
}
