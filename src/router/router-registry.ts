import { BaseRouter } from './base-router';
import { GenericRouter } from './generic-router.interface';
import { usersRouter } from './users.router';

export class RouterRegistry extends BaseRouter implements GenericRouter {
  constructor() {
    super();
  }

  registerRoutes(): void {
    this.router.use('/users', usersRouter);
  }
}
