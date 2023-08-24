import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from 'src/cofig/typeorm.config';
import { CONFIG_VALIDATOR } from './cofig/config.validator';
import { TaskModule } from './task/task.module';
import { ScheduleModule } from '@nestjs/schedule';
import { BatchModule } from './batch/batch.module';

@Module({
  imports: [
    ConfigModule.forRoot(CONFIG_VALIDATOR),
    TypeOrmModule.forRootAsync({
      useClass: typeORMConfig,
    }),
    ScheduleModule.forRoot(),
    TaskModule,
    BatchModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
