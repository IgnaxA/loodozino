import { Request, Response } from "express";

export interface MatchController {
  createMatch(req: Request, res: Response): void;
  getMatch(req: Request, res: Response): void;
  editMatch(req: Request, res: Response): void;
  removeMatch(req: Request, res: Response): void;
}