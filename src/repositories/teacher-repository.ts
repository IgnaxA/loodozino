import { EditTeacherModel, TeacherModel } from "../models/teacher-models";

export interface TeacherRepository {
  createTeacher(teacherModel: TeacherModel): Promise<void>;
  getTeacherById(id: string): Promise<TeacherModel>;
  getAllTeachers(): Promise<Array<TeacherModel>>;
  editTeacher(editTeacherModel: EditTeacherModel): Promise<EditTeacherModel>;
  deleteTeacher(id: string): Promise<TeacherModel>;
}