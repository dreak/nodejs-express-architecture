import express from 'express';
import { container } from '../container-register';
import { UserService } from '../service/user.service';

export const usersRouter = express.Router();
const userService = container.resolve<UserService>('userService');

usersRouter.get('/', async (req, res) => {
  try {
    res.json(await userService.getUsers());
  } catch (error) {
    console.error(error);
  }
});

usersRouter.get('/:id', async (req, res) => {
  try {
    res.json(await userService.getUser(parseInt(req.params.id)));
  } catch (error) {
    console.error(error);
  }
});

usersRouter.post('/', async (req, res) => {
  try {
    res.json(await userService.createUser(req.body));
  } catch (error) {
    console.error(error);
  }
});

usersRouter.put('/:id', async (req, res) => {
  try {
    res.json(await userService.updateUser(parseInt(req.params.id), req.body));
  } catch (error) {
    console.error(error);
  }
});
