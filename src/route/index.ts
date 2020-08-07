import express from 'express';
import { usersRouter } from './users.route';

export const router = express.Router();

router.use('/users', usersRouter);
