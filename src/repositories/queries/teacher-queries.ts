import { SingleQueryConstructor } from "../../database/query-constructors/single-query-constructor";

export interface TeacherQueries {
  createTeacher(login: string, fullName: string, phoneNumber: string, position: string, socials: string): SingleQueryConstructor;
  getAllTeachers(): SingleQueryConstructor;
  getAllStudentsByTeacher(teacherLogin: string): SingleQueryConstructor;
  editTeacher(login: string, fullName: string, phoneNumber: string, position: string, socials: string): SingleQueryConstructor;
  deleteTeacher(login: string): SingleQueryConstructor;
  getTeacherByLogin(login: string): SingleQueryConstructor;
  createTeacherByLogin(login: string): SingleQueryConstructor;
}