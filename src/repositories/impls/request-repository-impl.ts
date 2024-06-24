import { RequestRepository } from "../request-repository";
import { RequestModel } from "../../models/request-models";
import { SingleQueryConstructor } from "../../database/query-constructors/single-query-constructor";
import { TransactionRunner } from "../../database/transaction-runners/transaction-runner";
import { QueryConstructor } from "../../database/query-constructors/query-constructor";
import { AppointmentQueries } from "../queries/appointment-queries";
import { RequestQueries } from "../queries/request-queries";
import { Assert } from "../../utils/assert";

export class RequestRepositoryImpl implements RequestRepository {
  private readonly transactionRunner: TransactionRunner<QueryConstructor>;
  private readonly requestQueries: RequestQueries;

  constructor(transactionRunner: TransactionRunner<QueryConstructor>, requestQueries: RequestQueries) {
    this.requestQueries = requestQueries;
    this.transactionRunner = transactionRunner;
  }
  public async createRequest(appointmentId: string, studentLogin: string): Promise<RequestModel> {
    const queryConstructors: Array<SingleQueryConstructor> = new Array<SingleQueryConstructor>();

    const guid: string = crypto.randomUUID();
    const creationTime: Date = new Date();
    const status: string = "Pending";

    queryConstructors.push(this.requestQueries.createRequest(
      guid,
      creationTime,
      appointmentId,
      studentLogin,
      status)
    );

    const results = await this.transactionRunner.run(queryConstructors);

    Assert.notNullOrUndefined(results, `Request could not be created`);

    const requestData = results[0][0];

    return {
      id: requestData.id,
      creationTime: requestData.creation_time,
      appointmentId: requestData.appointment_id,
      studentLogin: requestData.student_login,
      status: requestData.status
    };
  };


  public async acceptRequest(id: string): Promise<RequestModel> {
    const queryConstructors: Array<SingleQueryConstructor> = new Array<SingleQueryConstructor>();

    const status: string = "Accepted";

    queryConstructors.push(this.requestQueries.updateRequestStatus(
      id,
      status)
    );

    const results = await this.transactionRunner.run(queryConstructors);

    Assert.notNullOrUndefined(results, `Request with ID ${id} not found`);

    const requestData = results[0][0];

    return {
      id: requestData.id,
      creationTime: requestData.creation_time,
      appointmentId: requestData.appointment_id,
      studentLogin: requestData.student_login,
      status: requestData.status
    };
  };

  public async denyRequest(id: string): Promise<RequestModel> {
    const queryConstructors: Array<SingleQueryConstructor> = new Array<SingleQueryConstructor>();

    const status: string = "Denied";

    queryConstructors.push(this.requestQueries.updateRequestStatus(
      id,
      status)
    );

    const results = await this.transactionRunner.run(queryConstructors);

    Assert.notNullOrUndefined(results, `Request with ID ${id} not found`);

    const requestData = results[0][0];

    return {
      id: requestData.id,
      creationTime: requestData.creation_time,
      appointmentId: requestData.appointment_id,
      studentLogin: requestData.student_login,
      status: requestData.status
    };
  };

  public async cancelAllRequestsByAppointment(appointmentId: string) : Promise<Array<RequestModel>> {
    const queryConstructors: Array<SingleQueryConstructor> = new Array<SingleQueryConstructor>();

    const status: string = "Cancelled";

    queryConstructors.push(this.requestQueries.updateAllRequestStatusesByAppointment(
      appointmentId,
      status)
    );

    const results = await this.transactionRunner.run(queryConstructors);

    Assert.notNullOrUndefined(results, `Request with appointmentId ${appointmentId} not found`);

    const requestData = results[0];

    const requestModels = requestData.map((data: any) => ({
      id: data.id,
      creationTime: data.creation_time,
      appointmentId: data.appointment_id,
      studentLogin: data.student_login,
      teacherLogin: data.teacher_login,
      status: data.status
    }));

    return requestModels;
  };

  public async getRequestById(id: string): Promise<RequestModel> {
    const queryConstructors: Array<SingleQueryConstructor> = new Array<SingleQueryConstructor>();

    queryConstructors.push(this.requestQueries.getRequestById(
      id)
    );

    const results = await this.transactionRunner.run(queryConstructors);

    Assert.notNullOrUndefined(results, `Request with ID ${id} not found`);

    const requestData = results[0][0];

    return {
      id: requestData.id,
      creationTime: requestData.creation_time,
      appointmentId: requestData.appointment_id,
      studentLogin: requestData.student_login,
      status: requestData.status
    };
  };

  public async getAllRequests(): Promise<Array<RequestModel>> {
    const queryConstructors: Array<SingleQueryConstructor> = new Array<SingleQueryConstructor>();

    queryConstructors.push(this.requestQueries.getAllRequests());

    const results = await this.transactionRunner.run(queryConstructors);

    Assert.notNullOrUndefined(results, `There are no requests in DB`);

    const requestData = results[0];

    const requestModels = requestData.map((data: any) => ({
      id: data.id,
      creationTime: data.creation_time,
      appointmentId: data.appointment_id,
      studentLogin: data.student_login,
      teacherLogin: data.teacher_login,
      status: data.status
    }));

    return requestModels;
  };

  public async getAllRequestsByStudent(studentLogin: string): Promise<Array<RequestModel>> {
    const queryConstructors: Array<SingleQueryConstructor> = new Array<SingleQueryConstructor>();

    queryConstructors.push(this.requestQueries.getAllRequestsByStudent(studentLogin));

    const results = await this.transactionRunner.run(queryConstructors);

    Assert.notNullOrUndefined(results, `There are no requests for student ${studentLogin} in DB`);

    const requestData = results[0];

    const requestModels = requestData.map((data: any) => ({
      id: data.id,
      creationTime: data.creation_time,
      appointmentId: data.appointment_id,
      studentLogin: data.student_login,
      teacherLogin: data.teacher_login,
      status: data.status
    }));

    return requestModels;
  };

  public async getAllRequestsByAppointment(appointmentId: string): Promise<Array<RequestModel>> {
    const queryConstructors: Array<SingleQueryConstructor> = new Array<SingleQueryConstructor>();

    queryConstructors.push(this.requestQueries.getAllRequestsByAppointment(appointmentId));

    const results = await this.transactionRunner.run(queryConstructors);

    Assert.notNullOrUndefined(results, `There are no requests for appointment with ID ${appointmentId} in DB`);

    const requestData = results[0];

    const requestModels = requestData.map((data: any) => ({
      id: data.id,
      creationTime: data.creation_time,
      appointmentId: data.appointment_id,
      studentLogin: data.student_login,
      teacherLogin: data.teacher_login,
      status: data.status
    }));

    return requestModels;
  };
}