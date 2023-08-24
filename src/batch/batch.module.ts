import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { BatchService } from './batch.service';

@Module({
  imports: [HttpModule],
  providers: [BatchService],
})
export class BatchModule { }
