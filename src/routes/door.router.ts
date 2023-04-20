import { Router } from "express";
import { injectable, inject } from "inversify";
import DoorController from "../controllers/door.controller";

@injectable()
export default class DoorRouter {
  public router: Router;

  constructor(@inject(DoorController) private readonly doorController: DoorController) {
    this.router = Router();
    this.routes();
  }

  private routes() {
    this.router.post('/door', this.doorController.openDoor.bind(this.doorController));
  }
}
