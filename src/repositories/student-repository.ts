import { EditStudentModel, StudentModel } from "../models/student-models";

export interface StudentRepository {
  createStudent(studentModel: StudentModel): Promise<void>;
  getStudentById(id: string): Promise<StudentModel>;
  getAllStudents(): Promise<Array<StudentModel>>;
  editStudent(editStudentModel: EditStudentModel): Promise<EditStudentModel>;
  deleteStudent(id: string): Promise<StudentModel>;
}