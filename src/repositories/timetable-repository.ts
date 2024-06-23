import { InputTimetableModel, TimetableModel } from "../models/timetable-models";

export interface TimetableRepository {
  createTimetable(inputTimetableModel: InputTimetableModel) : Promise<TimetableModel>;
  editTimetable(timetableModel: TimetableModel) : Promise<TimetableModel>;
  deleteTimetable(id: string) : Promise<TimetableModel>;

  getTimetableById(id: string): Promise<TimetableModel>;
  getAllTimetables() : Promise<Array<TimetableModel>>;
  getAllTimetablesByMonthByTeacher(month: number, year: number, teacherLogin: string) : Promise<Array<TimetableModel>>;
  getAllTimetablesByMonthByStudent(month: number, year: number, studentLogin: string) : Promise<Array<TimetableModel>>;
  getAllTimetablesByTeacher(teacherLogin: string): Promise<Array<TimetableModel>>;
  getAllTimetablesByStudent(studentLogin: string): Promise<Array<TimetableModel>>;
}