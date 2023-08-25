import { UseGuards, applyDecorators } from "@nestjs/common";
import { ApiForbiddenResponse } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/auth/jwt/jwt.guard";

export function JwtAuth() {
  return applyDecorators(
    UseGuards(JwtAuthGuard),
    ApiForbiddenResponse({ description: '로그인 필요' })
  )
}