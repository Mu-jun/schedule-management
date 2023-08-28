import { ApiProperty } from "@nestjs/swagger"
import { IsDateString, IsEmpty, IsEnum, IsNotEmpty, IsOptional, IsString, MaxLength } from "class-validator"
import { TASK_STATUS } from "../entities/task.entity"

export class CreateTaskDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: '제목' })
  title: string

  @IsEmpty()
  user_id: string

  @IsOptional()
  @IsString()
  @ApiProperty({ description: '설명', required: false })
  description: string

  @IsEnum(Object.values(TASK_STATUS))
  @ApiProperty({
    description: 'task의 상태',
    enum: TASK_STATUS,
  })
  status: TASK_STATUS

  @MaxLength(16)
  @IsDateString()
  @ApiProperty({
    description: '완료 날짜',
    format: 'YYYY-MM-DD HH:mm',
    example: '2023-08-01 00:00',
  })
  dueDate: string
}
