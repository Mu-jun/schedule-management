import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class SignInDto {
  @ApiProperty({
    description: '이메일 아이디'
  })
  @IsEmail()
  user_id: string;

  @ApiProperty({
    description: '비밀번호'
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
