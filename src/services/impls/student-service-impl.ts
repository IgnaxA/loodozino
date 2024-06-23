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
    try {
      const createdStudentModel :StudentModel = await this.studentRepository.createStudent(studentModel);
      return createdStudentModel;
    } catch (err: any) {
      ErrorHandler.throwError(err, "Error when create student");
    }
  };

  public async getStudentById(id: string): Promise<StudentModel> {
    try {
      const student: StudentModel = await this.studentRepository.getStudentById(id);
      Assert.notNullOrUndefined(student, `Student with ID ${id} not found`);
      return student;
    } catch (err: any) {
      ErrorHandler.throwError(err, "Error when get student by id");
    }
  };

  public async getAllStudents(): Promise<Array<StudentModel>> {
    try {
      const students: Array<StudentModel> = await this.studentRepository.getAllStudents();
      Assert.notNullOrUndefined(students, `There are no students yet`);
      return students;
    } catch (err: any) {
      ErrorHandler.throwError(err, "Error when get all students");
    }
  };

  public async editStudent(editStudentModel:EditStudentModel): Promise<EditStudentModel> {
    try {
      const updatedStudent: EditStudentModel = await this.studentRepository.editStudent(editStudentModel);
      Assert.notNullOrUndefined(updatedStudent, `Student with ID ${editStudentModel.id} not found`);
      return updatedStudent;
    } catch (err: any) {
      ErrorHandler.throwError(err, "Error when edit student");
    }
  };

  public async deleteStudent(id: string): Promise<StudentModel> {
    try {
      const student: StudentModel = await this.studentRepository.deleteStudent(id);
      Assert.notNullOrUndefined(student,`Student with ID ${id} not found`);
      return student;
    } catch (err: any) {
      ErrorHandler.throwError(err, "Error when delete student");
    }
  };

  public async getStudentByLogin(login: string): Promise<StudentModel> {
    try {
      const student: StudentModel = await this.studentRepository.getStudentByLogin(login);
      Assert.notNullOrUndefined(student, `Student with login ${login} is null or undefined`);
      return student;
    } catch (err: any) {
      ErrorHandler.throwError(err, "Error when get student by login");
    }
  };

}