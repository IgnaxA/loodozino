import express, { Express } from "express";
import cors from "cors";
import { StartUpConfig, StartUpParse } from "./src/database/config/utils/start-up-parse";
import { PostgresDriver } from "./src/database/config/db/impls/postgres-driver";
import { Driver } from "./src/database/config/db/driver";
import { QueryConstructor } from "./src/database/query-constructors/query-constructor";
import { TransactionRunner } from "./src/database/transaction-runners/transaction-runner";
import { PostgresTransactionRunner } from "./src/database/transaction-runners/impls/postgres-transaction-runner";
import { MigrationRunner } from "./src/database/migration-runner/migration-runner";
import { RequestQueries } from "./src/repositories/queries/request-queries";
import { RequestQueriesPg } from "./src/repositories/queries/impls/request-queries-pg";
import { RequestRepository } from "./src/repositories/request-repository";
import { RequestRepositoryImpl } from "./src/repositories/impls/request-repository-impl";
import { RequestControllerImpl } from "./src/controllers/impls/request-controller-impl";
import { RequestController } from "./src/controllers/request-controller";
import { RequestRouter } from "./src/routes/request-router";
import { AppointmentQueries } from "./src/repositories/queries/appointment-queries";
import { AppointmentQueriesPg } from "./src/repositories/queries/impls/appointment-queries-pg";
import { AppointmentRepositoryImpl } from "./src/repositories/impls/appointment-repository-impl";
import { AppointmentControllerImpl } from "./src/controllers/impls/appointment-controller-impl";
import { AppointmentRouter } from "./src/routes/appointment-router";
import { AppointmentController } from "./src/controllers/appointment-controller";
import { AppointmentRepository } from "./src/repositories/appointment-repository";

const RequestsAPIPrefix: string = "/api/calendarservice/requests";
const AppointmentsAPIPrefix: string = "/api/calendarservice/appointments";
const app: Express = express();
app.use(express.json());
app.use(cors());

const startUpConfig: StartUpConfig = StartUpParse.getStartUpConfig();
const PORT: number = startUpConfig.PORT;
const isProd: boolean = startUpConfig.PROD;

const pgDriver: Driver = new PostgresDriver();
const transactionRunner: TransactionRunner<QueryConstructor> = new PostgresTransactionRunner<QueryConstructor>(pgDriver);
const migrationRunner: MigrationRunner = new MigrationRunner(transactionRunner);

migrationRunner.run(isProd);

const requestQueries: RequestQueries = new RequestQueriesPg();
const requestRepository: RequestRepository = new RequestRepositoryImpl(transactionRunner, requestQueries);
const requestController: RequestController = new RequestControllerImpl(requestRepository);
const requestRouter: RequestRouter = new RequestRouter(requestController);

requestRouter.setRouter();
app.use(RequestsAPIPrefix, requestRouter.getRouter());

const appointmentQueries: AppointmentQueries = new AppointmentQueriesPg();
const appointmentRepository: AppointmentRepository = new AppointmentRepositoryImpl(transactionRunner, appointmentQueries);
const appointmentController: AppointmentController = new AppointmentControllerImpl(appointmentRepository);
const appointmentRouter: AppointmentRouter = new AppointmentRouter(appointmentController);

appointmentRouter.setRouter();
app.use(AppointmentsAPIPrefix, appointmentRouter.getRouter());

app.listen(PORT, (err:Error | void): void => {
  err ? console.log(err) : console.log(`Listening to port ${PORT}`);
});