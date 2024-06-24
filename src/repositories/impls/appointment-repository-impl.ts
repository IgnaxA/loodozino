import { AppointmentRepository } from "../appointment-repository";
import { InputAppointmentModel, AppointmentModel, AppointmentInfo } from "../../models/appointment-models";
import { AppointmentQueries } from "../queries/appointment-queries";
import { TransactionRunner } from "../../database/transaction-runners/transaction-runner";
import { QueryConstructor } from "../../database/query-constructors/query-constructor";
import { SingleQueryConstructor } from "../../database/query-constructors/single-query-constructor";
import { Assert } from "../../utils/assert";
import { ParseHelper } from "../../utils/parse-helper";

export class AppointmentRepositoryImpl implements AppointmentRepository {
  private readonly transactionRunner: TransactionRunner<QueryConstructor>;
  private readonly appointmentQueries: AppointmentQueries;

  constructor(transactionRunner: TransactionRunner<QueryConstructor>, appointmentQueries: AppointmentQueries) {
    this.appointmentQueries = appointmentQueries;
    this.transactionRunner = transactionRunner;
  }

  public async createAppointment(appointmentInfo: AppointmentInfo, teacherLogin: string) : Promise<AppointmentModel> {
    const queryConstructors: Array<SingleQueryConstructor> = new Array<SingleQueryConstructor>();

    const appointmentModel: AppointmentModel = this.createModelWithLogin(appointmentInfo, teacherLogin);
    queryConstructors.push(this.appointmentQueries.createAppointment(
      appointmentModel.id,
      appointmentModel.meetingDate,
      appointmentModel.place,
      appointmentModel.additionalInfo,
      appointmentModel.teacherLogin)
    );

    const results = await this.transactionRunner.run(queryConstructors);

    Assert.notNullOrUndefined(results, `Appointment could not be created`);

    const appointmentData = results[0][0];

    return {
      id: appointmentData.id,
      meetingDate: appointmentData.meeting_date,
      place: appointmentData.place,
      additionalInfo: appointmentData.additional_info,
      teacherLogin: appointmentData.teacher_login
    };
  };

  public async editAppointmentInfo(appointmentInfo: AppointmentInfo, teacherLogin: string) : Promise<AppointmentModel> {
    const queryConstructors: Array<SingleQueryConstructor> = new Array<SingleQueryConstructor>();

    queryConstructors.push(this.appointmentQueries.editAppointment(
      appointmentInfo.id,
      appointmentInfo.meetingDate,
      appointmentInfo.place,
      appointmentInfo.additionalInfo,
      teacherLogin)
    );

    const results = await this.transactionRunner.run(queryConstructors);

    Assert.notNullOrUndefined(results, `Appointment with ID ${appointmentInfo.id} not found`);

    const appointmentData = results[0][0];

    return {
      id: appointmentData.id,
      meetingDate: appointmentData.meeting_date,
      place: appointmentData.place,
      additionalInfo: appointmentData.additional_info,
      teacherLogin: appointmentData.teacher_login
    };
  };

  public async deleteAppointment(id: string) : Promise<AppointmentModel> {
    const queryConstructors: Array<SingleQueryConstructor> = new Array<SingleQueryConstructor>();

    queryConstructors.push(this.appointmentQueries.deleteAppointment(id)
    );

    const results = await this.transactionRunner.run(queryConstructors);

    Assert.notNullOrUndefined(results, `Appointment with ID ${id} not found`);

    const appointmentData = results[0][0];

    return {
      id: appointmentData.id,
      meetingDate: appointmentData.meeting_date,
      place: appointmentData.place,
      additionalInfo: appointmentData.additional_info,
      teacherLogin: appointmentData.teacher_login
    };
  };

  public async getAppointmentById(id: string): Promise<AppointmentModel> {
    const queryConstructors: Array<SingleQueryConstructor> = new Array<SingleQueryConstructor>();

    queryConstructors.push(this.appointmentQueries.getAppointmentById(id));

    const results = await this.transactionRunner.run(queryConstructors);

    Assert.notNullOrUndefined(results, `Appointment with ID ${id} not found`);

    const appointmentData = results[0][0];

    return {
      id: appointmentData.id,
      meetingDate: appointmentData.meeting_date,
      place: appointmentData.place,
      additionalInfo: appointmentData.additional_info,
      teacherLogin: appointmentData.teacher_login
    };
  };

