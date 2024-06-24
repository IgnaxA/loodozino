import express, { Router } from "express";
import { DegreeLevelController } from "../controllers/degree-level-controller";
import { verifyUser } from "../middlewares/verify-user";

export class DegreeLevelRouter {
  private readonly degreeLevelRouter: Router;
  private readonly degreeLevelController: DegreeLevelController;

  constructor(degreeLevelController: DegreeLevelController) {
    this.degreeLevelController = degreeLevelController;
    this.degreeLevelRouter = express.Router();
  }

  public setRouter(): void {
    this.degreeLevelRouter.get("/get", verifyUser, this.degreeLevelController.getDegreeLevelById);
    this.degreeLevelRouter.get("/get-all", verifyUser, this.degreeLevelController.getAllDegreeLevels);
    this.degreeLevelRouter.post("/edit", verifyUser, this.degreeLevelController.editDegreeLevel);
    this.degreeLevelRouter.delete("/delete", verifyUser, this.degreeLevelController.deleteDegreeLevel);
    this.degreeLevelRouter.post("/create", verifyUser, this.degreeLevelController.createDegreeLevel);
  }

  public getRouter(): Router {
    return this.degreeLevelRouter;
  }
}