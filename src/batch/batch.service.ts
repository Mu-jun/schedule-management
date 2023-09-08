import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom, map } from 'rxjs';
import { EnvKey } from 'src/cofig/config.validator';
import { Task } from 'src/task/entities/task.entity';
import { TaskService } from 'src/task/task.service';

@Injectable()
export class BatchService {
  constructor(
    @InjectRepository(Task)
    private taskService: TaskService,
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) { }
  private readonly batchTargetUrl: string = this.configService.get(EnvKey.BATCH_TARGET_URL);
  private readonly logger = new Logger(BatchService.name);

  @Cron(
    // '*/10 * * * * *',
    CronExpression.EVERY_DAY_AT_8AM,
    {
      name: "send_task_before_one_day"
    }
  )
  async handleCron() {

    const targetTaskList = await this.taskService.taskDueTomorrow();
    this.logger.debug(`task count: ${targetTaskList.length}`)

    const result = await firstValueFrom(
      this.httpService.post(this.batchTargetUrl, targetTaskList).pipe(
        map(resp => {
          this.logger.log("-----send task result-----");
          this.logger.log(resp.data);
          return resp.data;
        }),
        catchError((err: AxiosError) => {
          this.logger.error("-----send task error-----");
          this.logger.error(err);
          throw 'An error happened!';
        })
      )
    )
  }
}
