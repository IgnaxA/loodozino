import { NextFunction, Request, Response } from "express";
export interface TeacherController {
  createTeacher(req: Request, res: Response, next: NextFunction): Promise<void>;
  getAllTeachers(req: Request, res: Response, next: NextFunction): Promise<void>;
  getAllStudentsByTeacher(req: Request, res: Response, next: NextFunction): Promise<void>;
  editTeacher(req: Request, res: Response, next: NextFunction): Promise<void>;
  deleteTeacher(req: Request, res: Response, next: NextFunction): Promise<void>;
  getTeacherByLogin(req: Request, res:Response, next: NextFunction): Promise<void>;
}