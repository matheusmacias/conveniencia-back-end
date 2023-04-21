import { injectable, inject } from 'inversify';
import { Request, Response } from 'express';
import DoorService from '../services/door.service';

@injectable()
export default class DoorController {
  constructor(@inject(DoorService) private readonly _doorService: DoorService) {}

  async openDoor(req: Request, res: Response) {
    const authToken = req.headers.authorization?.split(" ")[1] || "";
    const { status, message } = await this._doorService.openDoor({ authToken });
    res.status(status).send({ message });
  }
}
