import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiForbiddenResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ReqUserId } from './../common/decorators/req.decorator';
import { TaskVo } from './vo/task.vo';
import { JwtAuth } from './../common/decorators/jwt.decorator';

@Controller('task')
@ApiTags('일정 API')
export class TaskController {
  constructor(private readonly taskService: TaskService) { }

  @JwtAuth()
  @Post()
  @ApiOperation({
    summary: '일정 생성 API',
    description: '새로운 일정을 등록하는 API'
  })
  @ApiCreatedResponse({
    description: '일정을 생성한다.',
    type: TaskVo,
  })
  @ApiBadRequestResponse({
    description: 'request body validation 실패',
  })
  create(
    @Body() createTaskDto: CreateTaskDto,
    @ReqUserId() user_id: string
  ): Promise<TaskVo> {
    createTaskDto.user_id = user_id
    return this.taskService.create(createTaskDto).then(task => new TaskVo(task));
  }

  @JwtAuth()
  @Get()
  @ApiOperation({
    summary: '유저별 일정목록 조회 API',
    description: '유저 별로 자신의 일정 목록을 불러오는 API'
  })
  @ApiOkResponse({
    description: '조회 성공',
    type: [TaskVo],
  })
  findAllByUserId(@ReqUserId() user_id: string): Promise<TaskVo[]> {
    return this.taskService.findAllByUserId(user_id)
      .then(taskList => taskList.map(task => new TaskVo(task)));
  }

  @JwtAuth()
  @Get(':id')
  @ApiOperation({
    summary: '일정 상제조회 API',
    description: '특정 id에 해당하는 Task의 상세 정보를 불러오는 API'
  })
  @ApiOkResponse({
    description: '조회 성공',
    type: TaskVo,
  })
  @ApiNotFoundResponse({ description: 'Id가 존재하지 않음' })
  findOne(@Param('id') id: number): Promise<TaskVo> {
    return this.taskService.findOne(id).then(task => new TaskVo(task));
  }

  @JwtAuth()
  @Patch(':id')
  @ApiOperation({
    summary: '일정 수정 API',
    description: '기존 일정을 업데이트 하는 API'
  })
  @ApiOkResponse({ description: '수정 성공' })
  @ApiBadRequestResponse({
    description: 'request body validation 실패',
  })
  @ApiNotFoundResponse({ description: 'Id가 존재하지 않음' })
  update(
    @Param('id') id: number,
    @Body() updateTaskDto: UpdateTaskDto,
    @ReqUserId() user_id,
  ): Promise<void> {
    // updateTaskDto.user_id = user_id
    return this.taskService.update(id, updateTaskDto);
  }

  @JwtAuth()
  @Delete(':id')
  @ApiOperation({
    summary: '일정 삭제 API',
    description: '기존 일정을 삭제하는 API'
  })
  @ApiOkResponse({ description: '삭제 성공' })
  @ApiForbiddenResponse({ description: '담당자가 아닙니다.' })
  @ApiNotFoundResponse({ description: 'Id가 존재하지 않음' })
  remove(@Param('id') id: number, @ReqUserId() user_id: string): Promise<void> {
    return this.taskService.remove(id, user_id);
  }
}
