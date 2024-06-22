import { StudyProgramRepository } from "../study-program-repository";
import { TransactionRunner } from "../../database/transaction-runners/transaction-runner";
import { QueryConstructor } from "../../database/query-constructors/query-constructor";
import { StudyProgramQueries } from "../queries/study-program-queries";
import { StudyProgramModel } from "../../models/study-program-models";
import { SingleQueryConstructor } from "../../database/query-constructors/single-query-constructor";
import { Assert } from "../../utils/assert";

export class StudyProgramRepositoryImpl implements StudyProgramRepository {
  private readonly transactionRunner: TransactionRunner<QueryConstructor>;
  private readonly studyProgramQueries: StudyProgramQueries;

  constructor(transactionRunner: TransactionRunner<QueryConstructor>, studyProgramQueries: StudyProgramQueries) {
    this.transactionRunner = transactionRunner;
    this.studyProgramQueries = studyProgramQueries;
  }

  public async createStudyProgram(studyProgramModel: StudyProgramModel): Promise<void> {
    const queryConstructors: Array<SingleQueryConstructor> = new Array<SingleQueryConstructor>();

    queryConstructors.push(this.studyProgramQueries.createStudyProgram(
      studyProgramModel.id,
      studyProgramModel.name)
    );

    await this.transactionRunner.run(queryConstructors);
  };

  public async getStudyProgramById(id: string): Promise<StudyProgramModel> {
    const queryConstructors: Array<SingleQueryConstructor> = new Array<SingleQueryConstructor>();

    queryConstructors.push(this.studyProgramQueries.getStudyProgramById(id));

    const results = await this.transactionRunner.run(queryConstructors);

    Assert.notNullOrUndefined(results, `Study program with ID ${id} not found`);

    const studyProgramData = results[0][0];

    return {
      id: studyProgramData.id,
      name: studyProgramData.name
    };
  };

  public async getAllStudyPrograms(): Promise<Array<StudyProgramModel>> {
    const queryConstructors: Array<SingleQueryConstructor> = new Array<SingleQueryConstructor>();

    queryConstructors.push(this.studyProgramQueries.getAllStudyPrograms());

    const results = await this.transactionRunner.run(queryConstructors);

    Assert.notNullOrUndefined(results, "There are no study programs in the database");

    const studyProgramData = results[0];

    const studyProgramModels = studyProgramData.map((data: any) => ({
      id: data.id,
      name: data.name
    }));

    return studyProgramModels;
  };

  public async editStudyProgram(studyProgramModel: StudyProgramModel): Promise<StudyProgramModel> {
    const queryConstructors: Array<SingleQueryConstructor> = new Array<SingleQueryConstructor>();

    queryConstructors.push(this.studyProgramQueries.editStudyProgram(
      studyProgramModel.id,
      studyProgramModel.name)
    );

    const results = await this.transactionRunner.run(queryConstructors);

    Assert.notNullOrUndefined(results, `Study program with ID ${studyProgramModel.id} not found`);

    const studyProgramData = results[0][0];

    return {
      id: studyProgramData.id,
      name: studyProgramData.name
    };
  };

  public async deleteStudyProgram(id: string): Promise<StudyProgramModel> {
    const queryConstructors: Array<SingleQueryConstructor> = new Array<SingleQueryConstructor>();

    queryConstructors.push(this.studyProgramQueries.deleteStudyProgram(id));

    const results = await this.transactionRunner.run(queryConstructors);

    Assert.notNullOrUndefined(results, `Study program with ID ${id} not found`);

    const studyProgramData = results[0][0];

    return {
      id: studyProgramData.id,
      name: studyProgramData.name
    };
  };
}