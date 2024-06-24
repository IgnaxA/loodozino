import { StudentController } from "../controllers/student-controller";
import express, { Router } from "express";
import { verifyUser } from "../middlewares/verify-user";

export class StudentRouter {
  private readonly studentRouter: Router;
  private readonly studentController: StudentController;

  constructor(studentController: StudentController) {
    this.studentController = studentController;
    this.studentRouter = express.Router();
  }

  public setRouter(): void {
    this.studentRouter.get("/get", verifyUser, this.studentController.getStudentByLogin);
    this.studentRouter.get("/get-all", verifyUser, this.studentController.getAllStudents);
    this.studentRouter.post("/edit", verifyUser, this.studentController.editStudent);
    this.studentRouter.delete("/delete", verifyUser, this.studentController.deleteStudent);
    this.studentRouter.post("/create", verifyUser, this.studentController.createStudent);
  }

  public getRouter(): Router {
    return this.studentRouter;
  }
}