import {Request, Response} from "express";

export interface TokenController {
    verifyAndGet(req: Request, res: Response): Promise<void>;
    getAccessToken(req: Request, res: Response): Promise<void>;
}