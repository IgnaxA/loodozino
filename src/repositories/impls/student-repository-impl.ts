import { StudentRepository } from "../student-repository";
import { InputStudentModel, StudentModel } from "../../models/student-models";
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
  public async createStudent(studentBody: StudentModel): Promise<StudentModel> {
    const queryConstructors: Array<SingleQueryConstructor> = new Array<SingleQueryConstructor>();

    queryConstructors.push(this.studentQueries.createStudent(
      studentBody.login,
      studentBody.fullName,
      studentBody.phoneNumber,
      studentBody.studyProgramId,
      studentBody.degreeLevelId,
      studentBody.course,
      studentBody.admissionYear,
      studentBody.socials)
    );

    const results = await this.transactionRunner.run(queryConstructors);

    Assert.notNullOrUndefined(results, `Student with login ${studentBody.login} have not been created`);

    const studentData = results[0][0];

    return {
      login: studentData.login,
      fullName: studentData.fullName,
      phoneNumber: studentData.phone_number,
      studyProgramId: studentData.study_program_id,
      degreeLevelId: studentData.degree_level_id,
      course: studentData.course,
      admissionYear: studentData.admission_year,
      socials: studentData.socials,
      teacherLogin: studentData.teacherLogin
    };
  };

  public async getAllStudents(): Promise<Array<StudentModel>> {
    const queryConstructors: Array<SingleQueryConstructor> = new Array<SingleQueryConstructor>();

    queryConstructors.push(this.studentQueries.getAllStudents());

    const results = await this.transactionRunner.run(queryConstructors);

    Assert.notNullOrUndefined(results, "There are no students in the database");

    const studentData = results[0];

    const studentModels = studentData.map((data: any) => ({
      login: data.login,
      fullName: data.full_name,
      phoneNumber: data.phone_number,
      studyProgramId: data.study_program_id,
      degreeLevelId: data.degree_level_id,
      course: data.course,
      admission_year: data.admission_year,
      socials: data.socials,
      teacherLogin: studentData.teacherLogin
    }));

    return studentModels;
  };



  public async getAllStudentsByTeacher(teacherLogin: string): Promise<Array<StudentModel>> {
    const queryConstructors: Array<SingleQueryConstructor> = new Array<SingleQueryConstructor>();

    queryConstructors.push(this.studentQueries.getAllStudentsByTeacher(teacherLogin));

    const results = await this.transactionRunner.run(queryConstructors);

    Assert.notNullOrUndefined(results, `There are no students for the teacher ${teacherLogin} in the database`);

    const studentData = results[0];

    const studentModels = studentData.map((data: any) => ({
      login: data.login,
      fullName: data.full_name,
      phoneNumber: data.phone_number,
      studyProgramId: data.study_program_id,
      degreeLevelId: data.degree_level_id,
      course: data.course,
      admission_year: data.admission_year,
      socials: data.socials,
      teacherLogin: studentData.teacherLogin
    }));

    return studentModels;
  };

  public async editStudent(inputStudentModel: InputStudentModel, login: string): Promise<StudentModel> {
    const queryConstructors: Array<SingleQueryConstructor> = new Array<SingleQueryConstructor>();

    const studentModel: StudentModel = this.createModelWithLogin(inputStudentModel, login);

    queryConstructors.push(this.studentQueries.editStudent(
      studentModel.login,
      studentModel.fullName,
      studentModel.phoneNumber,
      studentModel.studyProgramId,
      studentModel.degreeLevelId,
      studentModel.course,
      studentModel.admissionYear,
      studentModel.socials,
      studentModel.teacherLogin
      )
    );

    const results = await this.transactionRunner.run(queryConstructors);

    Assert.notNullOrUndefined(results, `Student with login ${login} not found`);

    const studentData = results[0][0];

    return {
      login: studentData.login,
      fullName: studentData.full_name,
      phoneNumber: studentData.phone_number,
      studyProgramId: studentData.study_program_id,
      degreeLevelId: studentData.degree_level_id,
      course: studentData.course,
      admissionYear: studentData.admission_year,
      socials: studentData.socials,
      teacherLogin: studentData.teacherLogin
    };
  };

  public async deleteStudent(login: string): Promise<StudentModel> {
    const queryConstructors: Array<SingleQueryConstructor> = new Array<SingleQueryConstructor>();

    queryConstructors.push(this.studentQueries.deleteStudent(login));

    const results = await this.transactionRunner.run(queryConstructors);

    Assert.notNullOrUndefined(results, `Student with login ${login} not found`);

    const studentData = results[0][0];

    return {
      login:studentData.login,
      fullName: studentData.full_name,
      phoneNumber: studentData.phone_number,
      studyProgramId: studentData.study_program_id,
      degreeLevelId: studentData.degree_level_id,
      course: studentData.course,
      admissionYear: studentData.admission_year,
      socials: studentData.socials,
      teacherLogin: studentData.teacherLogin
    };
  };

  public async getStudentByLogin(login: string): Promise<StudentModel> {
    const queryConstructors: Array<SingleQueryConstructor> = new Array<SingleQueryConstructor>();
    queryConstructors.push(this.studentQueries.getStudentByLogin(login));
    let results = await this.transactionRunner.run(queryConstructors);

    if (!results[0].length) {
      const queryConstructors2: Array<SingleQueryConstructor> = new Array<SingleQueryConstructor>();
      queryConstructors2.push(this.studentQueries.createStudentByLogin(login));

      results = await this.transactionRunner.run(queryConstructors2);
      Assert.notNullOrUndefined(results, `Student with login ${login} could not been created`);
    }

    const studentData = results[0][0];

    return {
      login:studentData.login,
      fullName: studentData.full_name,
      phoneNumber: studentData.phone_number,
      studyProgramId: studentData.study_program_id,
      degreeLevelId: studentData.degree_level_id,
      course: studentData.course,
      admissionYear: studentData.admission_year,
      socials: studentData.socials,
      teacherLogin: studentData.teacherLogin
    }
  }

  private createModelWithLogin (inputStudentModel: InputStudentModel, login: string): StudentModel {
    return {
      ...inputStudentModel,
      login: login,
    };
  };
}