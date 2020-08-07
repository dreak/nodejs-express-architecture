import Dotenv from 'dotenv';
import Joi from 'joi';
import { Config } from './config.interface';

Dotenv.config();

const envSchema = Joi.object().keys({
  NODE_ENV: Joi.string().required(),
  PORT: Joi.number().required(),
  MYSQL_HOST: Joi.string().required(),
  MYSQL_PORT: Joi.number().required(),
  MYSQL_USER_ID: Joi.string().required(),
  MYSQL_PASSWORD: Joi.string().required(),
  MYSQL_DATABASE: Joi.string().required()
});

const result = envSchema.validate(process.env);

export const config = result.value as Config;
