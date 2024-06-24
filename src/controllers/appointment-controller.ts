import { NextFunction, Request, Response } from "express";

export interface AppointmentController {
  createAppointmentForTeacher(req: Request, res: Response, next: NextFunction): Promise<void>;
  createAppointment(req: Request, res: Response, next: NextFunction): Promise<void>;
  editAppointmentForTeacher(req: Request, res: Response, next: NextFunction): Promise<void>;
  editAppointment(req: Request, res: Response, next: NextFunction): Promise<void>;
  deleteAppointment(req: Request, res: Response, next: NextFunction): Promise<void>;
  getAppointmentById(req: Request, res: Response, next: NextFunction): Promise<void>;
  getAllAppointments(req: Request, res: Response, next: NextFunction): Promise<void>;
  getAllAppointmentsByMonthForTeacher(req: Request, res: Response, next: NextFunction): Promise<void>;
  getAllAppointmentsByMonthForStudent(req: Request, res: Response, next: NextFunction): Promise<void>;
  getAllAppointmentsForTeacher(req: Request, res: Response, next: NextFunction): Promise<void>;
  getAllAppointmentsForStudent(req: Request, res: Response, next: NextFunction): Promise<void>;
}