import Dotenv from 'dotenv';
import Joi from 'joi';
import { Config } from './config.interface';

export class EnvConfig {
  private config: Config;

  private loadEnvVariables() {
    Dotenv.config();
  }

  private validateEnvSchema() {
    const envSchema = Joi.object().keys({
      NODE_ENV: Joi.string().required(),
      PORT: Joi.number().required(),
      MYSQL_HOST: Joi.string().required(),
      MYSQL_PORT: Joi.number().required(),
      MYSQL_USER_ID: Joi.string().required(),
      MYSQL_PASSWORD: Joi.string().required(),
      MYSQL_DATABASE: Joi.string().required()
    });

    this.config = envSchema.validate(process.env).value;
  }

  /**
   * get env config from env file
   */
  getEnvConfig() {
    if (this.config === undefined) {
      this.loadEnvVariables();
      this.validateEnvSchema();
    }

    return this.config;
  }
}
