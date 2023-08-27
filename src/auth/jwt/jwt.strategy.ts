import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { EnvKey } from "src/cofig/config.validator";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get(EnvKey.JWT_SECRET),
      ignoreExpiration: false,
    });
  }

  async validate(payload: any) {
    const user = payload.exp > Date.now();

    if (user) {
      return payload;
    } else {
      throw new Error("만료된 토큰입니다.");
    }
  }
}