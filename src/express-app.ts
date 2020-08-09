import bodyParser from 'body-parser';
import compression from 'compression';
import express from 'express';
import helmet from 'helmet';
import { Server } from 'http';
import morgan from 'morgan';
import { EnvConfig } from './config/env-config';
import { RouterRegistry } from './router/router-registry';
import { Logger } from './utility/logger';

export class ExpressApp {
  private app: express.Application;
  private server: Server;

  constructor(
    private readonly envConfig: EnvConfig,
    private readonly logger: Logger,
    private readonly routerRegistry: RouterRegistry
  ) {}

  start() {
    this.app = express();
    this.registerMiddleware();
    this.registerRouter();

    const config = this.envConfig.getEnvConfig();
    this.server = this.app.listen(config.PORT, () => {
      this.logger.getLogger().info(`Server listening on port ${config.PORT}`);
    });
  }

  stop() {
    return new Promise<void>((resolve) => {
      if (this.server !== undefined) {
        this.server.close(() => {
          this.logger.getLogger().info('The server is now closed.');
          resolve();
        });
      }
    });
  }

  private registerMiddleware() {
    this.app.use(morgan('tiny'));
    this.app.use(compression());
    this.app.use(helmet());
    this.app.use(bodyParser.json());
  }

  private registerRouter() {
    this.app.use('/api', this.routerRegistry.getRouter());
  }
}
