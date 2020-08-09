import {
  asClass,
  AwilixContainer,
  createContainer,
  InjectionMode
} from 'awilix';
import { EnvConfig } from './config/env-config';
import { DatabaseConnector } from './database/database-connector';
import { UserRepository } from './database/repository/user.repository';
import { ExpressApp } from './express-app';
import { RouterRegistry } from './router/router-registry';
import { UsersRouter } from './router/users.router';
import { UserService } from './service/user.service';
import { Logger } from './utility/logger';

export class ContainerRegistry {
  private container: AwilixContainer;

  private createContainer() {
    this.container = createContainer({
      injectionMode: InjectionMode.CLASSIC
    });
  }

  private register() {
    this.container.register({
      //config
      envConfig: asClass(EnvConfig).singleton(),

      //utility
      logger: asClass(Logger).singleton(),

      //app
      expressApp: asClass(ExpressApp).singleton(),

      //router
      usersRouter: asClass(UsersRouter).singleton(),
      routerRegistry: asClass(RouterRegistry).singleton(),

      //database
      databaseConnector: asClass(DatabaseConnector).singleton(),
      userRepo: asClass(UserRepository).singleton(),

      //service
      userService: asClass(UserService).singleton()
    });
  }

  getContainer() {
    if (this.container === undefined) {
      this.createContainer();
      this.register();
    }

    return this.container;
  }
}
