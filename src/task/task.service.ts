import { ForbiddenException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, DeleteResult, Repository, UpdateResult } from 'typeorm';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) { }

  private logger = new Logger(TaskService.name);

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const task = await this.taskRepository.save(createTaskDto);
    return task;
  }

  async findAllByUserId(user_id: string): Promise<Task[]> {
    return await this.taskRepository.findBy({ user_id: user_id });
  }

  async findOne(id: number): Promise<Task> {
    const task = await this.taskRepository.findOneBy({ id: id });
    if (!task) {
      throw new NotFoundException(`Task with ID-${id} not found.`)
    }
    return task;
  }

  async update(id: number, updateTaskDto: UpdateTaskDto): Promise<void> {
    const result: UpdateResult = await this.taskRepository.update(id, updateTaskDto);
    if (result.affected == 0) {
      throw new NotFoundException(`Task with ID-${id} not found.`)
    }
  }

  async remove(id: number, user_id: string): Promise<void> {
    const task = await this.taskRepository.findOneBy({ id: id });
    if (!task) {
      throw new NotFoundException(`Task with ID-${id} not found.`)
    } else if (task.user_id != user_id) {
      throw new ForbiddenException("담당자가 아닙니다.")
    }
    const result: DeleteResult = await this.taskRepository.delete(id);
    // if (result.affected > 1) {
    //   throw new Error("!?!?")
    // }
  }

  async taskDueTomorrow(nowDate: Date = new Date()): Promise<Task[]> {
    const nowYear: number = nowDate.getFullYear()
    const nowMonth: number = nowDate.getMonth()
    const nowDayOfMonth: number = nowDate.getDate()

    const startRangeDate = new Date(nowYear, nowMonth, nowDayOfMonth + 1)
    const endRangeDate = new Date(nowYear, nowMonth, nowDayOfMonth + 2)

    this.logger.debug(`${startRangeDate} ~ ${endRangeDate}`)
    
    return await this.taskRepository.findBy({
      dueDate: Between(startRangeDate, endRangeDate),
    })
  }
}
