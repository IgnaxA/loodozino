import { StudentService } from "../student-service";
import { StudentRepository } from "../../repositories/student-repository";
import { Assert } from "../../utils/assert";
import { InputStudentModel, StudentModel } from "../../models/student-models";

export class StudentServiceImpl implements StudentService {
  private readonly studentRepository: StudentRepository;

  constructor(studentRepository: StudentRepository) {
    this.studentRepository = studentRepository;
  }

  public async createStudent(studentBody: StudentModel): Promise<StudentModel> {
      const createdStudentModel :StudentModel = await this.studentRepository.createStudent(studentBody);
      return createdStudentModel;
  };

  public async getAllStudents(): Promise<Array<StudentModel>> {
      const students: Array<StudentModel> = await this.studentRepository.getAllStudents();
      Assert.notNullOrUndefined(students, `There are no students yet`);
      return students;
  };

  public async editStudent(inputStudentModel: InputStudentModel, login: string): Promise<StudentModel> {
      const updatedStudent: StudentModel = await this.studentRepository.editStudent(inputStudentModel, login);
      Assert.notNullOrUndefined(updatedStudent, `Student with login ${login} not found`);
      return updatedStudent;
  };

  public async deleteStudent(login: string): Promise<StudentModel> {
      const student: StudentModel = await this.studentRepository.deleteStudent(login);
      Assert.notNullOrUndefined(student,`Student with login ${login} not found`);
      return student;
  };

  public async getStudentByLogin(login: string): Promise<StudentModel> {
      const student: StudentModel = await this.studentRepository.getStudentByLogin(login);
      Assert.notNullOrUndefined(student, `Student with login ${login} is null or undefined`);
      return student;
  };

}