import { ConfigModuleOptions } from "@nestjs/config";
import * as Joi from "joi";

export const CONFIG_VALIDATOR: ConfigModuleOptions = {
  envFilePath: `.${process.env.NODE_ENV}.env`,
  validationSchema: Joi.object({
    DB_HOST: Joi.string().required(),
    DB_PORT: Joi.number(),
    DB_USERNAME: Joi.string().required(),
    DB_PASSWORD: Joi.string().required(),
  }),
  isGlobal: true,
}