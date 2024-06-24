import { RequestController } from "../controllers/request-controller";
import express, { Router } from "express";
import { AppointmentController } from "../controllers/appointment-controller";

export class AppointmentRouter {
  private readonly appointmentController: AppointmentController;
  private readonly appointmentRouter: Router;

  constructor(appointmentController : AppointmentController) {
    this.appointmentController = appointmentController;
    this.appointmentRouter = express.Router();
  }

  public setRouter(): void {
    this.appointmentRouter.post("/create-for-teacher", this.appointmentController.createAppointmentForTeacher);
    this.appointmentRouter.post("/create", this.appointmentController.createAppointment);
    this.appointmentRouter.post("/edit-for-teacher", this.appointmentController.editAppointmentForTeacher);
    this.appointmentRouter.post("/edit", this.appointmentController.editAppointment);
    this.appointmentRouter.delete("/delete", this.appointmentController.deleteAppointment);
    this.appointmentRouter.get("/get-by-id", this.appointmentController.getAppointmentById);
    this.appointmentRouter.get("/get-all", this.appointmentController.getAllAppointments);
    this.appointmentRouter.get("/get-all-by-month-for-teacher", this.appointmentController.getAllAppointmentsByMonthForTeacher);
    this.appointmentRouter.get("/get-all-by-month-for-student", this.appointmentController.getAllAppointmentsByMonthForStudent);
    this.appointmentRouter.get("/get-all-for-teacher", this.appointmentController.getAllAppointmentsForTeacher);
    this.appointmentRouter.get("/get-all-for-student", this.appointmentController.getAllAppointmentsForStudent);
  }

  public getRouter(): Router {
    return this.appointmentRouter;
  }
}