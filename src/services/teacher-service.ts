import { InputTeacherModel, TeacherModel } from "../models/teacher-models";
import { StudentModel } from "../models/student-models";

export interface TeacherService {
  createTeacher(teacherBody: TeacherModel): Promise<TeacherModel>;
  getAllTeachers(): Promise<Array<TeacherModel>>;
  getAllStudentsByTeacher(teacherLogin: string):Promise<Array<StudentModel>>;
  editTeacher(inputTeacherModel: InputTeacherModel, login: string): Promise<TeacherModel>;
  deleteTeacher(login: string): Promise<TeacherModel>;
  getTeacherByLogin(login: string): Promise<TeacherModel>;
}