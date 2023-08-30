import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";
import { Task } from "src/task/entities/task.entity";
import { User } from "src/user/entities/user.entity";
import { EnvKey } from "./config.validator";

@Injectable()
export class typeORMConfig implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}
  
  createTypeOrmOptions(): TypeOrmModuleOptions {
      return {
        type: "mysql",
        host: this.configService.get(EnvKey.DB_HOST),
        port: this.configService.get<number>(EnvKey.DB_PORT) | 3306,
        username: this.configService.get(EnvKey.DB_USERNAME),
        password: this.configService.get(EnvKey.DB_PASSWORD),
        database: "schedule",
        entities: [Task, User],
        synchronize: false,
        logging: true,
      }
  }  
}


@Injectable()
export class typeORMTestConfig implements TypeOrmOptionsFactory {
  createTypeOrmOptions(): TypeOrmModuleOptions {
      return {
        type: "sqlite",
        database: ":memory:",
        dropSchema: true,
        entities: [Task, User],
        synchronize: true,
        logging: false,
      }
  }  
}