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
import { BoardRepository } from "./src/repositories/board-repository";
import { BoardService } from "./src/services/board-service";
import { BoardController } from "./src/controllers/board-controller";
import { BoardRouter } from "./src/routes/board-router";
import { BoardRepositoryImpl } from "./src/repositories/implementations/board-repository-impl";
import { BoardServiceImpl } from "./src/services/impls/board-service-impl";
import { BoardControllerImpl } from "./src/controllers/implementations/board-controller-impl";
import { MatchRepository } from "./src/repositories/match-repository";
import { MatchRepositoryImpl } from "./src/repositories/implementations/match-repository-impl";
import { MatchServiceImpl } from "./src/services/impls/match-service-impl";
import { MatchService } from "./src/services/match-service";
import { MatchController } from "./src/controllers/match-controller";
import { MatchControllerImpl } from "./src/controllers/implementations/match-controller-impl";
import { MatchRouter } from "./src/routes/match-router";

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

const boardRepository: BoardRepository = new BoardRepositoryImpl();
const boardService: BoardService = new BoardServiceImpl(boardRepository);
const boardController: BoardController = new BoardControllerImpl(boardService);
const boardRouter: BoardRouter = new BoardRouter(boardController);
boardRouter.setRouter();

app.use(APIPrefix, boardRouter.getRouter());

const matchRepository: MatchRepository = new MatchRepositoryImpl();
const matchService: MatchService = new MatchServiceImpl(matchRepository);
const matchController: MatchController = new MatchControllerImpl(matchService);
const matchRouter: MatchRouter = new MatchRouter(matchController);
matchRouter.setRouter();

app.use(APIPrefix, matchRouter.getRouter());

app.listen(PORT, (err: void | Error): void => {
    err ? console.log(err) : console.log(`Listening ${PORT} port`);
});

