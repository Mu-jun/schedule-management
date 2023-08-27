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
      throw new UnauthorizedException(err.message);
    } else if (info) {
      throw new Error(info);
    }
    return user;
  }
}