import { Request, Response } from "express";
export interface MeetingPlaceController {
  createMeetingPlace(req: Request, res: Response): Promise<void>;
  getMeetingPlaceById(req: Request, res: Response): Promise<void>;
  getAllMeetingPlaces(req: Request, res: Response): Promise<void>;
  getPriorityMeetingPlaceForTeacher(req: Request, res: Response): Promise<void>;
  getAllMeetingPlacesByTeacher(req: Request, res: Response): Promise<void>;
  editMeetingPlace(req: Request, res: Response): Promise<void>;
  deleteMeetingPlace(req: Request, res: Response): Promise<void>;
}