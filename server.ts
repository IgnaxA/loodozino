import express, { Express } from "express";
import bodyParser from "body-parser";

import { SettingsService } from "./src/services/settings-service";
import { SettingsController } from "./src/controllers/settings-controller";
import { SettingsServiceImpl } from "./src/services/impls/settings-service-impl";
import { SettingsControllerImpl } from "./src/controllers/implementations/settings-controller-impl";
import { StartUpConfig, StartUpParse } from "./src/utils/startup-config";
import { SettingsRouter } from "./src/routes/settings-router";
import mongoose from "mongoose";
import { SettingsRepository } from "./src/repositories/settings-repository";
import { SettingsRepositoryImpl } from "./src/repositories/implementations/settings-repository-impl";

const APIPrefix: string = "/api";
const app: Express = express();
app.use(express.json());

const startUpConfig: StartUpConfig = StartUpParse.getStartUpConfig();
const PORT: number = startUpConfig.PORT;
const isProd: boolean = startUpConfig.PROD;

mongoose.connect(startUpConfig.MONGO_URL);

const settingsRepository: SettingsRepository = new SettingsRepositoryImpl();
const settingsService: SettingsService = new SettingsServiceImpl(settingsRepository);
const settingsController: SettingsController = new SettingsControllerImpl(settingsService);
const settingsRouter: SettingsRouter = new SettingsRouter(settingsController);
settingsRouter.setRouter();

app.use(APIPrefix, settingsRouter.getRouter());

app.listen(PORT, (err: void | Error): void => {
    err ? console.log(err) : console.log(`Listening ${PORT} port`);
});

