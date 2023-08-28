import { ApiProperty } from "@nestjs/swagger"
import { TASK_STATUS, Task } from "../entities/task.entity"

export class TaskVo {
  constructor(taskEntity: Task) {
    this.id = taskEntity.id;
    this.title = taskEntity.title;
    this.user_id = taskEntity.user_id;
    this.description = taskEntity.description;
    this.dueDate = taskEntity.dueDate.toISOString()
      .replace("T", " ").slice(0, 16);
  }

  @ApiProperty({ description: '유니크 아이디' })
  id: number

  @ApiProperty({ description: '제목' })
  title: string

  @ApiProperty({
    description: '일정을 수행할 사람의 이메일',
    format: 'Email',
    example: 'test@example.com',
  })
  user_id: string

  @ApiProperty({ description: '설명', required: false })
  description: string

  @ApiProperty({
    description: 'task의 상태',
    enum: TASK_STATUS,
  })
  status: TASK_STATUS

  @ApiProperty({
    description: '완료 날짜',
    format: 'YYYY-MM-DD HH:mm',
    example: '2023-08-01 00:00',
  })
  dueDate: string
}