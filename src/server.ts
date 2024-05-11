import express, {Express} from "express"
import {StartUp, StartUpParse} from "./configs/start-up-parse";
import {AuthRouter} from "./routes/auth-router";
import {AuthController} from "./controllers/auth/auth-controller";
import {AuthService} from "./services/auth-service";
import {AuthServiceImpl} from "./services/impls/auth-service-impl";
import {AuthControllerImpl} from "./controllers/auth/impls/auth-controller-impl";

const APIPrefix: string = "/api";
const app: Express = express();

const startUp: StartUp = StartUpParse.getStartUpConfig();
const PORT: number = startUp.PORT;

const authService: AuthService = new AuthServiceImpl();
const authController: AuthController = new AuthControllerImpl(authService);
const authRouter: AuthRouter = new AuthRouter(authController);
authRouter.setRouter();

app.use(APIPrefix, authRouter.getRouter());

app.listen(PORT, (err: void | Error): void => {
    err ? console.log(err) : console.log(`Listening ${PORT} port`);
});