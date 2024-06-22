import express, {Router} from "express";
import {AuthController} from "../controllers/auth-controller";

export class AuthRouter {
    private readonly authRouter: Router;
    private readonly  authController: AuthController;

    constructor(authController: AuthController) {
        this.authController = authController;
        this.authRouter = express.Router();
    }

    public setRouter(): void {
        this.authRouter.post("/signIn", this.authController.signIn);
        this.authRouter.post("/signUp", this.authController.signUp);
    }

    public getRouter(): Router {
        return this.authRouter;
    }

}
