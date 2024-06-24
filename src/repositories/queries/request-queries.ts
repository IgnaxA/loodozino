import { SingleQueryConstructor } from "../../database/query-constructors/single-query-constructor";

export interface RequestQueries {
  createRequest(id: string, creationTime: Date, appointmentId: string, studentLogin:string, status: string): SingleQueryConstructor;

  updateRequestStatus(id: string, status: string): SingleQueryConstructor;
  updateAllRequestStatusesByAppointment(appointmentId: string, status: string): SingleQueryConstructor;
  getRequestById(id: string): SingleQueryConstructor;
  getAllRequests(): SingleQueryConstructor;
  getAllRequestsByStudent(studentLogin: string): SingleQueryConstructor;
  getAllRequestsByAppointment(appointmentId: string): SingleQueryConstructor;
}