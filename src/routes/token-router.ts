
import express, {Router} from "express";
import {TokenController} from "../controllers/token-controller";

export class TokenRouter {
    private readonly tokenController: TokenController;
    private readonly tokenRouter: Router;

    constructor(tokenController: TokenController) {
        this.tokenController = tokenController;
        this.tokenRouter = express.Router();
    }

    public setRouter(): void {
        this.tokenRouter.get("/verifyAndGet", this.tokenController.verifyAndGet);
        this.tokenRouter.post("/getAccessToken", this.tokenController.getAccessToken);
    }

    public getRouter(): Router {
        return this.tokenRouter;
    }

}