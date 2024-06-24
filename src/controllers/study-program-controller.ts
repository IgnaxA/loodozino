import { NextFunction, Request, Response } from "express";

export interface StudyProgramController {
  createStudyProgram(req: Request, res: Response, next: NextFunction): Promise<void>;
  getStudyProgramById(req: Request, res: Response, next: NextFunction): Promise<void>
  getAllStudyPrograms(req: Request, res: Response, next: NextFunction): Promise<void>
  editStudyProgram(req: Request, res: Response, next: NextFunction): Promise<void>
  deleteStudyProgram(req: Request, res: Response, next: NextFunction): Promise<void>
}