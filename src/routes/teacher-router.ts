import express, { Router } from "express";
import { TeacherController } from "../controllers/teacher-controller";

export class TeacherRouter {
  private readonly teacherRouter: Router;
  private readonly teacherController: TeacherController;

  constructor(teacherController: TeacherController) {
    this.teacherController = teacherController;
    this.teacherRouter = express.Router();
  }

  public setRouter(): void {
    this.teacherRouter.get("/get", this.teacherController.getTeacherByLogin);
    this.teacherRouter.get("/get-all", this.teacherController.getAllTeachers);
    this.teacherRouter.post("/edit", this.teacherController.editTeacher);
    this.teacherRouter.delete("/delete", this.teacherController.deleteTeacher);
    this.teacherRouter.post("/create", this.teacherController.createTeacher);
  }

  public getRouter(): Router {
    return this.teacherRouter;
  }
}