import { CreateStudentModel, EditStudentModel, StudentModel } from "../models/student-models";

export interface StudentRepository {
  createStudent(studentModel: CreateStudentModel): Promise<StudentModel>;
  getStudentById(id: string): Promise<StudentModel>;
  getAllStudents(): Promise<Array<StudentModel>>;
  editStudent(editStudentModel: EditStudentModel): Promise<EditStudentModel>;
  deleteStudent(id: string): Promise<StudentModel>;
  getStudentByLogin(login: string): Promise<StudentModel>;
}