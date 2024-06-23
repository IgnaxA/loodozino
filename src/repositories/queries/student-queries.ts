import { SingleQueryConstructor } from "../../database/query-constructors/single-query-constructor";

export interface StudentQueries {
  createStudent(id: string, login: string, fullName: string, phoneNumber: string, studyProgramId: string, degreeLevelId: string, course: number, admissionYear: number, socials: string): SingleQueryConstructor;
  getStudentById(id: string): SingleQueryConstructor;
  getAllStudents(): SingleQueryConstructor;
  editStudent(id: string, fullName: string, phoneNumber: string, studyProgramId: string, degreeLevelId: string, course: number, admissionYear: number, socials: string): SingleQueryConstructor;
  deleteStudent(id: string): SingleQueryConstructor;
  getStudentByLogin(login: string): SingleQueryConstructor;
  createStudentByLogin(id: string, login: string): SingleQueryConstructor;
}