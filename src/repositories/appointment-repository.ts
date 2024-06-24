import { InputAppointmentModel, AppointmentModel, AppointmentInfo } from "../models/appointment-models";
import { SingleQueryConstructor } from "../database/query-constructors/single-query-constructor";

export interface AppointmentRepository {
  createAppointment(appointmentInfo: AppointmentInfo, teacherLogin: string) : Promise<AppointmentModel>;
  editAppointmentInfo(appointmentInfo: AppointmentInfo, teacherLogin: string) : Promise<AppointmentModel>;
  deleteAppointment(id: string) : Promise<AppointmentModel>;

  getAppointmentById(id: string): Promise<AppointmentModel>;
  getAllAppointments() : Promise<Array<AppointmentModel>>;
  getAllAppointmentsByMonthByTeacher(month: string, year: string, teacherLogin: string) : Promise<Array<AppointmentModel>>;
  getAllAppointmentsByMonthByStudent(month: string, year: string, studentLogin: string) : Promise<Array<AppointmentModel>>;
  getAllAppointmentsByTeacher(teacherLogin: string): Promise<Array<AppointmentModel>>;
  getAllAppointmentsByStudent(studentLogin: string): Promise<Array<AppointmentModel>>;
}


