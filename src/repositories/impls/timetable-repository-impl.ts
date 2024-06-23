import { TimetableRepository } from "../timetable-repository";
import { InputTimetableModel, TimetableModel } from "../../models/timetable-models";
import { TimetableQueries } from "../queries/timetable-queries";
import { TransactionRunner } from "../../database/transaction-runners/transaction-runner";
import { QueryConstructor } from "../../database/query-constructors/query-constructor";
import { SingleQueryConstructor } from "../../database/query-constructors/single-query-constructor";
import { Assert } from "../../utils/assert";

export class TimetableRepositoryImpl implements TimetableRepository {
  private readonly transactionRunner: TransactionRunner<QueryConstructor>;
  private readonly timetableQueries: TimetableQueries;

  constructor(transactionRunner: TransactionRunner<QueryConstructor>, timetableQueries: TimetableQueries) {
    this.timetableQueries = timetableQueries;
    this.transactionRunner = transactionRunner;
  }

  public async createTimetable(inputTimetableModel: InputTimetableModel) : Promise<TimetableModel> {
    const queryConstructors: Array<SingleQueryConstructor> = new Array<SingleQueryConstructor>();

    const guid: string = crypto.randomUUID();
    queryConstructors.push(this.timetableQueries.createTimetable(
      guid,
      inputTimetableModel.meetingDate,
      inputTimetableModel.place,
      inputTimetableModel.additionalInfo,
      inputTimetableModel.teacherLogin,
      inputTimetableModel.studentLogin)
    );

    const results = await this.transactionRunner.run(queryConstructors);

    Assert.notNullOrUndefined(results, `Timetable could not be created`);

    const timetableData = results[0][0];

    return {
      id: timetableData.id,
      meetingDate: timetableData.meeting_date,
      place: timetableData.place,
      additionalInfo: timetableData.additional_info,
      teacherLogin: timetableData.teacher_login,
      studentLogin: timetableData.student_login
    };
  };

  public async editTimetable(timetableModel: TimetableModel) : Promise<TimetableModel> {
    const queryConstructors: Array<SingleQueryConstructor> = new Array<SingleQueryConstructor>();

    queryConstructors.push(this.timetableQueries.editTimetable(
      timetableModel.id,
      timetableModel.meetingDate,
      timetableModel.place,
      timetableModel.additionalInfo,
      timetableModel.teacherLogin,
      timetableModel.studentLogin)
    );

    const results = await this.transactionRunner.run(queryConstructors);

    Assert.notNullOrUndefined(results, `Timetable with ID ${timetableModel.id} not found`);

    const timetableData = results[0][0];

    return {
      id: timetableData.id,
      meetingDate: timetableData.meeting_date,
      place: timetableData.place,
      additionalInfo: timetableData.additional_info,
      teacherLogin: timetableData.teacher_login,
      studentLogin: timetableData.student_login
    };
  };

  public async deleteTimetable(id: string) : Promise<TimetableModel> {
    const queryConstructors: Array<SingleQueryConstructor> = new Array<SingleQueryConstructor>();

    queryConstructors.push(this.timetableQueries.deleteTimetable(id)
    );

    const results = await this.transactionRunner.run(queryConstructors);

    Assert.notNullOrUndefined(results, `Timetable with ID ${id} not found`);

    const timetableData = results[0][0];

    return {
      id: timetableData.id,
      meetingDate: timetableData.meeting_date,
      place: timetableData.place,
      additionalInfo: timetableData.additional_info,
      teacherLogin: timetableData.teacher_login,
      studentLogin: timetableData.student_login
    };
  };

  public async getTimetableById(id: string): Promise<TimetableModel> {
    const queryConstructors: Array<SingleQueryConstructor> = new Array<SingleQueryConstructor>();

    queryConstructors.push(this.timetableQueries.getTimetableById(id));

    const results = await this.transactionRunner.run(queryConstructors);

    Assert.notNullOrUndefined(results, `Timetable with ID ${id} not found`);

    const timetableData = results[0][0];

    return {
      id: timetableData.id,
      meetingDate: timetableData.meeting_date,
      place: timetableData.place,
      additionalInfo: timetableData.additional_info,
      teacherLogin: timetableData.teacher_login,
      studentLogin: timetableData.student_login
    };
  };

