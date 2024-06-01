import { Request, Response } from "express";

export interface SettingsController {
    createSettings(req: Request, res: Response): void;
    getSettings(req: Request, res: Response): void;
    editVisibleHistory(req: Request, res: Response): void;
    removeSettings(req: Request, res: Response): void;
}