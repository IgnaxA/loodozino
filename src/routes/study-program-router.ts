import express, { Router } from "express";
import { DegreeLevelController } from "../controllers/degree-level-controller";
import { StudyProgramController } from "../controllers/study-program-controller";
import { verifyUser } from "../middlewares/verify-user";

export class StudyProgramRouter {
  private readonly studyProgramRouter: Router;
  private readonly studyProgramController: StudyProgramController;

  constructor(studyProgramController: StudyProgramController) {
    this.studyProgramController = studyProgramController;
    this.studyProgramRouter = express.Router();
  }

  public setRouter(): void {
    this.studyProgramRouter.get("/get", verifyUser, this.studyProgramController.getStudyProgramById);
    this.studyProgramRouter.get("/get-all", verifyUser, this.studyProgramController.getAllStudyPrograms);
    this.studyProgramRouter.post("/edit", verifyUser, this.studyProgramController.editStudyProgram);
    this.studyProgramRouter.delete("/delete", verifyUser, this.studyProgramController.deleteStudyProgram);
    this.studyProgramRouter.post("/create", verifyUser, this.studyProgramController.createStudyProgram);
  }

  public getRouter(): Router {
    return this.studyProgramRouter;
  }
}