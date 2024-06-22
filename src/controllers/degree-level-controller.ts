import { Request, Response } from "express";
export interface DegreeLevelController {
  createDegreeLevel(req: Request, res: Response): Promise<void>;
  getDegreeLevelById(req: Request, res: Response): Promise<void>;
  getAllDegreeLevels(req: Request, res: Response): Promise<void>;
  editDegreeLevel(req: Request, res: Response): Promise<void>;
  deleteDegreeLevel(req: Request, res: Response): Promise<void>;
}