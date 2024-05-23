import express, {Express} from "express"
import {StartUpConfig, StartUpParse} from "./configs/utils/start-up-parse";
import {AuthRouter} from "./routes/auth-router";
import {AuthController} from "./controllers/auth/auth-controller";
import {AuthService} from "./services/auth/auth-service";
import {AuthServiceImpl} from "./services/auth/impls/auth-service-impl";
import {AuthControllerImpl} from "./controllers/auth/impls/auth-controller-impl";
import {Cryptor} from "./crypto/cryptor/cryptor";
import {CryptorImpl} from "./crypto/cryptor/impls/cryptor-impl";
import {AuthJWT} from "./crypto/json-web-token/auth-jwt";
import {AuthJWTImpl} from "./crypto/json-web-token/impls/auth-jwt-impl";
import {PostgresTransactionRunner} from "./repository/transaction-runners/impls/postgres-transaction-runner";
import {TransactionRunner} from "./repository/transaction-runners/transaction-runner";
import {MigrationRunner} from "./migration-runner/migration-runner";

const APIPrefix: string = "/api";
const app: Express = express();
app.use(express.json());

const startUpConfig: StartUpConfig = StartUpParse.getStartUpConfig();
const PORT: number = startUpConfig.PORT;
const isProd: boolean = startUpConfig.PROD;

const transactionRunner: TransactionRunner = new PostgresTransactionRunner();
const migrationRunner: MigrationRunner = new MigrationRunner(transactionRunner);

migrationRunner.run(isProd);

const cryptor: Cryptor = new CryptorImpl();
const authJWT: AuthJWT = new AuthJWTImpl();

const authService: AuthService = new AuthServiceImpl(cryptor, authJWT);

const authController: AuthController = new AuthControllerImpl(authService);
const authRouter: AuthRouter = new AuthRouter(authController);
authRouter.setRouter();

app.use(APIPrefix, authRouter.getRouter());

app.listen(PORT, (err: void | Error): void => {
    err ? console.log(err) : console.log(`Listening ${PORT} port`);
});