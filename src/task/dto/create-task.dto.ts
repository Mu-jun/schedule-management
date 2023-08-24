import { IsDateString, IsEnum, IsNotEmpty, IsOptional, IsString, MaxLength } from "class-validator"
enum TASK_STATUS {
  PENDING = "Pending",
  IS_PROGRESS = "IsProgress",
  COMPLETED = "Completed"
}

export class CreateTaskDto {
  @IsNotEmpty()
  @IsString()
  title: string

  @IsNotEmpty()
  @IsString()
  user_id: string

  @IsOptional()
  @IsString()
  description: string

  @IsEnum(Object.values(TASK_STATUS))
  status: TASK_STATUS

  @MaxLength(16)
  @IsDateString()
  dueDate: Date
}