  public async getAllAppointments() : Promise<Array<AppointmentModel>> {
    const queryConstructors: Array<SingleQueryConstructor> = new Array<SingleQueryConstructor>();

    queryConstructors.push(this.appointmentQueries.getAllAppointments());

    const results = await this.transactionRunner.run(queryConstructors);

    Assert.notNullOrUndefined(results, `Appointment not found`);

    const appointmentData = results[0];

    const appointmentModels = appointmentData.map((data: any) => ({
      id: data.id,
      meetingDate: data.meeting_date,
      place: data.place,
      additionalInfo: data.additional_info,
      teacherLogin: data.teacher_login
    }));

    return appointmentModels;
  };

  public async getAllAppointmentsByMonthByTeacher(month: string, year: string, teacherLogin: string) : Promise<Array<AppointmentModel>> {
    const queryConstructors: Array<SingleQueryConstructor> = new Array<SingleQueryConstructor>();

    const monthNumber: number = ParseHelper.parseNumber(month);
    const yearNumber: number = ParseHelper.parseNumber(year);

    queryConstructors.push(this.appointmentQueries.getAllAppointmentsByMonthByTeacher(monthNumber, yearNumber, teacherLogin));

    const results = await this.transactionRunner.run(queryConstructors);

    Assert.notNullOrUndefined(results, `Appointment in ${month}.${year} for teacher ${teacherLogin} not found`);

    const appointmentData = results[0];

    const appointmentModels = appointmentData.map((data: any) => ({
      id: data.id,
      meetingDate: data.meeting_date,
      place: data.place,
      additionalInfo: data.additional_info,
      teacherLogin: data.teacher_login
    }));

    return appointmentModels;
  };

  public async getAllAppointmentsByMonthByStudent(month: string, year: string, studentLogin: string) : Promise<Array<AppointmentModel>> {
    const queryConstructors: Array<SingleQueryConstructor> = new Array<SingleQueryConstructor>();

    const monthNumber: number = ParseHelper.parseNumber(month);
    const yearNumber: number = ParseHelper.parseNumber(year);

    queryConstructors.push(this.appointmentQueries.getAllAppointmentsByMonthByStudent(monthNumber, yearNumber, studentLogin));

    const results = await this.transactionRunner.run(queryConstructors);

    Assert.notNullOrUndefined(results, `Appointment in ${month}.${year} for student ${studentLogin} not found`);

    const appointmentData = results[0];

    const appointmentModels = appointmentData.map((data: any) => ({
      id: data.id,
      meetingDate: data.meeting_date,
      place: data.place,
      additionalInfo: data.additional_info,
      teacherLogin: data.teacher_login
    }));

    return appointmentModels;
  };

  public async getAllAppointmentsByTeacher(teacherLogin: string): Promise<Array<AppointmentModel>> {
    const queryConstructors: Array<SingleQueryConstructor> = new Array<SingleQueryConstructor>();

    queryConstructors.push(this.appointmentQueries.getAllAppointmentsByTeacher(teacherLogin));

    const results = await this.transactionRunner.run(queryConstructors);

    Assert.notNullOrUndefined(results, `Appointment for teacher ${teacherLogin} not found`);

    const appointmentData = results[0];

    const appointmentModels = appointmentData.map((data: any) => ({
      id: data.id,
      meetingDate: data.meeting_date,
      place: data.place,
      additionalInfo: data.additional_info,
      teacherLogin: data.teacher_login
    }));

    return appointmentModels;
  };

  public async getAllAppointmentsByStudent(studentLogin: string): Promise<Array<AppointmentModel>> {
    const queryConstructors: Array<SingleQueryConstructor> = new Array<SingleQueryConstructor>();

    queryConstructors.push(this.appointmentQueries.getAllAppointmentsByStudent(studentLogin));

    const results = await this.transactionRunner.run(queryConstructors);

    Assert.notNullOrUndefined(results, `Appointment for student ${studentLogin} not found`);

    const appointmentData = results[0];

    const appointmentModels = appointmentData.map((data: any) => ({
      id: data.id,
      meetingDate: data.meeting_date,
      place: data.place,
      additionalInfo: data.additional_info,
      teacherLogin: data.teacher_login
    }));

    return appointmentModels;
  };

  private createModelWithLogin (appointmentInfo: AppointmentInfo, teacherLogin: string): AppointmentModel {
    const guid = crypto.randomUUID();

    return {
      ...appointmentInfo,
      teacherLogin: teacherLogin,
      id: guid
    };
  };
}