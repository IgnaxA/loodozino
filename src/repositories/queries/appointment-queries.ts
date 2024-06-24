import { SingleQueryConstructor } from "../../database/query-constructors/single-query-constructor";

export interface AppointmentQueries {
  createAppointment(id: string, meetingDate: Date, place: string, additionalInfo: string, teacherLogin: string) : SingleQueryConstructor;
  editAppointment(id: string, meetingDate: Date, place: string, additionalInfo: string, teacherLogin: string) : SingleQueryConstructor;
  deleteAppointment(id: string) : SingleQueryConstructor;

  getAppointmentById(id: string): SingleQueryConstructor;
  getAllAppointments() : SingleQueryConstructor;
  getAllAppointmentsByMonthByTeacher(month: number, year: number, teacherLogin: string) : SingleQueryConstructor;
  getAllAppointmentsByMonthByStudent(month: number, year: number, studentLogin: string) : SingleQueryConstructor;
  getAllAppointmentsByTeacher(teacherLogin: string): SingleQueryConstructor;
  getAllAppointmentsByStudent(studentLogin: string): SingleQueryConstructor;
}