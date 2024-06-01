import express, { Router } from "express";
import { MatchController } from "../controllers/match-controller";

export class MatchRouter {
  private readonly matchRouter: Router;
  private readonly matchController: MatchController;

  constructor(matchController: MatchController) {
    this.matchController = matchController;
    this.matchRouter = express.Router();
  }

  public setRouter(): void {
    this.matchRouter.get("/get_match", this.matchController.getMatch);
    this.matchRouter.post("/edit_match", this.matchController.editMatch);
    this.matchRouter.post("/create_match", this.matchController.createMatch);
    this.matchRouter.delete("/remove_match", this.matchController.removeMatch);
  }

  public getRouter(): Router {
    return this.matchRouter;
  }
}