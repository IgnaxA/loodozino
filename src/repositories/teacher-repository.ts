import { InputTeacherModel, TeacherModel } from "../models/teacher-models";

export interface TeacherRepository {
  createTeacher(teacherBody: TeacherModel): Promise<TeacherModel>;
  getAllTeachers(): Promise<Array<TeacherModel>>;
  editTeacher(inputTeacherModel: InputTeacherModel, login: string): Promise<TeacherModel>;
  deleteTeacher(id: string): Promise<TeacherModel>;
  getTeacherByLogin(login: string): Promise<TeacherModel>;
}