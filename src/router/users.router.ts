import { UserService } from '../service/user.service';
import { BaseRouter } from './base-router';
import { GenericRouter } from './generic-router.interface';

export class UsersRouter extends BaseRouter implements GenericRouter {
  constructor(private readonly userService: UserService) {
    super();
    this.registerRoutes();
  }
  registerRoutes(): void {
    this.router.get('/', async (req, res) => {
      try {
        res.json(await this.userService.getUsers());
      } catch (error) {
        console.error(error);
      }
    });

    this.router.get('/:id', async (req, res) => {
      try {
        res.json(await this.userService.getUser(parseInt(req.params.id)));
      } catch (error) {
        console.error(error);
      }
    });

    this.router.post('/', async (req, res) => {
      try {
        res.json(await this.userService.createUser(req.body));
      } catch (error) {
        console.error(error);
      }
    });

    this.router.put('/:id', async (req, res) => {
      try {
        res.json(
          await this.userService.updateUser(parseInt(req.params.id), req.body)
        );
      } catch (error) {
        console.error(error);
      }
    });
  }
}
