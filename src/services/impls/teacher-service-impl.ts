import { TeacherService } from "../teacher-service";
import { TeacherRepository } from "../../repositories/teacher-repository";
import { EditTeacherModel, TeacherModel } from "../../models/teacher-models";
import { Assert } from "../../utils/assert";
import { ErrorHandler } from "../../utils/error-handler";

export class TeacherServiceImpl implements TeacherService {
  private readonly teacherRepository: TeacherRepository;

  constructor(teacherRepository: TeacherRepository) {
    this.teacherRepository = teacherRepository;
  }

  public async createTeacher(teacherModel: TeacherModel): Promise<TeacherModel> {
    try {
      await this.teacherRepository.createTeacher(teacherModel);
      return teacherModel;
    } catch (err: any) {
      ErrorHandler.throwError(err, "Error when create teacher");
    }
  };

  public async getTeacherById(id: string): Promise<TeacherModel> {
    try {
      const teacher: TeacherModel = await this.teacherRepository.getTeacherById(id);
      Assert.notNullOrUndefined(teacher, `Teacher with ID ${id} not found`);
      return teacher;

    } catch (err: any) {
      ErrorHandler.throwError(err, "Error when get teacher");
    }
  };

  public async getAllTeachers(): Promise<Array<TeacherModel>> {
    try {
      const teachers: Array<TeacherModel> = await this.teacherRepository.getAllTeachers();
      Assert.notNullOrUndefined(teachers, `There are no teachers yet`);
      return teachers;
    } catch (err: any) {
      ErrorHandler.throwError(err, "Error when get all teachers");
    }
  };

  public async editTeacher(editTeacherModel: EditTeacherModel): Promise<EditTeacherModel> {
    try {
      const updatedTeacher: EditTeacherModel = await this.teacherRepository.editTeacher(editTeacherModel);
      Assert.notNullOrUndefined(updatedTeacher, `Teacher with ID ${editTeacherModel.id} not found`);
      return updatedTeacher;
    } catch (err: any) {
      ErrorHandler.throwError(err, "Error when edit teacher");
    }
  };

  public async deleteTeacher(id: string): Promise<TeacherModel> {
    try {
      const teacher = await this.teacherRepository.deleteTeacher(id);
      Assert.notNullOrUndefined(teacher,`Teacher with ID ${id} not found`);
      return teacher;
    } catch (err: any) {
      ErrorHandler.throwError(err, "Error when delete teacher");
    }
  };

  public async getTeacherByLogin(login: string): Promise<TeacherModel> {
    try {
      const teacher: TeacherModel = await this.teacherRepository.getTeacherByLogin(login);
      Assert.notNullOrUndefined(teacher, `Teacher with login ${login} not found`);
      return teacher;
    } catch (err: any) {
      ErrorHandler.throwError(err, "Error when get teacher");
    }
  }
}