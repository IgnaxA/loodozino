import { RequestQueries } from "../request-queries";
import { SingleQueryConstructor } from "../../../database/query-constructors/single-query-constructor";
import { Assert } from "../../../utils/assert";

export class RequestQueriesPg implements RequestQueries {
  private readonly create: string =
    `INSERT INTO "requests" (id, creation_time, appointment_id, student_login, status) VALUES ($1, $2, $3, $4, $5) RETURNING *;`;
  private readonly updateStatus: string =
    `UPDATE "requests" SET status=$2 WHERE id=$1 RETURNING *;`
  private readonly updateStatusesByAppointment =
    `UPDATE "requests" SET status=$2 WHERE appointment_id=$1 RETURNING *;`;
  private readonly get: string =
    `SELECT * FROM "requests" WHERE id=$1;`;
  private readonly getAll: string =
    `SELECT * FROM "requests"`;
  private readonly getByStudent: string =
    `SELECT * FROM "requests" WHERE student_login=$1;`;
  private readonly getByAppointment: string =
    `SELECT * FROM "requests" WHERE appointment_id=$1;`;

  public createRequest(id: string, creationTime: Date, appointmentId: string, studentLogin:string, status: string): SingleQueryConstructor {
    Assert.notNullOrUndefined(id,"Request id must not be null");
    Assert.notNullOrUndefined(creationTime,"Request creation_time must not be null");
    Assert.notNullOrUndefined(appointmentId,"Request appointmentId must not be null");
    Assert.notNullOrUndefined(studentLogin,"Request studentLogin must not be null");
    Assert.notNullOrUndefined(status,"Request status must not be null");

    const queryConstructor: SingleQueryConstructor = new SingleQueryConstructor();

    const parameters: Array<any> = new Array<any>(id, creationTime, appointmentId, studentLogin, status);

    queryConstructor.setQuery(this.create);
    queryConstructor.setParameters(parameters);

    return queryConstructor;
  };


  public updateRequestStatus(id: string, status: string): SingleQueryConstructor {
    Assert.notNullOrUndefined(id,"Request id must not be null");
    Assert.notNullOrUndefined(status,"Request status must not be null");

    const queryConstructor: SingleQueryConstructor = new SingleQueryConstructor();

    const parameters: Array<any> = new Array<any>(id, status);

    queryConstructor.setQuery(this.updateStatus);
    queryConstructor.setParameters(parameters);

    return queryConstructor;
  };

  public updateAllRequestStatusesByAppointment(appointmentId: string, status: string): SingleQueryConstructor {
    Assert.notNullOrUndefined(appointmentId,"Request appointmentId must not be null");
    Assert.notNullOrUndefined(status,"Request status must not be null");

    const queryConstructor: SingleQueryConstructor = new SingleQueryConstructor();

    const parameters: Array<any> = new Array<any>(appointmentId, status);

    queryConstructor.setQuery(this.updateStatusesByAppointment);
    queryConstructor.setParameters(parameters);

    return queryConstructor;
  };

  public getRequestById(id: string): SingleQueryConstructor {
    Assert.notNullOrUndefined(id,"Request id must not be null");

    const queryConstructor: SingleQueryConstructor = new SingleQueryConstructor();

    const parameters: Array<any> = new Array<any>(id);

    queryConstructor.setQuery(this.get);
    queryConstructor.setParameters(parameters);

    return queryConstructor;
  };

  public getAllRequests(): SingleQueryConstructor {

    const queryConstructor: SingleQueryConstructor = new SingleQueryConstructor();

    const parameters: Array<any> = new Array<any>();

    queryConstructor.setQuery(this.getAll);
    queryConstructor.setParameters(parameters);

    return queryConstructor;
  };

  public getAllRequestsByStudent(studentLogin: string): SingleQueryConstructor {
    Assert.notNullOrUndefined(studentLogin,"Request studentLogin must not be null");

    const queryConstructor: SingleQueryConstructor = new SingleQueryConstructor();

    const parameters: Array<any> = new Array<any>(studentLogin);

    queryConstructor.setQuery(this.getByStudent);
    queryConstructor.setParameters(parameters);

    return queryConstructor;
  };

  public getAllRequestsByAppointment(appointmentId: string): SingleQueryConstructor {
    Assert.notNullOrUndefined(appointmentId,"Request appointmentId must not be null");

    const queryConstructor: SingleQueryConstructor = new SingleQueryConstructor();

    const parameters: Array<any> = new Array<any>(appointmentId);

    queryConstructor.setQuery(this.getByAppointment);
    queryConstructor.setParameters(parameters);

    return queryConstructor;
  };

}