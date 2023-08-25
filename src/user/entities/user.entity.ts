import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity("member")
export class User {
  @PrimaryColumn({
    length: 100
  })
  @ApiProperty({
    description: '이메일 아이디'
  })
  user_id: string;

  @Column({
    length: 45
  })
  @ApiProperty({
    description: '이름'
  })
  name: string;

  @Column({
    length: 255
  })
  @ApiProperty({
    description: '비밀번호'
  })
  password: string;
}
