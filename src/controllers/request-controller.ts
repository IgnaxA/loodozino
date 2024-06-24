import { SingleQueryConstructor } from "../database/query-constructors/single-query-constructor";
import {Request, Response} from "express";

export interface RequestController {
  createRequestForStudent(req: Request, res: Response): Promise<void>;
  createRequest(req: Request, res: Response): Promise<void>;

  acceptRequest(req: Request, res: Response): Promise<void>;
  denyRequest(req: Request, res: Response): Promise<void>;
  cancelAllRequestsByAppointment(req: Request, res:Response): Promise<void>;

  getRequestById(req: Request, res: Response): Promise<void>;
  getAllRequests(req: Request, res: Response): Promise<void>;
  getAllRequestsByStudent(req: Request, res: Response): Promise<void>;
  getAllRequestsByAppointment(req: Request, res: Response): Promise<void>;
}