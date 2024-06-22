import { StudentService } from "../student-service";
import { StudentRepository } from "../../repositories/student-repository";
import { EditTeacherModel, TeacherModel } from "../../models/teacher-models";
import { Assert } from "../../utils/assert";
import { EditStudentModel, StudentModel } from "../../models/student-models";

export class StudentServiceImpl implements StudentService {
  private readonly studentRepository: StudentRepository;

  constructor(studentRepository: StudentRepository) {
    this.studentRepository = studentRepository;
  }

  public async createStudent(studentModel: StudentModel): Promise<StudentModel> {
    await this.studentRepository.createStudent(studentModel);
    return studentModel;
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
}