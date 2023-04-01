import { Request, Response } from 'express';

import userService from '../services/user.service';

class UserController {
    async logIn(req: Request, res: Response) {
        const { email, password } = req.body;
        const results = await userService.logIn(email, password);
        const { status, message } = results;

        return res.status(status).send({ message, status });
    }

    async signUp(req: Request, res: Response) {
        const { name, email, password } = req.body;
        const results = await userService.signup(name, email, password);
        const { status, message } = results;

        return res.status(status).send({ message, status });
    }
}

export default new UserController();