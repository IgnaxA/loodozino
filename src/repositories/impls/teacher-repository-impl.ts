import { TeacherRepository } from "../teacher-repository";
import { EditTeacherModel, TeacherModel } from "../../models/teacher-models";
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
  public async createTeacher(teacherModel: TeacherModel): Promise<void> {
    const queryConstructors: Array<SingleQueryConstructor> = new Array<SingleQueryConstructor>();

    queryConstructors.push(this.teacherQueries.createTeacher(
      teacherModel.id,
      teacherModel.login,
      teacherModel.fullName,
      teacherModel.phoneNumber,
      teacherModel.position,
      teacherModel.socials)
    );

    await this.transactionRunner.run(queryConstructors);
  };

  public async getTeacherById(id: string): Promise<TeacherModel> {
    const queryConstructors: Array<SingleQueryConstructor> = new Array<SingleQueryConstructor>();

    queryConstructors.push(this.teacherQueries.getTeacherById(id));

    const results = await this.transactionRunner.run(queryConstructors);

    Assert.notNullOrUndefined(results, `Teacher with ID ${id} not found`);

    const teacherData = results[0][0];

    return {
      id: teacherData.id,
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

  public async editTeacher(editTeacherModel: EditTeacherModel): Promise<EditTeacherModel> {
    const queryConstructors: Array<SingleQueryConstructor> = new Array<SingleQueryConstructor>();

    queryConstructors.push(this.teacherQueries.editTeacher(
      editTeacherModel.id,
      editTeacherModel.fullName,
      editTeacherModel.phoneNumber,
      editTeacherModel.position,
      editTeacherModel.socials
    ));

    const results = await this.transactionRunner.run(queryConstructors);

    Assert.notNullOrUndefined(results, `Teacher with ID ${editTeacherModel.id} not found`);

    const teacherData = results[0][0];

    return {
      id: teacherData.id,
      fullName: teacherData.full_name,
      phoneNumber: teacherData.phone_number,
      position: teacherData.position,
      socials: teacherData.socials
    };
  };

  public async deleteTeacher(id: string): Promise<TeacherModel> {
    const queryConstructors: Array<SingleQueryConstructor> = new Array<SingleQueryConstructor>();

    queryConstructors.push(this.teacherQueries.deleteTeacher(id));

    const results = await this.transactionRunner.run(queryConstructors);

    Assert.notNullOrUndefined(results, `Teacher with ID ${id} not found`);

    const teacherData = results[0][0];

    return {
      id: teacherData.id,
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
    const results = await this.transactionRunner.run(queryConstructors);

    if (!results) {
      const guid: string = crypto.randomUUID();
      queryConstructors.push(this.teacherQueries.createTeacherByLogin(guid, login));

      const results = await this.transactionRunner.run(queryConstructors);
    }

    const teacherData = results[0][0];

    return {
      id: teacherData.id,
      login:teacherData.login,
      fullName: teacherData.full_name,
      phoneNumber: teacherData.phone_number,
      position: teacherData.position,
      socials: teacherData.socials
    };
  };
}