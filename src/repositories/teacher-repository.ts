import { CreateTeacherModel, EditTeacherModel, TeacherModel } from "../models/teacher-models";

export interface TeacherRepository {
  createTeacher(createTeacherModel: CreateTeacherModel): Promise<TeacherModel>;
  getTeacherById(id: string): Promise<TeacherModel>;
  getAllTeachers(): Promise<Array<TeacherModel>>;
  editTeacher(editTeacherModel: EditTeacherModel): Promise<EditTeacherModel>;
  deleteTeacher(id: string): Promise<TeacherModel>;
  getTeacherByLogin(login: string): Promise<TeacherModel>;
}