import { Router } from "express";

import userController from "../controllers/user.controller";

class Routes{
    public router: Router;

    constructor(){
        this.router = Router();
        this.routes();
    }

    private routes(){
        this.router.post(
            '/user/login',
            userController.logIn
        );
        this.router.post(
            '/user/create',
            userController.signUp
        );
    }
}

export default new Routes().router;