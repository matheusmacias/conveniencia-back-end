import { Router } from "express";
import { injectable, inject } from "inversify";
import UserController from "../controllers/user.controller";

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
            this.userController.logIn
        );
        this.router.post(
            '/user/create',
            this.userController.signUp
        );
    }
}