import { RequestController } from "../controllers/request-controller";
import express, { Router } from "express";
import { AppointmentController } from "../controllers/appointment-controller";
import { verifyUser } from "../middlewares/verify-user";

export class AppointmentRouter {
  private readonly appointmentController: AppointmentController;
  private readonly appointmentRouter: Router;

  constructor(appointmentController : AppointmentController) {
    this.appointmentController = appointmentController;
    this.appointmentRouter = express.Router();
  }

  public setRouter(): void {
    this.appointmentRouter.post("/create-for-teacher", verifyUser, this.appointmentController.createAppointmentForTeacher);
    this.appointmentRouter.post("/create", verifyUser, this.appointmentController.createAppointment);
    this.appointmentRouter.post("/edit-for-teacher", verifyUser, this.appointmentController.editAppointmentForTeacher);
    this.appointmentRouter.post("/edit", verifyUser, this.appointmentController.editAppointment);
    this.appointmentRouter.delete("/delete", verifyUser, this.appointmentController.deleteAppointment);
    this.appointmentRouter.get("/get-by-id", verifyUser, this.appointmentController.getAppointmentById);
    this.appointmentRouter.get("/get-all", verifyUser, this.appointmentController.getAllAppointments);
    this.appointmentRouter.get("/get-all-by-month-for-teacher", verifyUser, this.appointmentController.getAllAppointmentsByMonthForTeacher);
    this.appointmentRouter.get("/get-all-by-month-for-student", verifyUser, this.appointmentController.getAllAppointmentsByMonthForStudent);
    this.appointmentRouter.get("/get-all-for-teacher", verifyUser, this.appointmentController.getAllAppointmentsForTeacher);
    this.appointmentRouter.get("/get-all-for-student", verifyUser, this.appointmentController.getAllAppointmentsForStudent);
  }

  public getRouter(): Router {
    return this.appointmentRouter;
  }
}