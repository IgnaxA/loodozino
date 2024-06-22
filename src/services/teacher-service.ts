import { EditTeacherModel, TeacherModel } from "../models/teacher-models";

export interface TeacherService {
  createTeacher(teacherModel: TeacherModel): Promise<TeacherModel>;
  getTeacherById(id: string): Promise<TeacherModel>;
  getAllTeachers(): Promise<Array<TeacherModel>>;
  editTeacher(editTeacherModel: EditTeacherModel): Promise<EditTeacherModel>;
  deleteTeacher(id: string): Promise<TeacherModel>;
}