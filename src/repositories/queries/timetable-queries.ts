import { SingleQueryConstructor } from "../../database/query-constructors/single-query-constructor";

export interface TimetableQueries {
  createTimetable(id: string, meetingDate: Date, place: string, additionalInfo: string, teacherLogin: string, studentLogin: string) : SingleQueryConstructor;
  editTimetable(id: string, meetingDate: Date, place: string, additionalInfo: string, teacherLogin: string, studentLogin: string) : SingleQueryConstructor;
  deleteTimetable(id: string) : SingleQueryConstructor;

  getTimetableById(id: string): SingleQueryConstructor;
  getAllTimetables() : SingleQueryConstructor;
  getAllTimetablesByMonthByTeacher(month: number, year: number, teacherLogin: string) : SingleQueryConstructor;
  getAllTimetablesByMonthByStudent(month: number, year: number, studentLogin: string) : SingleQueryConstructor;
  getAllTimetablesByTeacher(teacherLogin: string): SingleQueryConstructor;
  getAllTimetablesByStudent(studentLogin: string): SingleQueryConstructor;
}