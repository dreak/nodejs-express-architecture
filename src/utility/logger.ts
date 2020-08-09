import winston from 'winston';
import { EnvConfig } from '../config/env-config';

export class Logger {
  private logger: winston.Logger;

  constructor(private readonly envConfig: EnvConfig) {}

  public getLogger() {
    if (this.logger === undefined) {
      this.createLogger();
    }
    return this.logger;
  }

  private createLogger() {
    this.logger = winston.createLogger();

    const config = this.envConfig.getEnvConfig();
    if (config.NODE_ENV === 'development') {
      this.logger.add(
        new winston.transports.Console({
          format: winston.format.simple(),
          level: 'debug'
        })
      );
    }
  }
}
