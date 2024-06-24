import {Request, Response} from "express";

export interface AppointmentController {
  createAppointmentForTeacher(req: Request, res: Response): Promise<void>;
  createAppointment(req: Request, res: Response): Promise<void>;
  editAppointmentForTeacher(req: Request, res: Response): Promise<void>;
  editAppointment(req: Request, res: Response): Promise<void>;
  deleteAppointment(req: Request, res: Response): Promise<void>;
  getAppointmentById(req: Request, res: Response): Promise<void>;
  getAllAppointments(req: Request, res: Response): Promise<void>;
  getAllAppointmentsByMonthForTeacher(req: Request, res: Response): Promise<void>;
  getAllAppointmentsByMonthForStudent(req: Request, res: Response): Promise<void>;
  getAllAppointmentsForTeacher(req: Request, res: Response): Promise<void>;
  getAllAppointmentsForStudent(req: Request, res: Response): Promise<void>;
}