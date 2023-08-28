import { ExecutionContext, Injectable, Logger, UnauthorizedException } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  private logger = new Logger(JwtAuthGuard.name);

  canActivate(context: ExecutionContext) {
    this.logger.debug("Jwt guard activate");
    return super.canActivate(context);
  }

  handleRequest(err: Error, user: any, info: any, context: ExecutionContext, status?: any) {
    this.logger.debug("handle request");
    if (err) {
      this.logger.error(err.message);
      throw new UnauthorizedException("토큰 검증 실패");
    } else if (info) {
      throw new Error(info);
    }
    this.logger.debug(user);
    return user;
  }
}