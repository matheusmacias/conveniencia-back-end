import "reflect-metadata";
import { Router } from "express";
import { injectable, inject } from 'inversify';

import UserRouter from "../routes/user.router";
import DoorRouter from "../routes/door.router";

@injectable()
export default class Routes {
    public router: Router;

    constructor(
        @inject(UserRouter) private readonly userRouter: UserRouter,
        @inject(DoorRouter) private readonly doorRouter: DoorRouter
    ) {
        this.router = Router();
        this.mountRoutes();
    }

    private mountRoutes() {
        this.router.use(this.userRouter.router);
        this.router.use(this.doorRouter.router);
    }
}

