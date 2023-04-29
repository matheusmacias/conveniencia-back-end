import { Router } from "express";
import { injectable, inject } from "inversify";

import UserController from "../controllers/user.controller";
import { validateUserReg } from "../middlewares/user.middleware";

@injectable()
export default class UserRouter {
    public router: Router;

    constructor(
        @inject(UserController) private readonly userController: UserController
    ) {
        this.router = Router();
        this.routes();
    }

    private routes() {
        this.router.post(
            '/user/login',
            this.userController.logIn.bind(this.userController)
        );
        this.router.post(
            '/user/create',
            validateUserReg,
            this.userController.signUp.bind(this.userController)
        );
    }
}