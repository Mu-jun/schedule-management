import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { EnvKey } from 'src/cofig/config.validator';
import { User } from 'src/user/entities/user.entity';
import { Payload } from '../jwt/jwt.payload';

@Injectable()
export class TokenService {
  constructor(
    private configService: ConfigService,
    private jwtService: JwtService,
  ) { }
  private logger = new Logger(TokenService.name)

  private createPayload(user: User) {
    const payload: Payload = {
      user_id: user.user_id,
      iat: Date.now(),
    };
    return payload
  }

  private expiredHour(hour) {
    return 1000 * 60 * 60 * hour
  }

  createAccessToken(user: User): string {
    const payload = this.createPayload(user);
    const options: JwtSignOptions = {
      expiresIn: new Date().getTime() + this.expiredHour(1),
      subject: 'AccessToken',
      secret: this.configService.get(EnvKey.JWT_SECRET)
    };
    try {
      return this.jwtService.sign(payload, options);
    } catch (err) {
      this.logger.error(err);
      throw new Error("Auth - Fail createAccessToken")
    }
  }

  createRefreshToken(user: User): String {
    const payload = this.createPayload(user);
    const options: JwtSignOptions = {
      expiresIn: new Date().getTime() + this.expiredHour(4),
      subject: 'RefreshToken',
      secret: this.configService.get(EnvKey.JWT_SECRET)
    };
    try {
      return this.jwtService.sign(payload, options);
    } catch (err) {
      this.logger.error(err);
      throw new Error("Auth - Fail createRefreshToken")
    }
  }
}
