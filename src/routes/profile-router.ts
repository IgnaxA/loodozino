import express, { Router } from "express";
import { PlayerController } from "../controllers/player-controller";

export class PlayerRouter {
    private playerController: PlayerController;
    private playerRouter: Router = express.Router();

    constructor(playerController: PlayerController) {
        this.playerController = playerController;        
    };

    public setRouter(): void {
        // this.playerRouter.post('/api/signin',this.authController.signIn);
    };

    public getRouter(): void {
        // return this.authRouter;
    };
};