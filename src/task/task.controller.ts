import { Controller, Get, Post, Body, Patch, Param, Delete, Request, UseGuards, createParamDecorator, ExecutionContext } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiForbiddenResponse, ApiNotFoundResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Task } from './entities/task.entity';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';
import { Payload } from 'src/auth/jwt/jwt.payload';

export const UserIncludeReq = createParamDecorator(
  (key: string, context: ExecutionContext) => {
    const reqeust = context.switchToHttp().getRequest();
    const user = reqeust.user as Payload;
    return key ? user?.[key] : user;
  }
)

@Controller('task')
@ApiTags('일정 API')
export class TaskController {
  constructor(private readonly taskService: TaskService) { }

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiOperation({
    summary: '일정 생성 API',
    description: '새로운 일정을 등록하는 API'
  })
  @ApiCreatedResponse({ description: '일정을 생성한다.', type: Task })
  @ApiBadRequestResponse()
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.taskService.create(createTaskDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiOperation({
    summary: '유저별 일정목록 조회 API',
    description: '유저 별로 자신의 일정 목록을 불러오는 API'
  })
  @ApiForbiddenResponse()
  findAllByUserId(@UserIncludeReq('user_id') user_id) {
    return this.taskService.findAllByUserId(user_id);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @ApiOperation({
    summary: '일정 상제조회 API',
    description: '특정 id에 해당하는 Task의 상세 정보를 불러오는 API'
  })
  @ApiNotFoundResponse()
  findOne(@Param('id') id: number) {
    return this.taskService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @ApiOperation({
    summary: '일정 수정 API',
    description: '기존 일정을 업데이트 하는 API'
  })
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  update(@Param('id') id: number, @Body() updateTaskDto: UpdateTaskDto) {
    return this.taskService.update(id, updateTaskDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ApiOperation({
    summary: '일정 삭제 API',
    description: '기존 일정을 삭제하는 API'
  })
  @ApiNotFoundResponse()
  remove(@Param('id') id: number) {
    return this.taskService.remove(id);
  }
}
