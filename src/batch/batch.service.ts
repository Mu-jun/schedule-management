import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cron, CronExpression } from '@nestjs/schedule';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom, map } from 'rxjs';
import { EnvKey } from 'src/cofig/config.validator';
import { Task } from 'src/task/entities/task.entity';
import { Between, DataSource, Repository } from 'typeorm';

@Injectable()
export class BatchService {
  constructor(
    private readonly dataSource: DataSource,
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) { }
  private readonly batchTargetUrl: string = this.configService.get(EnvKey.BATCH_TARGET_URL);
  private readonly logger = new Logger(BatchService.name);
  private taskRepository: Repository<Task> = this.dataSource.getRepository(Task);

  @Cron(
    // '*/10 * * * * *',
    CronExpression.EVERY_DAY_AT_8AM,
    {
      name: "send_task_before_one_day"
    }
  )
  async handleCron() {
    const nowDate: Date = new Date();
    const nowYear: number = nowDate.getFullYear()
    const nowMonth: number = nowDate.getMonth()
    const nowDayOfMonth: number = nowDate.getDate()

    const startRangeDate = new Date(nowYear, nowMonth, nowDayOfMonth + 1)
    const endRangeDate = new Date(nowYear, nowMonth, nowDayOfMonth + 2)

    const targetTaskList = await this.taskRepository.findBy({
      dueDate: Between(startRangeDate, endRangeDate),
    })

    this.logger.debug(`send task to ${this.batchTargetUrl}`)
    this.logger.debug(`${startRangeDate} ~ ${endRangeDate}`)
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
