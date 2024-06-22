import { Request, Response } from "express";
export interface TeacherController {
  createTeacher(req: Request, res: Response): Promise<void>;
  getTeacherById(req: Request, res: Response): Promise<void>;
  getAllTeachers(req: Request, res: Response): Promise<void>;
  editTeacher(req: Request, res: Response): Promise<void>;
  deleteTeacher(req: Request, res: Response): Promise<void>;
}