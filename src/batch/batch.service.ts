import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Task } from 'src/task/entities/task.entity';
import { Between, DataSource, Repository } from 'typeorm';

@Injectable()
export class BatchService {
  constructor(
    private dataSource: DataSource,
    private configService: ConfigService,
  ) { }
  private readonly batchTargetUrl: string = this.configService.get("BATCH_TARGET_URL");
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

    this.logger.log(`send task to ${this.batchTargetUrl}`)
    this.logger.log(`${startRangeDate} ~ ${endRangeDate}`)
    this.logger.log(`task count: ${targetTaskList.length}`)

    fetch(this.batchTargetUrl, {
      method: "post",
      body: JSON.stringify(targetTaskList)
    }).then(result => {
      this.logger.log("-----send task result-----");
      this.logger.log(result)
    }).catch(err => {
      this.logger.error("-----send task error-----");
      this.logger.error(err)
    })
  }
}
