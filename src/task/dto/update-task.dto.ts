import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateTaskDto } from './create-task.dto';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {

  @ApiProperty({
    description: '일정을 수행할 사람의 이메일',
    required: false
  })
  user_id: string
}
