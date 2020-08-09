import { ContainerRegistry } from './container-register';
import { DatabaseConnector } from './database/database-connector';
import { ExpressApp } from './express-app';

const containerRegistry = new ContainerRegistry();
const container = containerRegistry.getContainer();

const databaseConnector = container.resolve<DatabaseConnector>(
  'databaseConnector'
);
const expressApp = container.resolve<ExpressApp>('expressApp');

process.on('SIGINT', async () => {
  await expressApp.stop();
});

const bootstrap = async () => {
  try {
    await databaseConnector.connect();
    expressApp.start();
  } catch (error) {
    console.error(error);
  }
};

bootstrap();
