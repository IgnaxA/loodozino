import { TeacherService } from "../teacher-service";
import { TeacherRepository } from "../../repositories/teacher-repository";
import { CreateTeacherModel, EditTeacherModel, TeacherModel } from "../../models/teacher-models";
import { Assert } from "../../utils/assert";
import { ErrorHandler } from "../../utils/error-handler";

export class TeacherServiceImpl implements TeacherService {
  private readonly teacherRepository: TeacherRepository;

  constructor(teacherRepository: TeacherRepository) {
    this.teacherRepository = teacherRepository;
  }

  public async createTeacher(createTeacherModel:CreateTeacherModel): Promise<TeacherModel> {
      const teacherModel: TeacherModel = await this.teacherRepository.createTeacher(createTeacherModel);
      Assert.notNullOrUndefined(teacherModel, `Teacher could not be created`);
      return teacherModel;
  };

  public async getTeacherById(id: string): Promise<TeacherModel> {
      const teacher: TeacherModel = await this.teacherRepository.getTeacherById(id);
      Assert.notNullOrUndefined(teacher, `Teacher with ID ${id} not found`);
      return teacher;
  };

  public async getAllTeachers(): Promise<Array<TeacherModel>> {
      const teachers: Array<TeacherModel> = await this.teacherRepository.getAllTeachers();
      Assert.notNullOrUndefined(teachers, `There are no teachers yet`);
      return teachers;
  };

  public async editTeacher(editTeacherModel: EditTeacherModel): Promise<EditTeacherModel> {
      const updatedTeacher: EditTeacherModel = await this.teacherRepository.editTeacher(editTeacherModel);
      Assert.notNullOrUndefined(updatedTeacher, `Teacher with ID ${editTeacherModel.id} not found`);
      return updatedTeacher;
  };

  public async deleteTeacher(id: string): Promise<TeacherModel> {
      const teacher = await this.teacherRepository.deleteTeacher(id);
      Assert.notNullOrUndefined(teacher,`Teacher with ID ${id} not found`);
      return teacher;
  };

  public async getTeacherByLogin(login: string): Promise<TeacherModel> {
      const teacher: TeacherModel = await this.teacherRepository.getTeacherByLogin(login);
      Assert.notNullOrUndefined(teacher, `Teacher with login ${login} not found`);
      return teacher;
  }
}