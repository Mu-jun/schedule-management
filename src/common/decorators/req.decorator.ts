import { ExecutionContext, createParamDecorator } from "@nestjs/common";
import { Payload } from "src/auth/jwt/jwt.payload";

export const ReqUserId = createParamDecorator(
  (context: ExecutionContext) => {
    const reqeust = context.switchToHttp().getRequest();
    const user = reqeust.user as Payload;
    return user.user_id
  }
)
