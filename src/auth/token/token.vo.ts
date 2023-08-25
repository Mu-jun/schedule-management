import { ApiProperty } from "@nestjs/swagger";

export class TokenVo {
  @ApiProperty({ description: '접속 인증 토큰' })
  access_token: string
}