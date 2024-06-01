import { Request, Response } from "express";

export interface PlayerController {
    createPlayer(req: Request, res: Response): void;
    getPlayer(req: Request, res: Response): void;
    editPlayer(req: Request, res: Response): void;
    removePlayerByIdent(req: Request, res: Response): void;
}