import { StudentRepository } from "../student-repository";
import { EditStudentModel, StudentModel } from "../../models/student-models";
import { TransactionRunner } from "../../database/transaction-runners/transaction-runner";
import { QueryConstructor } from "../../database/query-constructors/query-constructor";
import { StudentQueries } from "../queries/student-queries";
import { SingleQueryConstructor } from "../../database/query-constructors/single-query-constructor";
import { Assert } from "../../utils/assert";

export class StudentRepositoryImpl implements StudentRepository {
  private readonly transactionRunner: TransactionRunner<QueryConstructor>;
  private readonly studentQueries: StudentQueries;

  constructor(transactionRunner: TransactionRunner<QueryConstructor>, studentQueries: StudentQueries) {
    this.transactionRunner = transactionRunner;
    this.studentQueries = studentQueries;
  }
  public async createStudent(studentModel: StudentModel): Promise<void> {
    const queryConstructors: Array<SingleQueryConstructor> = new Array<SingleQueryConstructor>();

    queryConstructors.push(this.studentQueries.createStudent(
      studentModel.id,
      studentModel.login,
      studentModel.fullName,
      studentModel.phoneNumber,
      studentModel.studyProgramId,
      studentModel.degreeLevelId,
      studentModel.course,
      studentModel.admissionYear,
      studentModel.socials)
    );

    await this.transactionRunner.run(queryConstructors);
  };

  public async getStudentById(id: string): Promise<StudentModel> {
    const queryConstructors: Array<SingleQueryConstructor> = new Array<SingleQueryConstructor>();

    queryConstructors.push(this.studentQueries.getStudentById(id)
    );

    const results = await this.transactionRunner.run(queryConstructors);

    Assert.notNullOrUndefined(results, `Student with ID ${id} not found`);

    const studentData = results[0][0];

    return {
      id: studentData.id,
      login: studentData.login,
      fullName: studentData.fullName,
      phoneNumber: studentData.phone_number,
      studyProgramId: studentData.study_program_id,
      degreeLevelId: studentData.degree_level_id,
      course: studentData.course,
      admissionYear: studentData.admission_year,
      socials: studentData.socials
    };
  };

  public async getAllStudents(): Promise<Array<StudentModel>> {
    const queryConstructors: Array<SingleQueryConstructor> = new Array<SingleQueryConstructor>();

    queryConstructors.push(this.studentQueries.getAllStudents());

    const results = await this.transactionRunner.run(queryConstructors);

    Assert.notNullOrUndefined(results, "There are no students in the database");

    const studentData = results[0];

    const studentModels = studentData.map((data: any) => ({
      id: data.id,
      login: data.login,
      fullName: data.full_name,
      phoneNumber: data.phone_number,
      studyProgramId: data.study_program_id,
      degreeLevelId: data.degree_level_id,
      course: data.course,
      admission_year: data.admission_year,
      socials: data.socials
    }));

    return studentModels;
  };

  public async editStudent(editStudentModel: EditStudentModel): Promise<EditStudentModel> {
    const queryConstructors: Array<SingleQueryConstructor> = new Array<SingleQueryConstructor>();

    queryConstructors.push(this.studentQueries.editStudent(
      editStudentModel.id,
      editStudentModel.fullName,
      editStudentModel.phoneNumber,
      editStudentModel.studyProgramId,
      editStudentModel.degreeLevelId,
      editStudentModel.course,
      editStudentModel.admissionYear,
      editStudentModel.socials
      )
    );

    const results = await this.transactionRunner.run(queryConstructors);

    Assert.notNullOrUndefined(results, `Student with ID ${editStudentModel.id} not found`);

    const studentData = results[0][0];

    return {
      id: studentData.id,
      fullName: studentData.full_name,
      phoneNumber: studentData.phone_number,
      studyProgramId: studentData.study_program_id,
      degreeLevelId: studentData.degree_level_id,
      course: studentData.course,
      admissionYear: studentData.admission_year,
      socials: studentData.socials
    };
  };

  public async deleteStudent(id: string): Promise<StudentModel> {
    const queryConstructors: Array<SingleQueryConstructor> = new Array<SingleQueryConstructor>();

    queryConstructors.push(this.studentQueries.deleteStudent(id));

    const results = await this.transactionRunner.run(queryConstructors);

    Assert.notNullOrUndefined(results, `Student with ID ${id} not found`);

    const studentData = results[0][0];

    return {
      id: studentData.id,
      login:studentData.login,
      fullName: studentData.full_name,
      phoneNumber: studentData.phone_number,
      studyProgramId: studentData.study_program_id,
      degreeLevelId: studentData.degree_level_id,
      course: studentData.course,
      admissionYear: studentData.admission_year,
      socials: studentData.socials
    };
  };
}