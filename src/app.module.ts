import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from './cofig/typeorm.config';
import { CONFIG_VALIDATOR } from './cofig/config.validator';
import { TaskModule } from './task/task.module';
import { ScheduleModule } from '@nestjs/schedule';
import { BatchModule } from './batch/batch.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot(CONFIG_VALIDATOR),
    TypeOrmModule.forRootAsync({
      useClass: typeORMConfig,
    }),
    ScheduleModule.forRoot(),
    TaskModule,
    BatchModule,
    UserModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
