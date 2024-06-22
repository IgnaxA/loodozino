import express, { Router } from "express";
import { DegreeLevelController } from "../controllers/degree-level-controller";
import { StudyProgramController } from "../controllers/study-program-controller";

export class StudyProgramRouter {
  private readonly studyProgramRouter: Router;
  private readonly studyProgramController: StudyProgramController;

  constructor(studyProgramController: StudyProgramController) {
    this.studyProgramController = studyProgramController;
    this.studyProgramRouter = express.Router();
  }

  public setRouter(): void {
    this.studyProgramRouter.get("/get", this.studyProgramController.getStudyProgramById);
    this.studyProgramRouter.get("/get-all", this.studyProgramController.getAllStudyPrograms);
    this.studyProgramRouter.post("/edit", this.studyProgramController.editStudyProgram);
    this.studyProgramRouter.delete("/delete", this.studyProgramController.deleteStudyProgram);
    this.studyProgramRouter.post("/create", this.studyProgramController.createStudyProgram);
  }

  public getRouter(): Router {
    return this.studyProgramRouter;
  }
}