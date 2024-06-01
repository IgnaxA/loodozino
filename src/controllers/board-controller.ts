import { Request, Response } from "express";

export interface BoardController {
    createBoard(req: Request, res: Response): void;
    getBoard(req: Request, res: Response): void;
    editBoard(req: Request, res: Response): void;
    removeBoard(req: Request, res: Response): void;
}