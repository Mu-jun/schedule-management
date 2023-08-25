import { ConfigModuleOptions } from "@nestjs/config";
import * as Joi from "joi";

export enum EnvKey {
  DB_HOST = "DB_HOST",
  DB_PORT = "DB_PORT",
  DB_USERNAME = "DB_USERNAME",
  DB_PASSWORD = "DB_PASSWORD"  ,
  BATCH_TARGET_URL = "BATCH_TARGET_URL",
  JWT_SECRET = "JWT_SECRET",
}

export const CONFIG_VALIDATOR: ConfigModuleOptions = {
  envFilePath: `.${process.env.NODE_ENV}.env`,
  validationSchema: Joi.object({
    DB_HOST: Joi.string().required(),
    DB_PORT: Joi.number(),
    DB_USERNAME: Joi.string().required(),
    DB_PASSWORD: Joi.string().required(),
    BATCH_TARGET_URL: Joi.string().required()
  }),
  isGlobal: true,
}