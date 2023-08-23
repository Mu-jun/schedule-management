import { Module } from '@nestjs/common';
import { ScheduleModule } from './schedule/schedule.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from 'src/cofig/typeorm.config';
import { CONFIG_VALIDATOR } from './cofig/config.validator';

@Module({
  imports: [
    ConfigModule.forRoot(CONFIG_VALIDATOR),
    TypeOrmModule.forRootAsync({
      useClass: typeORMConfig,
    }),
    ScheduleModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
