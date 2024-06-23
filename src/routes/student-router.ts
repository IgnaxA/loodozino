import { StudentController } from "../controllers/student-controller";
import express, { Router } from "express";

export class StudentRouter {
  private readonly studentRouter: Router;
  private readonly studentController: StudentController;

  constructor(studentController: StudentController) {
    this.studentController = studentController;
    this.studentRouter = express.Router();
  }

  public setRouter(): void {
    this.studentRouter.get("/get", this.studentController.getStudentByLogin);
    this.studentRouter.get("/get-all", this.studentController.getAllStudents);
    this.studentRouter.post("/edit", this.studentController.editStudent);
    this.studentRouter.delete("/delete", this.studentController.deleteStudent);
    this.studentRouter.post("/create", this.studentController.createStudent);
  }

  public getRouter(): Router {
    return this.studentRouter;
  }
}