import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class User {
  @PrimaryColumn()
  @ApiProperty({
    description: '이메일 아이디'
  })
  user_id: string;

  @Column()
  @ApiProperty({
    description: '이름'
  })
  name: string;

  @Column()
  @ApiProperty({
    description: '비밀번호'
  })
  password: string;
}
