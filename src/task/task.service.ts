import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) { }

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const task = await this.taskRepository.save(createTaskDto);
    return task;
  }

  async findAll(): Promise<Task[]> {
    return await this.taskRepository.find();
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

  async remove(id: number): Promise<void> {
    const result: DeleteResult = await this.taskRepository.delete(id);
    if (result.affected == 0) {
      throw new NotFoundException(`Task with ID-${id} not found.`)
    }
  }
}
