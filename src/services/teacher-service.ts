import { InputTeacherModel, TeacherModel } from "../models/teacher-models";

export interface TeacherService {
  createTeacher(teacherBody: TeacherModel): Promise<TeacherModel>;
  getAllTeachers(): Promise<Array<TeacherModel>>;
  editTeacher(inputTeacherModel: InputTeacherModel, login: string): Promise<TeacherModel>;
  deleteTeacher(login: string): Promise<TeacherModel>;
  getTeacherByLogin(login: string): Promise<TeacherModel>;
}