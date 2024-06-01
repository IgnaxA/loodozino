import { response } from "express";
import { SettingsService } from "../../services/settings-service";
// import { SettingsDTO } from "../dtos/settings-dto";
import { SettingsController } from "../settings-controller";
import { Request, Response } from "express-serve-static-core";
import { EditVisibleHistoryPayload, ISettings } from "../../contracts/settings";

export class SettingsControllerImpl implements SettingsController {
    private readonly settingsService: SettingsService;
    
    constructor(settingsService: SettingsService) {
        this.settingsService = settingsService;
    };
    
    public getSettingsByUserIdent = async(req: Request, res: Response) => {
        try {
            const user_ident: string = req.body;
            const settings = await this.settingsService.getSettingsByUserIdent(user_ident);
            this.setAPIResponse(res, settings);

        } catch (err: any) {
            res.status(500); // Error handler
        }
    }

    public createSettings = async(req: Request, res: Response): Promise<void> => {
        try {
            const settings: ISettings = req.body;
            await this.settingsService.createSettings(settings);
            this.setAPIResponse(res, settings);

        } catch (err: any) {
            res.status(500).json(err); // Error handler
        }
    }


    public editVisibleHistory = async(req: Request, res: Response) => {
        try {
            const editHistoryPayload: EditVisibleHistoryPayload = req.body;
            const settings = await this.settingsService.editVisibleHistory(editHistoryPayload);
            this.setAPIResponse(res, settings);

        } catch (err: any) {
            res.status(500); // Error handler
        }
    }

    public removeSettingsByUserIdent = async(req: Request, res: Response) => {
        try {
            const user_ident: string = req.body;
            const settings = await this.settingsService.removeSettingsByUserIdent(user_ident);
            this.setAPIResponse(res, settings);

        } catch (err: any) {
            res.status(500); // Error handler
        }
    }

    private setAPIResponse(res: Response, responseData: ISettings): void {
        res
        .status(200)
        .json(responseData);
    }
}