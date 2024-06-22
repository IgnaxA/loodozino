import { TeacherService } from "../teacher-service";
import { TeacherRepository } from "../../repositories/teacher-repository";
import { EditTeacherModel, TeacherModel } from "../../models/teacher-models";
import { Assert } from "../../utils/assert";

export class TeacherServiceImpl implements TeacherService {
  private readonly teacherRepository: TeacherRepository;

  constructor(teacherRepository: TeacherRepository) {
    this.teacherRepository = teacherRepository;
  }

  public async createTeacher(teacherModel: TeacherModel): Promise<TeacherModel> {
    await this.teacherRepository.createTeacher(teacherModel);
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
}