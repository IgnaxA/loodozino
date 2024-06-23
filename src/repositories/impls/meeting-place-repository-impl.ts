import { MeetingPlaceRepository } from "../meeting-place-repository";
import { CreateMeetingPlaceModel, MeetingPlaceModel } from "../../models/meeting-place-models";
import { TransactionRunner } from "../../database/transaction-runners/transaction-runner";
import { QueryConstructor } from "../../database/query-constructors/query-constructor";
import { DegreeLevelQueries } from "../queries/degree-level-queries";
import { MeetingPlaceQueries } from "../queries/meeting-place-queries";
import { SingleQueryConstructor } from "../../database/query-constructors/single-query-constructor";
import { Assert } from "../../utils/assert";

export class MeetingPlaceRepositoryImpl implements MeetingPlaceRepository {
  private readonly transactionRunner: TransactionRunner<QueryConstructor>;
  private readonly meetingPlaceQueries: MeetingPlaceQueries;

  constructor(transactionRunner: TransactionRunner<QueryConstructor>, meetingPlaceQueries: MeetingPlaceQueries) {
    this.transactionRunner = transactionRunner;
    this.meetingPlaceQueries = meetingPlaceQueries;
  }
  public async createMeetingPlace(createMeetingPlaceModel: CreateMeetingPlaceModel): Promise<MeetingPlaceModel> {
    const queryConstructors: Array<SingleQueryConstructor> = new Array<SingleQueryConstructor>();

    const meetingPlaceModel: MeetingPlaceModel = this.createModelWithId(createMeetingPlaceModel);

    queryConstructors.push(this.meetingPlaceQueries.createMeetingPlace(
      meetingPlaceModel.id,
      meetingPlaceModel.description,
      meetingPlaceModel.priority,
      meetingPlaceModel.teacherId,
      meetingPlaceModel.offline)
    );

    const results = await this.transactionRunner.run(queryConstructors);

    Assert.notNullOrUndefined(results, `Meeting place could not be created`);

    const meetingPlaceData = results[0][0];

    return {
      id: meetingPlaceData.id,
      description: meetingPlaceData.description,
      priority: meetingPlaceData.priority,
      teacherId: meetingPlaceData.teacher_id,
      offline: meetingPlaceData.offline
    };
  };

  public async getMeetingPlaceById(id: string): Promise<MeetingPlaceModel> {
    const queryConstructors: Array<SingleQueryConstructor> = new Array<SingleQueryConstructor>();

    queryConstructors.push(this.meetingPlaceQueries.getMeetingPlaceById(id));

    const results = await this.transactionRunner.run(queryConstructors);

    Assert.notNullOrUndefined(results, `Meeting place with ID ${id} not found`);

    const meetingPlaceData = results[0][0];

    return {
      id: meetingPlaceData.id,
      description: meetingPlaceData.description,
      priority: meetingPlaceData.priority,
      teacherId: meetingPlaceData.teacher_id,
      offline: meetingPlaceData.offline
    };
  };

  public async getAllMeetingPlaces(): Promise<Array<MeetingPlaceModel>> {
    const queryConstructors: Array<SingleQueryConstructor> = new Array<SingleQueryConstructor>();

    queryConstructors.push(this.meetingPlaceQueries.getAllMeetingPlaces());

    const results = await this.transactionRunner.run(queryConstructors);

    Assert.notNullOrUndefined(results, "There are no meeting places in the database");

    const meetingPlaceData = results[0];

    const meetingPlaceModels = meetingPlaceData.map((data: any) => ({
      id: data.id,
      description: data.description,
      priority: data.priority,
      teacherId: data.teacher_id,
      offline: meetingPlaceData.offline
    }));

    return meetingPlaceModels;
  };

  public async getPriorityMeetingPlaceForTeacher(teacherId: string, offline: boolean): Promise<MeetingPlaceModel> {
    const queryConstructors: Array<SingleQueryConstructor> = new Array<SingleQueryConstructor>();

    queryConstructors.push(this.meetingPlaceQueries.getPriorityMeetingPlace(teacherId, offline));

    const results = await this.transactionRunner.run(queryConstructors);

    Assert.notNullOrUndefined(results, `Priority with 'offline:${offline}' meeting place with Teacher ID ${teacherId} not found`);

    const meetingPlaceData = results[0][0];

    return {
      id: meetingPlaceData.id,
      description: meetingPlaceData.description,
      priority: meetingPlaceData.priority,
      teacherId: meetingPlaceData.teacher_id,
      offline: meetingPlaceData.offline
    };
  };

  public async getAllMeetingPlacesByTeacher(teacherId: string, offline: boolean): Promise<Array<MeetingPlaceModel>> {
    const queryConstructors: Array<SingleQueryConstructor> = new Array<SingleQueryConstructor>();

    queryConstructors.push(this.meetingPlaceQueries.getAllMeetingPlacesByTeacher(teacherId, offline));

    const results = await this.transactionRunner.run(queryConstructors);

    Assert.notNullOrUndefined(results, `Meeting place with 'offline:${offline}' and Teacher ID ${teacherId} not found`);

    const meetingPlaceData = results[0];

    const meetingPlaceModels = meetingPlaceData.map((data: any) => ({
      id: data.id,
      description: data.description,
      priority: data.priority,
      teacherId: data.teacher_id,
      offline: meetingPlaceData.offline
    }));

    return meetingPlaceModels;
  };

  public async editMeetingPlace(meetingPlaceModel: MeetingPlaceModel): Promise<MeetingPlaceModel> {
    const queryConstructors: Array<SingleQueryConstructor> = new Array<SingleQueryConstructor>();

    queryConstructors.push(this.meetingPlaceQueries.editMeetingPlace(
      meetingPlaceModel.id,
      meetingPlaceModel.description,
      meetingPlaceModel.priority,
      meetingPlaceModel.teacherId)
    );

    const results = await this.transactionRunner.run(queryConstructors);

    Assert.notNullOrUndefined(results, `Meeting place with ID ${meetingPlaceModel.id} not found`);

    const meetingPlaceData = results[0][0];

    return {
      id: meetingPlaceData.id,
      description: meetingPlaceData.description,
      priority: meetingPlaceData.priority,
      teacherId: meetingPlaceData.teacher_id,
      offline: meetingPlaceData.offline
    };
  };

  public async deleteMeetingPlace(id: string): Promise<MeetingPlaceModel> {
    const queryConstructors: Array<SingleQueryConstructor> = new Array<SingleQueryConstructor>();

    queryConstructors.push(this.meetingPlaceQueries.deleteMeetingPlace(id));

    const results = await this.transactionRunner.run(queryConstructors);

    Assert.notNullOrUndefined(results, `Meeting place with ID ${id} not found`);

    const meetingPlaceData = results[0][0];

    return {
      id: meetingPlaceData.id,
      description: meetingPlaceData.description,
      priority: meetingPlaceData.priority,
      teacherId: meetingPlaceData.teacher_id,
      offline: meetingPlaceData.offline
    };
  };

  private createModelWithId (createMeetingPlaceModel: CreateMeetingPlaceModel): MeetingPlaceModel {
    const guid: string = crypto.randomUUID();
    return {
      ...createMeetingPlaceModel,
      id: guid,
    };
  };
}