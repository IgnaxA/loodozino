import { NextFunction, Request, Response } from "express";
export interface MeetingPlaceController {
  createMeetingPlace(req: Request, res: Response, next: NextFunction): Promise<void>;
  getMeetingPlaceById(req: Request, res: Response, next: NextFunction): Promise<void>;
  getAllMeetingPlaces(req: Request, res: Response, next: NextFunction): Promise<void>;
  getPriorityMeetingPlaceForTeacher(req: Request, res: Response, next: NextFunction): Promise<void>;
  getAllMeetingPlacesByTeacher(req: Request, res: Response, next: NextFunction): Promise<void>;
  editMeetingPlace(req: Request, res: Response, next: NextFunction): Promise<void>;
  deleteMeetingPlace(req: Request, res: Response, next: NextFunction): Promise<void>;
}