import { TeacherService } from "../teacher-service";
import { TeacherRepository } from "../../repositories/teacher-repository";
import { InputTeacherModel, TeacherModel } from "../../models/teacher-models";
import { Assert } from "../../utils/assert";
import { ErrorHandler } from "../../utils/error-handler";

export class TeacherServiceImpl implements TeacherService {
  private readonly teacherRepository: TeacherRepository;

  constructor(teacherRepository: TeacherRepository) {
    this.teacherRepository = teacherRepository;
  }

  public async createTeacher(teacherBody: TeacherModel): Promise<TeacherModel> {
      const teacherModel: TeacherModel = await this.teacherRepository.createTeacher(teacherBody);
      Assert.notNullOrUndefined(teacherModel, `Teacher could not be created`);
      return teacherModel;
  };

  public async getAllTeachers(): Promise<Array<TeacherModel>> {
      const teachers: Array<TeacherModel> = await this.teacherRepository.getAllTeachers();
      Assert.notNullOrUndefined(teachers, `There are no teachers yet`);
      return teachers;
  };

  public async editTeacher(inputTeacherModel: InputTeacherModel, login: string): Promise<TeacherModel> {
      const updatedTeacher: TeacherModel = await this.teacherRepository.editTeacher(inputTeacherModel, login);
      Assert.notNullOrUndefined(updatedTeacher, `Teacher with login ${login} not found`);
      return updatedTeacher;
  };

  public async deleteTeacher(login: string): Promise<TeacherModel> {
      const teacher: TeacherModel = await this.teacherRepository.deleteTeacher(login);
      Assert.notNullOrUndefined(teacher,`Teacher with login ${login} not found`);
      return teacher;
  };

  public async getTeacherByLogin(login: string): Promise<TeacherModel> {
      const teacher: TeacherModel = await this.teacherRepository.getTeacherByLogin(login);
      Assert.notNullOrUndefined(teacher, `Teacher with login ${login} not found`);
      return teacher;
  };
}