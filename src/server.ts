import express, {Express} from "express"
import {StartUp} from "./configs/start-up";
import {StartUpParse} from "./configs/configs-parse/start-up-parse";

const app: Express = express();

const startUp: StartUp = StartUpParse.getStartUpConfig();

const PORT: number = startUp.PORT;

app.listen(PORT, (err: void | Error): void => {
    err ? console.log(err) : console.log(`Listening ${PORT} port`)
});