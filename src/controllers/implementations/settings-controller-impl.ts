import { SettingsService } from "../../services/settings-service";
import { SettingsController } from "../settings-controller";
import { Request, Response } from "express-serve-static-core";
import { EditVisibleHistoryPayload, ISettings } from "../../contracts/settings";
import { ErrorHandler } from "../../utils/error-handler";

export class SettingsControllerImpl implements SettingsController {
    private readonly settingsService: SettingsService;
    
    constructor(settingsService: SettingsService) {
        this.settingsService = settingsService;
    };
    
    public getSettings = async(req: Request, res: Response) : Promise<void> => {
        try {
            const user_ident: string = req.body;
            const settings = await this.settingsService.getSettings(user_ident);
            this.setAPIResponse(res, settings);

        } catch (err: any) {
            ErrorHandler.setError(res, err);
        }
    }

    public createSettings = async(req: Request, res: Response) : Promise<void> => {
        try {
            const settings: ISettings = req.body;
            await this.settingsService.createSettings(settings);
            this.setAPIResponse(res, settings);

        } catch (err: any) {
            ErrorHandler.setError(res, err);
        }
    }


    public editVisibleHistory = async(req: Request, res: Response) : Promise<void> => {
        try {
            const editHistoryPayload: EditVisibleHistoryPayload = req.body;
            const settings = await this.settingsService.editVisibleHistory(editHistoryPayload);
            this.setAPIResponse(res, settings);

        } catch (err: any) {
            ErrorHandler.setError(res, err);
        }
    }

    public removeSettings = async(req: Request, res: Response) : Promise<void> => {
        try {
            const user_ident: string = req.body;
            const settings = await this.settingsService.removeSettings(user_ident);
            this.setAPIResponse(res, settings);

        } catch (err: any) {
            ErrorHandler.setError(res, err);
        }
    }

    private setAPIResponse(res: Response, responseData: ISettings): void {
        res
        .status(200)
        .json(responseData);
    }
}