import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from 'src/auth/dto/signin-user.dto';
import { ApiCreatedResponse, ApiOperation, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { TokenVo } from './token/token.vo';

@ApiTags('인증 API')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post('login')
  @ApiOperation({
    summary: '로그인 API',
    description: '로그인 정보를 검증하고 액세스 토큰을 생성하여 반환한다.'
  })
  @ApiCreatedResponse({ description: '로그인 성공', type: TokenVo })
  @ApiUnauthorizedResponse({ description: '로그인 실패' })
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto);
  }
}
