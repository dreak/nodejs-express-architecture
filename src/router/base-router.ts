import express from 'express';

export class BaseRouter {
  protected router: express.Router;

  constructor() {
    this.router = express.Router();
  }

  getRouter() {
    return this.router;
  }
}
