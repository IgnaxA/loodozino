import {Request, Response} from "express";

export interface AuthController {
    signUp(req: Request, res: Response): Promise<void>;
    signIn(req: Request, res: Response): Promise<void>;
}