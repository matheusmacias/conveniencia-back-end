import { inject, injectable } from 'inversify';
import { Request, Response } from 'express';

import UserService from '../services/user.service';


@injectable()
export default class UserController {

    constructor(@inject(UserService) private readonly _userService: UserService){}

    async logIn(req: Request, res: Response) {
        const { email, password } = req.body;
        const { status, message } = await this._userService.logIn({email, password});
        return res.status(status).send({ message, status });
    }

    async signUp(req: Request, res: Response) {
        const { name, email, password } = req.body;
        const { status, message } = await this._userService.signup({name, email, password});
        return res.status(status).send({ message, status });
    }
}