  public async getAllTimetables() : Promise<Array<TimetableModel>> {
    const queryConstructors: Array<SingleQueryConstructor> = new Array<SingleQueryConstructor>();

    queryConstructors.push(this.timetableQueries.getAllTimetables());

    const results = await this.transactionRunner.run(queryConstructors);

    Assert.notNullOrUndefined(results, `Timetables not found`);

    const timetableData = results[0];

    const timetableModels = timetableData.map((data: any) => ({
      id: data.id,
      meetingDate: data.meeting_date,
      place: data.place,
      additionalInfo: data.additional_info,
      teacherLogin: data.teacher_login,
      studentLogin: data.student_login
    }));

    return timetableModels;
  };

  public async getAllTimetablesByMonthByTeacher(month: number, year: number, teacherLogin: string) : Promise<Array<TimetableModel>> {
    const queryConstructors: Array<SingleQueryConstructor> = new Array<SingleQueryConstructor>();

    queryConstructors.push(this.timetableQueries.getAllTimetablesByMonthByTeacher(month, year, teacherLogin));

    const results = await this.transactionRunner.run(queryConstructors);

    Assert.notNullOrUndefined(results, `Timetables in ${month}.${year} for teacher ${teacherLogin} not found`);

    const timetableData = results[0];

    const timetableModels = timetableData.map((data: any) => ({
      id: data.id,
      meetingDate: data.meeting_date,
      place: data.place,
      additionalInfo: data.additional_info,
      teacherLogin: data.teacher_login,
      studentLogin: data.student_login
    }));

    return timetableModels;
  };

  public async getAllTimetablesByMonthByStudent(month: number, year: number, studentLogin: string) : Promise<Array<TimetableModel>> {
    const queryConstructors: Array<SingleQueryConstructor> = new Array<SingleQueryConstructor>();

    queryConstructors.push(this.timetableQueries.getAllTimetablesByMonthByStudent(month, year, studentLogin));

    const results = await this.transactionRunner.run(queryConstructors);

    Assert.notNullOrUndefined(results, `Timetables in ${month}.${year} for student ${studentLogin} not found`);

    const timetableData = results[0];

    const timetableModels = timetableData.map((data: any) => ({
      id: data.id,
      meetingDate: data.meeting_date,
      place: data.place,
      additionalInfo: data.additional_info,
      teacherLogin: data.teacher_login,
      studentLogin: data.student_login
    }));

    return timetableModels;
  };

  public async getAllTimetablesByTeacher(teacherLogin: string): Promise<Array<TimetableModel>> {
    const queryConstructors: Array<SingleQueryConstructor> = new Array<SingleQueryConstructor>();

    queryConstructors.push(this.timetableQueries.getAllTimetablesByTeacher(teacherLogin));

    const results = await this.transactionRunner.run(queryConstructors);

    Assert.notNullOrUndefined(results, `Timetables for teacher ${teacherLogin} not found`);

    const timetableData = results[0];

    const timetableModels = timetableData.map((data: any) => ({
      id: data.id,
      meetingDate: data.meeting_date,
      place: data.place,
      additionalInfo: data.additional_info,
      teacherLogin: data.teacher_login,
      studentLogin: data.student_login
    }));

    return timetableModels;
  };

  public async getAllTimetablesByStudent(studentLogin: string): Promise<Array<TimetableModel>> {
    const queryConstructors: Array<SingleQueryConstructor> = new Array<SingleQueryConstructor>();

    queryConstructors.push(this.timetableQueries.getAllTimetablesByStudent(studentLogin));

    const results = await this.transactionRunner.run(queryConstructors);

    Assert.notNullOrUndefined(results, `Timetables for student ${studentLogin} not found`);

    const timetableData = results[0];

    const timetableModels = timetableData.map((data: any) => ({
      id: data.id,
      meetingDate: data.meeting_date,
      place: data.place,
      additionalInfo: data.additional_info,
      teacherLogin: data.teacher_login,
      studentLogin: data.student_login
    }));

    return timetableModels;
  };
}