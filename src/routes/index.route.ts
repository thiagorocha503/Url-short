import { Router } from 'express';
import { IndexController as IndexController } from '@/controllers/index.controller';
import { Routes } from '@interfaces/routes.interface';

export class IndexRouter implements Routes {
  public path = '/';
  public router = Router();
  public index = new IndexController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.index.getIndex);
    this.router.post(`${this.path}shorten`, this.index.saveURL);
    this.router.get(`${this.path}:hash`, this.index.getURL);
  }
}
