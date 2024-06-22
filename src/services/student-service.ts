import { EditStudentModel, StudentModel } from "../models/student-models";

export interface StudentService {
  createStudent(studentModel: StudentModel): Promise<StudentModel>;
  getStudentById(id: string): Promise<StudentModel>;
  getAllStudents(): Promise<Array<StudentModel>>;
  editStudent(editStudentModel: EditStudentModel): Promise<EditStudentModel>;
  deleteStudent(id: string): Promise<StudentModel>;
}