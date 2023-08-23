import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";
import { task } from "src/schedule/entity/task.entity";

@Injectable()
export class typeORMConfig implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}
  
  createTypeOrmOptions(): TypeOrmModuleOptions {
      return {
        type: "mysql",
        host: this.configService.get("DB_HOST"),
        port: this.configService.get<number>("DB_PORT") | 3306,
        username: this.configService.get("DB_USERNAME"),
        password: this.configService.get("DB_PASSWORD"),
        database: "schedule",
        entities: [task],
        synchronize: false,
        logging: true,
      }
  }  
}