import bodyParser from 'body-parser';
import compression from 'compression';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import { config } from './config/config';
import { container } from './container-register';
import { DatabaseConnector } from './database/database-connector';
import { router } from './route';

const app = express();

const databaseConnector = container.resolve<DatabaseConnector>(
  'databaseConnector'
);

const bootstrap = async () => {
  try {
    await databaseConnector.connect();

    app.use(morgan('tiny'));
    app.use(compression());
    app.use(helmet());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());

    app.use('/api', router);

    app.listen(config.PORT, () => {
      console.info(
        `web api listening on port 3000, http://localhost:${config.PORT}`
      );
    });
  } catch (error) {
    console.error(error);
  }
};

bootstrap();
