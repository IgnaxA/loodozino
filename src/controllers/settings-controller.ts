import { Request, Response } from "express";

export interface SettingsController {
    createSettings(req: Request, res: Response): void;
    getSettingsByUserIdent(req: Request, res: Response): void;
    editVisibleHistory(req: Request, res: Response): void;
    removeSettingsByUserIdent(req: Request, res: Response): void;
}