import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { BatchService } from './batch.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from 'src/task/entities/task.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Task]),
    HttpModule,
  ],
  providers: [BatchService],
})
export class BatchModule { }
