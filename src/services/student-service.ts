import { InputStudentModel, StudentModel } from "../models/student-models";

export interface StudentService {
  createStudent(inputStudentModel: InputStudentModel, login: string): Promise<StudentModel>;
  getAllStudents(): Promise<Array<StudentModel>>;
  editStudent(inputStudentModel: InputStudentModel, login: string): Promise<StudentModel>;
  deleteStudent(login: string): Promise<StudentModel>;
  getStudentByLogin(login: string): Promise<StudentModel>;
}