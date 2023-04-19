import { Request, Response } from "express";
import doorService from "../services/door.service";
import { injectable } from 'inversify';

@injectable()
export default class DoorController{
    async openDoor(req: Request, res: Response){
        const {status, message} = await doorService.openDoor();
        res.status(status).send({message});
    }
}