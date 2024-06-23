import { SingleQueryConstructor } from "../../database/query-constructors/single-query-constructor";

export interface StudentQueries {
  createStudent(login: string, fullName: string, phoneNumber: string, studyProgramId: string, degreeLevelId: string, course: number, admissionYear: number, socials: string, teacherLogin: string): SingleQueryConstructor;
  getAllStudents(): SingleQueryConstructor;
  getAllStudentsByTeacher(teacherLogin: string): SingleQueryConstructor;
  editStudent(login:string, fullName: string, phoneNumber: string, studyProgramId: string, degreeLevelId: string, course: number, admissionYear: number, socials: string,  teacherLogin: string): SingleQueryConstructor;
  deleteStudent(login: string): SingleQueryConstructor;
  getStudentByLogin(login: string): SingleQueryConstructor;
  createStudentByLogin(login: string): SingleQueryConstructor;
}