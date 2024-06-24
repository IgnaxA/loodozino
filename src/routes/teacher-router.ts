import express, { Router } from "express";
import { TeacherController } from "../controllers/teacher-controller";
import { verifyUser } from "../middlewares/verify-user";

export class TeacherRouter {
  private readonly teacherRouter: Router;
  private readonly teacherController: TeacherController;

  constructor(teacherController: TeacherController) {
    this.teacherController = teacherController;
    this.teacherRouter = express.Router();
  }

  public setRouter(): void {
    this.teacherRouter.get("/get", verifyUser, this.teacherController.getTeacherByLogin);
    this.teacherRouter.get("/get-all", verifyUser, this.teacherController.getAllTeachers);
    this.teacherRouter.get("/get-all-by-teacher", verifyUser, this.teacherController.getAllStudentsByTeacher);
    this.teacherRouter.post("/edit", verifyUser, this.teacherController.editTeacher);
    this.teacherRouter.delete("/delete", verifyUser, this.teacherController.deleteTeacher);
    this.teacherRouter.post("/create", verifyUser, this.teacherController.createTeacher);
  }

  public getRouter(): Router {
    return this.teacherRouter;
  }
}