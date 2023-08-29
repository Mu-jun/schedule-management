import { Test, TestingModule } from '@nestjs/testing';
import { TaskService } from './task.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TASK_STATUS, Task } from './entities/task.entity';
import { TaskVo } from './vo/task.vo';
import { MockRepository, mockRepository } from '../Mock/repository.mock';
import { ForbiddenException, NotFoundException } from '@nestjs/common';
import { DeleteResult, UpdateResult } from 'typeorm';

describe('TaskService', () => {
  let service: TaskService;
  let taskRepository: MockRepository<Task>;

  function createTestTask(num: number): Task {
    const task = new Task();
    task.id = num
    task.user_id = `test${num}@example.com`;
    task.title = `test${num} title`;
    task.description = `test${num} description`;
    task.dueDate = new Date();
    task.status = TASK_STATUS.PENDING;
    return task;
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TaskService,
        {
          provide: getRepositoryToken(Task),
          useValue: mockRepository(),
        }
      ],
    }).compile();

    service = module.get<TaskService>(TaskService);
    taskRepository = module.get(getRepositoryToken(Task));
  });

  describe('create', () => {
    it('normal test', async () => {
      // give
      const task1 = createTestTask(1);
      taskRepository.save.mockReturnValue(task1);

      const taskVo1 = new TaskVo(task1);
      const { id, ...dto } = taskVo1;

      // when
      const result = await service.create(dto);

      // then
      expect(result).toStrictEqual(task1);
    })
  })

  describe('findAllByUserId', () => {
    it('normal test', async () => {
      // give
      const task1 = createTestTask(1);
      taskRepository.findBy.mockReturnValue([task1]);

      // when
      const result = await service.findAllByUserId(task1.user_id)

      // then
      expect(result).toStrictEqual([task1]);
    })
  })

  describe('findOne', () => {
    it('normal test', async () => {
      // give
      const task1 = createTestTask(1);
      taskRepository.findOneBy.mockReturnValue(task1);

      // when
      const result = await service.findOne(task1.id)

      // then
      expect(result).toStrictEqual(task1);
    })

    it('NotFoundException test', async () => {
      // give
      const id = 1;
      taskRepository.findOneBy.mockReturnValue(null);

      expect(async () => {
        // when
        const result = await service.findOne(id);

        // then
      }).rejects.toThrowError(new NotFoundException(`Task with ID-${id} not found.`));
    })
  })

  describe('update', () => {
    it('normal test', async () => {
      // give
      const task1 = createTestTask(1);
      const { id, ...dto } = new TaskVo(task1);
      const updateResult:UpdateResult = new UpdateResult();
      updateResult.affected = 1;
      taskRepository.update.mockReturnValue(updateResult);

      // when
      const result = await service.update(id, dto);

      // then
      expect(result).toStrictEqual(undefined);
    })

    it('NotFoundException test', async () => {
      // give
      const task1 = createTestTask(1);
      const { id, ...dto } = new TaskVo(task1);
      const updateResult:UpdateResult = new UpdateResult();
      updateResult.affected = 0;
      taskRepository.update.mockReturnValue(updateResult);

      expect(async () => {
        // when
        const result = await service.update(id, dto);

        // then
      }).rejects.toThrowError(new NotFoundException(`Task with ID-${id} not found.`));
    })
  })

  describe('remove', () => {
    it('normal test', async () => {
      // give
      const task1 = createTestTask(1);
      const deleteResult:DeleteResult = new DeleteResult();
      deleteResult.affected = 1;
      taskRepository.findOneBy.mockReturnValue(task1);
      taskRepository.delete.mockReturnValue(deleteResult);

      // when
      const result = await service.remove(task1.id, task1.user_id);

      // then
      expect(result).toStrictEqual(undefined);
    })

    it('NotFoundException test', async () => {
      // give
      const task1 = createTestTask(1);
      const { id, ...dto } = new TaskVo(task1);
      taskRepository.findOneBy.mockReturnValue(null);

      expect(async () => {
        // when
        const result = await service.remove(id, task1.user_id);

        // then
      }).rejects.toThrowError(new NotFoundException(`Task with ID-${id} not found.`));
    })

    it('ForbiddenException test', async () => {
      // give
      const task1 = createTestTask(1);
      const task2 = createTestTask(2);
      taskRepository.findOneBy.mockReturnValue(task1);

      expect(async () => {
        // when
        const result = await service.remove(task1.id, task2.user_id);

        // then
      }).rejects.toThrowError(new ForbiddenException("담당자가 아닙니다."));
    })
  })
});
