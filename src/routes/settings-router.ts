import express, {Router} from "express";
import { SettingsController } from "../controllers/settings-controller";

export class SettingsRouter {
    private readonly settingsRouter: Router;
    private readonly settingsController: SettingsController;

    constructor(settingsController: SettingsController) {
        this.settingsController = settingsController;
        this.settingsRouter = express.Router();
    }

    public setRouter(): void {
        this.settingsRouter.get("/get_settings", this.settingsController.getSettings);
        this.settingsRouter.post("/edit_visible_history", this.settingsController.editVisibleHistory);
        this.settingsRouter.post("/create_settings", this.settingsController.createSettings);
        this.settingsRouter.delete("/remove_settings", this.settingsController.removeSettings);
    }

    public getRouter(): Router {
        return this.settingsRouter;
    }

}