import { Request, Response } from 'express';
import { injectable } from 'inversify';

import userService from '../services/user.service';


@injectable()
export default class UserController {
    async logIn(req: Request, res: Response) {
        const { email, password } = req.body;
        const { status, message } = await userService.logIn(email, password);
        return res.status(status).send({ message, status });
    }

    async signUp(req: Request, res: Response) {
        const { name, email, password } = req.body;
        const { status, message } = await userService.signup(name, email, password);
        return res.status(status).send({ message, status });
    }
}