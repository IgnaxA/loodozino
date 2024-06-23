import { Request, Response } from "express";

export interface StudentController {
  createStudent(req: Request, res: Response): Promise<void>;
  getAllStudents(req: Request, res: Response): Promise<void>;
  editStudent(req: Request, res: Response): Promise<void>;
  deleteStudent(req: Request, res: Response): Promise<void>;
  getStudentByLogin(req: Request, res: Response): Promise<void>;
}