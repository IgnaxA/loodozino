import { TeacherRepository } from "../teacher-repository";
import { InputTeacherModel, TeacherModel } from "../../models/teacher-models";
import { TransactionRunner } from "../../database/transaction-runners/transaction-runner";
import { QueryConstructor } from "../../database/query-constructors/query-constructor";
import { TeacherQueries } from "../queries/teacher-queries";
import { SingleQueryConstructor } from "../../database/query-constructors/single-query-constructor";
import { Assert } from "../../utils/assert";

export class TeacherRepositoryImpl implements TeacherRepository {
  private readonly transactionRunner: TransactionRunner<QueryConstructor>;
  private readonly teacherQueries: TeacherQueries;

  constructor(transactionRunner: TransactionRunner<QueryConstructor>, teacherQueries: TeacherQueries) {
    this.transactionRunner = transactionRunner;
    this.teacherQueries = teacherQueries;
  }
  public async createTeacher(inputTeacherModel: InputTeacherModel, login: string): Promise<TeacherModel> {
    const queryConstructors: Array<SingleQueryConstructor> = new Array<SingleQueryConstructor>();

    const teacherModel: TeacherModel = this.createModelWithLogin(inputTeacherModel, login);

    queryConstructors.push(this.teacherQueries.createTeacher(
      teacherModel.login,
      teacherModel.fullName,
      teacherModel.phoneNumber,
      teacherModel.position,
      teacherModel.socials)
    );

    const results = await this.transactionRunner.run(queryConstructors);

    Assert.notNullOrUndefined(results, `Teacher could not be created`);

    const teacherData = results[0][0];

    return {
      login: teacherData.login,
      fullName: teacherData.full_name,
      phoneNumber: teacherData.phone_number,
      position: teacherData.position,
      socials: teacherData.socials
    };
  };

  public async getAllTeachers(): Promise<Array<TeacherModel>> {
    const queryConstructors: Array<SingleQueryConstructor> = new Array<SingleQueryConstructor>();

    queryConstructors.push(this.teacherQueries.getAllTeachers());

    const results = await this.transactionRunner.run(queryConstructors);

    Assert.notNullOrUndefined(results, "There are no teachers in the database");

    const teacherData = results[0];

    const teacherModels = teacherData.map((data: any) => ({
      id: data.id,
      login: data.login,
      fullName: data.full_name,
      phoneNumber: data.phone_number,
      position: data.position,
      socials: data.socials
    }));

    return teacherModels;
  };

  public async editTeacher(inputTeacherModel: InputTeacherModel, login: string): Promise<TeacherModel> {
    const queryConstructors: Array<SingleQueryConstructor> = new Array<SingleQueryConstructor>();

    const teacherModel: TeacherModel = this.createModelWithLogin(inputTeacherModel, login);

    queryConstructors.push(this.teacherQueries.editTeacher(
      teacherModel.login,
      teacherModel.fullName,
      teacherModel.phoneNumber,
      teacherModel.position,
      teacherModel.socials
    ));

    const results = await this.transactionRunner.run(queryConstructors);

    Assert.notNullOrUndefined(results, `Teacher with login ${login} not found`);

    const teacherData = results[0][0];

    return {
      login: teacherData.login,
      fullName: teacherData.full_name,
      phoneNumber: teacherData.phone_number,
      position: teacherData.position,
      socials: teacherData.socials
    };
  };

  public async deleteTeacher(login: string): Promise<TeacherModel> {
    const queryConstructors: Array<SingleQueryConstructor> = new Array<SingleQueryConstructor>();

    queryConstructors.push(this.teacherQueries.deleteTeacher(login));

    const results = await this.transactionRunner.run(queryConstructors);

    Assert.notNullOrUndefined(results, `Teacher with login ${login} not found`);

    const teacherData = results[0][0];

    return {
      login:teacherData.login,
      fullName: teacherData.full_name,
      phoneNumber: teacherData.phone_number,
      position: teacherData.position,
      socials: teacherData.socials
    };
  };

  public async getTeacherByLogin(login: string): Promise<TeacherModel> {
    const queryConstructors: Array<SingleQueryConstructor> = new Array<SingleQueryConstructor>();
    queryConstructors.push(this.teacherQueries.getTeacherByLogin(login));
    let results = await this.transactionRunner.run(queryConstructors);

    if (!results[0].length) {
      const queryConstructors2: Array<SingleQueryConstructor> = new Array<SingleQueryConstructor>();
      queryConstructors2.push(this.teacherQueries.createTeacherByLogin(login));

      results = await this.transactionRunner.run(queryConstructors2);
    }

    const teacherData = results[0][0];

    return {
      login:teacherData.login,
      fullName: teacherData.full_name,
      phoneNumber: teacherData.phone_number,
      position: teacherData.position,
      socials: teacherData.socials
    };
  };

  private createModelWithLogin (inputTeacherModel: InputTeacherModel, login: string): TeacherModel {
    return {
      ...inputTeacherModel,
      login: login,
    };
  };
}