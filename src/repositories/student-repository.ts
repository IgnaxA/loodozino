import { InputStudentModel, StudentModel } from "../models/student-models";

export interface StudentRepository {
  createStudent(inputStudentModel: InputStudentModel, login: string): Promise<StudentModel>;
  getAllStudents(): Promise<Array<StudentModel>>;
  editStudent(inputStudentModel: InputStudentModel, login: string): Promise<StudentModel>;
  deleteStudent(id: string): Promise<StudentModel>;
  getStudentByLogin(login: string): Promise<StudentModel>;
}