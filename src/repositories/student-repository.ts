import { InputStudentModel, StudentModel } from "../models/student-models";

export interface StudentRepository {
  createStudent(studentBody: StudentModel): Promise<StudentModel>;
  getAllStudents(): Promise<Array<StudentModel>>;
  getAllStudentsByTeacher(teacherLogin: string): Promise<Array<StudentModel>>;
  editStudent(inputStudentModel: InputStudentModel, login: string): Promise<StudentModel>;
  deleteStudent(id: string): Promise<StudentModel>;
  getStudentByLogin(login: string): Promise<StudentModel>;
}