import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { EnvKey } from "../../cofig/config.validator";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: configService.get(EnvKey.JWT_SECRET),
    });
  }

  async validate(payload: any) {
    if (payload.exp > Date.now()) {
      return payload;
    } else {
      throw new Error(`iat:${payload.iat} exp:${payload.exp} now:${Date.now()}`);
    }
  }
}