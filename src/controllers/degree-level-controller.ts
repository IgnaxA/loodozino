import { NextFunction, Request, Response } from "express";
export interface DegreeLevelController {
  createDegreeLevel(req: Request, res: Response, next: NextFunction): Promise<void>;
  getDegreeLevelById(req: Request, res: Response, next: NextFunction): Promise<void>;
  getAllDegreeLevels(req: Request, res: Response, next: NextFunction): Promise<void>;
  editDegreeLevel(req: Request, res: Response, next: NextFunction): Promise<void>;
  deleteDegreeLevel(req: Request, res: Response, next: NextFunction): Promise<void>;
}