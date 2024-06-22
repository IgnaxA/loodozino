import express, { Router } from "express";
import { DegreeLevelController } from "../controllers/degree-level-controller";

export class DegreeLevelRouter {
  private readonly degreeLevelRouter: Router;
  private readonly degreeLevelController: DegreeLevelController;

  constructor(degreeLevelController: DegreeLevelController) {
    this.degreeLevelController = degreeLevelController;
    this.degreeLevelRouter = express.Router();
  }

  public setRouter(): void {
    this.degreeLevelRouter.get("/get", this.degreeLevelController.getDegreeLevelById);
    this.degreeLevelRouter.get("/get-all", this.degreeLevelController.getAllDegreeLevels);
    this.degreeLevelRouter.post("/edit", this.degreeLevelController.editDegreeLevel);
    this.degreeLevelRouter.delete("/delete", this.degreeLevelController.deleteDegreeLevel);
    this.degreeLevelRouter.post("/create", this.degreeLevelController.createDegreeLevel);
  }

  public getRouter(): Router {
    return this.degreeLevelRouter;
  }
}