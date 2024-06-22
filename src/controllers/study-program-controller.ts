import { Request, Response } from "express";

export interface StudyProgramController {
  createStudyProgram(req: Request, res: Response): Promise<void>;
  getStudyProgramById(req: Request, res: Response): Promise<void>
  getAllStudyPrograms(req: Request, res: Response): Promise<void>
  editStudyProgram(req: Request, res: Response): Promise<void>
  deleteStudyProgram(req: Request, res: Response): Promise<void>
}