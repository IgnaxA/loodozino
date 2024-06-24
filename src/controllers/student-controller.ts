import { NextFunction, Request, Response } from "express";

export interface StudentController {
  createStudent(req: Request, res: Response, next: NextFunction): Promise<void>;
  getAllStudents(req: Request, res: Response, next: NextFunction): Promise<void>;
  editStudent(req: Request, res: Response, next: NextFunction): Promise<void>;
  deleteStudent(req: Request, res: Response, next: NextFunction): Promise<void>;
  getStudentByLogin(req: Request, res: Response, next: NextFunction): Promise<void>;
}