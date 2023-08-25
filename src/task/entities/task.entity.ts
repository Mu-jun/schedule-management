import { ApiProperty } from "@nestjs/swagger"
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

export enum TASK_STATUS {
  PENDING = "Pending",
  IS_PROGRESS = "IsProgress",
  COMPLETED = "Completed"
}

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: '유니크 아이디' })
  id: number

  @Column({
    length: 100
  })
  @ApiProperty({ description: '제목' })
  title: string

  @Column({
    length: 100
  })
  @ApiProperty({
    description: '일정을 수행할 사람의 이메일',
    format: 'Email',
    example: 'test@example.com',
  })
  user_id: string

  @Column({
    length: 500
  })
  @ApiProperty({ description: '설명', required: false })
  description: string

  @Column({
    length: 50
  })
  @ApiProperty({
    description: 'task의 상태',
    enum: TASK_STATUS,
  })
  status: TASK_STATUS

  @Column()
  @ApiProperty({
    description: '완료 날짜',
    format: 'YYYY-MM-DD HH:mm',
    example: '2023-08-01 00:00',
  })
  dueDate: Date
}