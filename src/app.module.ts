import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from 'src/cofig/typeorm.config';
import { CONFIG_VALIDATOR, EnvKey } from './cofig/config.validator';
import { TaskModule } from './task/task.module';
import { ScheduleModule } from '@nestjs/schedule';
import { BatchModule } from './batch/batch.module';
import { UserModule } from './user/user.module';
import { TokenService } from './auth/token/token.service';
import { JwtModule } from '@nestjs/jwt';
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
