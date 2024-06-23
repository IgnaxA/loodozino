import express, {Express} from "express"
import {StartUpConfig, StartUpParse} from "./configs/utils/start-up-parse";
import {AuthRouter} from "./routes/auth-router";
import {AuthController} from "./controllers/auth-controller";
import {AuthService} from "./services/auth-service";
import {AuthServiceImpl} from "./services/impls/auth-service-impl";
import {AuthControllerImpl} from "./controllers/impls/auth-controller-impl";
import {Cryptor} from "./crypto/cryptor/cryptor";
import {CryptorImpl} from "./crypto/cryptor/impls/cryptor-impl";
import {AuthJWT} from "./crypto/json-web-token/auth-jwt";
import {AuthJWTImpl} from "./crypto/json-web-token/impls/auth-jwt-impl";
import {PostgresTransactionRunner} from "./repository/transaction-runners/impls/postgres-transaction-runner";
import {TransactionRunner} from "./repository/transaction-runners/transaction-runner";
import {MigrationRunner} from "./migration-runner/migration-runner";
import {AuthRepository} from "./repository/auth-repository";
import {AuthRepositoryPg} from "./repository/impls/auth-repository-pg";
import {Driver} from "./configs/db/driver";
import {PostgresDriver} from "./configs/db/impls/postgres-driver";
import {QueryConstructor} from "./repository/query-constructors/query-constructor";
import {UserQueries} from "./repository/queries/user-queries";
import {UserQueriesPg} from "./repository/queries/impls/user-queries-pg";
import cors from "cors";
import {TokenRouter} from "./routes/token-router";
import {TokenController} from "./controllers/token-controller";
import {TokenControllerImpl} from "./controllers/impls/token-controller-impl";
import {TokenService} from "./services/token-service";
import {TokenServiceImpl} from "./services/impls/token-service-impl";
import {TokenJWT} from "./crypto/json-web-token/token-jwt";
import {TokenRepository} from "./repository/token-repository";
import {TokenRepositoryPg} from "./repository/impls/token-repository-pg";

const APIPrefix: string = "/api/authservice";
const app: Express = express();
app.use(express.json());
app.use(cors())

const startUpConfig: StartUpConfig = StartUpParse.getStartUpConfig();
const PORT: number = startUpConfig.PORT;
const isProd: boolean = startUpConfig.PROD;

const pgDriver: Driver = new PostgresDriver();
const transactionRunner: TransactionRunner<QueryConstructor> = new PostgresTransactionRunner<QueryConstructor>(pgDriver);
const migrationRunner: MigrationRunner = new MigrationRunner(transactionRunner);

migrationRunner.run(isProd);

const cryptor: Cryptor = new CryptorImpl();
const authJWT: AuthJWT = new AuthJWTImpl();

const userQueries: UserQueries = new UserQueriesPg();

const authRepository: AuthRepository = new AuthRepositoryPg(transactionRunner, userQueries);

const authService: AuthService = new AuthServiceImpl(cryptor, authJWT, authRepository);

const authController: AuthController = new AuthControllerImpl(authService);
const authRouter: AuthRouter = new AuthRouter(authController);
authRouter.setRouter();

const tokenRepository: TokenRepository = new TokenRepositoryPg();
const tokenJWT: TokenJWT = new AuthJWTImpl();
const tokenService: TokenService = new TokenServiceImpl(tokenJWT, tokenRepository);
const tokenController: TokenController = new TokenControllerImpl(tokenService);
const tokenRouter: TokenRouter = new TokenRouter(tokenController);
tokenRouter.setRouter();

app.use(APIPrefix, authRouter.getRouter());
app.use(APIPrefix, tokenRouter.getRouter());

app.listen(PORT, (err: void | Error): void => {
    err ? console.log(err) : console.log(`Listening ${PORT} port`);
});
