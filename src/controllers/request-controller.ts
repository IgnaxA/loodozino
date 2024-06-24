import { SingleQueryConstructor } from "../database/query-constructors/single-query-constructor";
import { NextFunction, Request, Response } from "express";

export interface RequestController {
  createRequestForStudent(req: Request, res: Response, next: NextFunction): Promise<void>;
  createRequest(req: Request, res: Response, next: NextFunction): Promise<void>;

  acceptRequest(req: Request, res: Response, next: NextFunction): Promise<void>;
  denyRequest(req: Request, res: Response, next: NextFunction): Promise<void>;
  cancelAllRequestsByAppointment(req: Request, res:Response, next: NextFunction): Promise<void>;

  getRequestById(req: Request, res: Response, next: NextFunction): Promise<void>;
  getAllRequests(req: Request, res: Response, next: NextFunction): Promise<void>;
  getAllRequestsByStudent(req: Request, res: Response, next: NextFunction): Promise<void>;
  getAllRequestsByAppointment(req: Request, res: Response, next: NextFunction): Promise<void>;
}