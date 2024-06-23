import { DegreeLevelRepository } from "../degree-level-repository";
import { TransactionRunner } from "../../database/transaction-runners/transaction-runner";
import { QueryConstructor } from "../../database/query-constructors/query-constructor";
import { SingleQueryConstructor } from "../../database/query-constructors/single-query-constructor";
import { Assert } from "../../utils/assert";
import { DegreeLevelQueries } from "../queries/degree-level-queries";
import { CreateDegreeLevelModel, DegreeLevelModel } from "../../models/degree-level-models";

export class DegreeLevelRepositoryImpl implements DegreeLevelRepository {
  private readonly transactionRunner: TransactionRunner<QueryConstructor>;
  private readonly degreeLevelQueries: DegreeLevelQueries;

  constructor(transactionRunner: TransactionRunner<QueryConstructor>, degreeLevelQueries: DegreeLevelQueries) {
    this.transactionRunner = transactionRunner;
    this.degreeLevelQueries = degreeLevelQueries;
  }
  public async createDegreeLevel(createDegreeLevelModel:CreateDegreeLevelModel): Promise<DegreeLevelModel> {
    const queryConstructors: Array<SingleQueryConstructor> = new Array<SingleQueryConstructor>();

    const degreeLevelModel: DegreeLevelModel = this.createModelWithId(createDegreeLevelModel);

    queryConstructors.push(this.degreeLevelQueries.createDegreeLevel(
      degreeLevelModel.id,
      degreeLevelModel.name)
    );

    const results = await this.transactionRunner.run(queryConstructors);

    Assert.notNullOrUndefined(results, `Degree level could not be created`);

    const degreeLevelData = results[0][0];

    return {
      id: degreeLevelData.id,
      name: degreeLevelData.name
    };
  };

  public async getDegreeLevelById(id: string): Promise<DegreeLevelModel> {
    const queryConstructors: Array<SingleQueryConstructor> = new Array<SingleQueryConstructor>();

    queryConstructors.push(this.degreeLevelQueries.getDegreeLevelById(id));

    const results = await this.transactionRunner.run(queryConstructors);

    Assert.notNullOrUndefined(results, `Degree level with ID ${id} not found`);

    const degreeLevelData = results[0][0];

    return {
      id: degreeLevelData.id,
      name: degreeLevelData.name
    };
  };

  public async getAllDegreeLevels(): Promise<Array<DegreeLevelModel>> {
    const queryConstructors: Array<SingleQueryConstructor> = new Array<SingleQueryConstructor>();

    queryConstructors.push(this.degreeLevelQueries.getAllDegreeLevels());

    const results = await this.transactionRunner.run(queryConstructors);

    Assert.notNullOrUndefined(results, "There are no degree levels in the database");

    const degreeLevelData = results[0];

    const degreeLevelModels = degreeLevelData.map((data: any) => ({
      id: data.id,
      name: data.name
    }));

    return degreeLevelModels;
  };

  public async editDegreeLevel(degreeLevelModel:DegreeLevelModel): Promise<DegreeLevelModel> {
    const queryConstructors: Array<SingleQueryConstructor> = new Array<SingleQueryConstructor>();

    queryConstructors.push(this.degreeLevelQueries.editDegreeLevel(
      degreeLevelModel.id,
      degreeLevelModel.name)
    );

    const results = await this.transactionRunner.run(queryConstructors);

    Assert.notNullOrUndefined(results, `Degree level with ID ${degreeLevelModel.id} not found`);

    const degreeLevelData = results[0][0];

    return {
      id: degreeLevelData.id,
      name: degreeLevelData.name
    };
  };

  public async deleteDegreeLevel(id: string): Promise<DegreeLevelModel> {
    const queryConstructors: Array<SingleQueryConstructor> = new Array<SingleQueryConstructor>();

    queryConstructors.push(this.degreeLevelQueries.deleteDegreeLevel(id));

    const results = await this.transactionRunner.run(queryConstructors);

    Assert.notNullOrUndefined(results, `Degree level with ID ${id} not found`);

    const degreeLevelData = results[0][0];

    return {
      id: degreeLevelData.id,
      name:degreeLevelData.name
    };
  };

  private createModelWithId (createDegreeLevelModel: CreateDegreeLevelModel): DegreeLevelModel {
    const guid: string = crypto.randomUUID();
    return {
      ...createDegreeLevelModel,
      id: guid,
    };
  };
}