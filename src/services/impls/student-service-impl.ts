import { StudentService } from "../student-service";
import { StudentRepository } from "../../repositories/student-repository";
import { EditTeacherModel, TeacherModel } from "../../models/teacher-models";
import { Assert } from "../../utils/assert";
import { CreateStudentModel, EditStudentModel, StudentModel } from "../../models/student-models";
import { ErrorHandler } from "../../utils/error-handler";

export class StudentServiceImpl implements StudentService {
  private readonly studentRepository: StudentRepository;

  constructor(studentRepository: StudentRepository) {
    this.studentRepository = studentRepository;
  }

  public async createStudent(studentModel: CreateStudentModel): Promise<StudentModel> {
      const createdStudentModel :StudentModel = await this.studentRepository.createStudent(studentModel);
      return createdStudentModel;
  };

  public async getStudentById(id: string): Promise<StudentModel> {
      const student: StudentModel = await this.studentRepository.getStudentById(id);
      Assert.notNullOrUndefined(student, `Student with ID ${id} not found`);
      return student;
  };

  public async getAllStudents(): Promise<Array<StudentModel>> {
      const students: Array<StudentModel> = await this.studentRepository.getAllStudents();
      Assert.notNullOrUndefined(students, `There are no students yet`);
      return students;
  };

  public async editStudent(editStudentModel:EditStudentModel): Promise<EditStudentModel> {
      const updatedStudent: EditStudentModel = await this.studentRepository.editStudent(editStudentModel);
      Assert.notNullOrUndefined(updatedStudent, `Student with ID ${editStudentModel.id} not found`);
      return updatedStudent;
  };

  public async deleteStudent(id: string): Promise<StudentModel> {
      const student: StudentModel = await this.studentRepository.deleteStudent(id);
      Assert.notNullOrUndefined(student,`Student with ID ${id} not found`);
      return student;
  };

  public async getStudentByLogin(login: string): Promise<StudentModel> {
      const student: StudentModel = await this.studentRepository.getStudentByLogin(login);
      Assert.notNullOrUndefined(student, `Student with login ${login} is null or undefined`);
      return student;
  };

}