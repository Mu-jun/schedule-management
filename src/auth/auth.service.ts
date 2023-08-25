import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { SignInDto } from './dto/signin-user.dto';
import { TokenService } from './token/token.service';
import { JwtService } from '@nestjs/jwt';
import { Payload } from './jwt/jwt.payload';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) { }

  async signIn(signInDto: SignInDto): Promise<any> {
    const user = await this.userService.findOne(signInDto.user_id);
    if (user.password !== signInDto.password) {
      throw new UnauthorizedException('비밀번호가 일치하지 않습니다.');
    }

    const payload: Payload = {
      user_id: signInDto.user_id,
      iat: new Date().getTime()
    }
    return {
      access_token: await this.jwtService.signAsync(payload)
    }
  }
}
