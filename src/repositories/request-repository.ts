import { RequestModel } from "../models/request-models";

export interface RequestRepository {
  createRequest(appointmentId: string, studentLogin: string): Promise<RequestModel>;

  acceptRequest(id: string): Promise<RequestModel>;
  denyRequest(id: string): Promise<RequestModel>;
  cancelAllRequestsByAppointment(appointmentId: string): Promise<Array<RequestModel>>;

  getRequestById(id: string): Promise<RequestModel>;
  getAllRequests(): Promise<Array<RequestModel>>;
  getAllRequestsByStudent(studentLogin: string): Promise<Array<RequestModel>>;
  getAllRequestsByAppointment(appointmentId: string): Promise<Array<RequestModel>>;
}
