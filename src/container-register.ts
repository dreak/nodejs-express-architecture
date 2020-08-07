import { asClass, createContainer, InjectionMode } from 'awilix';
import { DatabaseConnector } from './database/database-connector';
import { UserRepository } from './database/repository/user.repository';
import { UserService } from './service/user.service';

export const container = createContainer({
  injectionMode: InjectionMode.CLASSIC
});

container.register({
  //database
  databaseConnector: asClass(DatabaseConnector).singleton(),
  userRepo: asClass(UserRepository).singleton(),

  //service
  userService: asClass(UserService).singleton()
});
