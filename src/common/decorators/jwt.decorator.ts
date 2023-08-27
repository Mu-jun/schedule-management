import { UseGuards, applyDecorators } from "@nestjs/common";
import { ApiBearerAuth, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/auth/jwt/jwt.guard";

export function JwtAuth() {
  return applyDecorators(
    UseGuards(JwtAuthGuard),
    ApiBearerAuth('access-token'),
    ApiUnauthorizedResponse({ description: '로그인 필요' }),
  )
}