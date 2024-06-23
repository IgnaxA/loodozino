import { SingleQueryConstructor } from "../../database/query-constructors/single-query-constructor";

export interface TeacherQueries {
  createTeacher(id: string, login: string, fullName: string, phoneNumber: string, position: string, socials: string): SingleQueryConstructor;
  getTeacherById(id: string): SingleQueryConstructor;
  getAllTeachers(): SingleQueryConstructor;
  editTeacher(id: string, fullName: string, phoneNumber: string, position: string, socials: string): SingleQueryConstructor;
  deleteTeacher(id: string): SingleQueryConstructor;
  getTeacherByLogin(login: string): SingleQueryConstructor;
  createTeacherByLogin(id: string, login: string): SingleQueryConstructor;
}